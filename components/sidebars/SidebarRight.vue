<template>
<div class="col-auto col-lg-3 px-0 mt-1">
  <div id="sidebar2" class="collapse collapse-horizontal" :class="{ show: sidebarStore.showRightSidebar }">
    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">

      <!-- Mint/register a domain name -->
      <NameMintWidget />

      <!-- Swap tokens -->
      <SimpleSwapWidget v-if="$config.swapRouterAddress" :routerAddress="$config.swapRouterAddress" :tokens="tokens" title="Swap tokens" poweredBy="BaseSwap" />

      <!-- BasePaint -->
      <div class="card m-2 bg-light">
        <div class="card-header bg-light">
          BasePaint
        </div>

        <div class="card-body sidebar-card-body">
          <div class="row">
            <p>Paint together. Mint daily.</p>

            <a href="https://basepaint.xyz/?ref=basebook.xyz" target="_blank">
              <img class="img-fluid rounded" src="https://bafybeihwt32qqr6vxeggfyv7imnzv3fob5lxtwaajjahnoq54avetlgiwq.ipfs.w3s.link/basepaint.jpg" />
            </a>
          </div>
        </div>

        <div class="card-footer bg-light text-body-secondary text-center">
          <a href="https://basepaint.xyz/?ref=basebook.xyz" class="btn btn-outline-primary mb-3 me-2" target="_blank">
            Draw
            <i class="bi bi-box-arrow-up-right ms-1"></i>
          </a>

          <a href="https://basepaint.xyz/mint" class="btn btn-outline-primary mb-3" target="_blank">
            Mint
            <i class="bi bi-box-arrow-up-right ms-1"></i>
          </a>
        </div>
      </div>

      <!-- Random minted post(s) -->
      <MintedPostsWidget @closeRightSidebar="closeRightSidebar" />

      <!-- Swap tokens -->
      <SimpleSwapWidget routerAddress="0x1EB2Adc19eB3Df26D84427Be11F1eB1887c6631c" :tokens="tokens2" title="Trade Friend.tech keys" />
      
    </div>
  </div>
</div>
</template>

<script>
import tokens from '~/assets/data/tokens.json';
import tokens2 from '~/assets/data/tokens2.json';
import { useSidebarStore } from '~/store/sidebars';
import MintedPostsWidget from '~/components/minted-posts/MintedPostsWidget.vue';
import NameMintWidget from '~/components/names/NameMintWidget.vue';
import SimpleSwapWidget from '~/components/swap/SimpleSwapWidget.vue';

export default {
    name: "SidebarRight",
    props: ["rSidebar", "isMobile"],

    components: { 
      MintedPostsWidget,
      NameMintWidget,
      SimpleSwapWidget
    },

    methods: {
      closeRightSidebar() {
        if (this.isMobile) {
          //this.rSidebar.hide();
          this.sidebarStore.setRightSidebar(false);
          this.sidebarStore.setMainContent(true);
        }
      }
    },

    setup() {
        const sidebarStore = useSidebarStore();
        return { sidebarStore, tokens, tokens2 };
    }
}
</script>