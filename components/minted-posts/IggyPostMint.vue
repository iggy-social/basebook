<template>
<span @click="fetchMintData" class="cursor-pointer ms-3 hover-color" data-bs-toggle="modal" :data-bs-target="'#mintPostModal'+post.stream_id">
  <i class="bi bi-collection"></i> 
  Mint
</span>

<!-- Mint Post Modal -->
<div class="modal fade" :id="'mintPostModal'+post.stream_id" tabindex="-1" aria-labelledby="mintPostModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="mintPostModalLabel">Mint this post as NFT</h1>
        <button type="button" :id="'closeMintPostModal'+post.stream_id" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Mint this post as NFT and show appreciation to the author.</p>

        <p>
          Minting price: {{ postPrice }} {{ $config.tokenSymbol }}
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="mintPost" :disabled="!isActivated">
          <span v-if="waitingMint" class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
          Mint post for {{ postPrice }} {{ $config.tokenSymbol }}
        </button>
      </div>
    </div>
  </div>
</div>
<!-- END Mint Post Modal -->
</template>

<script>
import { useEthers } from 'vue-dapp';
import { ethers } from 'ethers';
import { useToast } from "vue-toastification/dist/index.mjs";
import WaitingToast from "~/components/WaitingToast";
import sanitizeHtml from 'sanitize-html';
import { useUserStore } from '~/store/user';
import { getImageFromText, textLengthWithoutBlankCharacters } from '~/utils/textUtils';

export default {
  name: "IggyPostMint",
  props: ["post", "parsedText"],

  data() {
    return {
      postPrice: null,
      textImage: null,
      textPreview: null,
      waitingMint: false
    }
  },

  created() {
    this.createTextPreview();
  },

  methods: {
    createTextPreview() {
      const sanitizedText = sanitizeHtml(this.parsedText, {
        allowedTags: [],
        allowedAttributes: {}
      });

      if (sanitizedText.length > 100) {
        this.textPreview = sanitizedText.replace(/[^\x00-\x7F]/g, "").substring(0, 97) + "...";
      } else if (sanitizedText.length === 0) {
        this.textPreview = "";
      } else {
        this.textPreview = sanitizedText.replace(/[^\x00-\x7F]/g, "");
      }

      if (textLengthWithoutBlankCharacters(sanitizedText) === 0) {
        this.textPreview = "";
      }

      this.textImage = getImageFromText(this.parsedText);
    },

    async fetchChatTokenBalance() {
      if (this.$config.chatTokenAddress) {
        const chatTokenInterface = new ethers.utils.Interface([
          "function balanceOf(address owner) view returns (uint256)",
        ]);

        const chatTokenContract = new ethers.Contract(this.$config.chatTokenAddress, chatTokenInterface, this.signer);

        const balance = await chatTokenContract.balanceOf(this.address);

        this.userStore.setChatTokenBalanceWei(balance);
      }
    },

    async fetchMintData() {
      if (this.isActivated) {
        const iggyPostInterface = new ethers.utils.Interface([
          "function getPostPrice(string memory _postId, address _author) external view returns (uint256)"
        ]);

        const iggyContract = new ethers.Contract(this.$config.iggyPostAddress, iggyPostInterface, this.signer);

        const postPriceWei = await iggyContract.getPostPrice(this.post.stream_id, this.post.creator_details.metadata.address);

        this.postPrice = ethers.utils.formatUnits(postPriceWei, this.$config.tokenDecimals);
      }
    },

    async mintPost() {
      if (this.isActivated) {
        this.waitingMint = true;

        const iggyPostMinterInterface = new ethers.utils.Interface([
          "function mint(string memory _postId, address _author, address _nftReceiver, address _referrer, string memory _textPreview, string memory _image, uint256 _quantity) external payable returns(uint256 tokenId)"
        ]);

        const iggyMinterContract = new ethers.Contract(this.$config.iggyPostMinterAddress, iggyPostMinterInterface, this.signer);

        const postPriceWei = ethers.utils.parseUnits(this.postPrice, this.$config.tokenDecimals);

        // mint post
        try {
          const tx = await iggyMinterContract.mint(
            this.post.stream_id, // post ID
            this.post.creator_details.metadata.address, // post author
            this.address, // NFT receiver
            ethers.constants.AddressZero, // @todo: enable referrals
            String(this.textPreview), // text preview
            String(this.textImage), // image
            1, // quantity
            {
              value: postPriceWei
            }
          );

          const toastWait = this.toast(
            {
              component: WaitingToast,
              props: {
                text: "Please wait for your transaction to confirm. Click on this notification to see transaction in the block explorer."
              }
            },
            {
              type: "info",
              onClick: () => window.open(this.$config.blockExplorerBaseUrl+"/tx/"+tx.hash, '_blank').focus()
            }
          );

          // close the modal
          document.getElementById('closeMintPostModal'+this.post.stream_id).click();

          const receipt = await tx.wait();

          if (receipt.status === 1) {
            this.waitingMint = false;
            this.toast.dismiss(toastWait);
            this.fetchChatTokenBalance();
            this.toast("You have successfully minted this post as NFT!", {
              type: "success",
              onClick: () => window.open(this.$config.blockExplorerBaseUrl+"/tx/"+tx.hash, '_blank').focus()
            });
          } else {
            this.waitingMint = false;
            this.toast.dismiss(toastWait);
            this.toast("Transaction has failed.", {
              type: "error",
              onClick: () => window.open(this.$config.blockExplorerBaseUrl+"/tx/"+tx.hash, '_blank').focus()
            });
            console.log(receipt);
          }

        } catch (e) {
          this.waitingMint = false;
          console.log(e);
          this.toast(e.message, {type: "error"});
        }
      }
    }
  },

  setup() {
    const { address, isActivated, signer } = useEthers();
    const toast = useToast();
    const userStore = useUserStore();

    return {
      address, isActivated, signer, toast, userStore
    }
  }
}
</script>