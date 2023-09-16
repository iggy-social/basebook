import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://nuxt.com/docs/api/configuration/nuxt-config 
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ],
      link: [
        { // Bootstrap
          rel: "stylesheet",
          href: "	https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        },
        { // Bootstrap icons
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        },
        { // Custom
          rel: "stylesheet",
          href: "/css/custom.css"
        }
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        }
      ]
    }
  },
  components: false,
  css: [
    'vue-toastification/dist/index.css' 
  ],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  router: {
    options: {
      hashMode: false
    }
  },
  runtimeConfig: {
    public: {
      airdropClaimDomainsAddress: "", // chat token claim for domain holders contract address
      airdropPostMintersAddress: "", // chat token claim for post minters contract address
      blockExplorerBaseUrl: "https://basescan.org",
      chatTokenAddress: "", // chat token address
      chatTokenImage: "", // chat token image
      chatTokenSymbol: "", // chat token symbol or name
      domainRequiredToPost: false,
      expiryCollections: 1000 * 60 * 60 * 24 * 7, // when local storage expires; must be in milliseconds (0 means no expiration)
      expiryUsernames: 1000 * 60 * 60 * 24 * 7, // when local storage expires; must be in milliseconds (0 means no expiration)
      favicon: "/img/favicon.svg",
      getPostsLimit: 30, // number of posts to fetch from Orbis in the getPosts() function
      iggyPostAddress: "0x06A7Ab7Bb68b0ad6eB7688C5781E60BE6AFc658d",
      iggyPostMinterAddress: "0x5e54CebB2612744cB56547bC7CC41466ad7ac557",
      iggyPostEnumerationAddress: "0xF40284a811c82b4B9ab22E94Bb909Df6d2c66C08",
      linkPreviews: "netlify", // "netlify" or "microlink" (or leave empty for no link previews)
      lpTokenAddress: "", // liquidity pool token (token to stake in the staking contract)
      lpTokenSymbol: "", // LP token symbol
      marketplaceCollectionUrl: "https://opensea.io/collection/basebook-posts/",
      marketplaceNftItemUrl: "https://opensea.io/assets/base/0x06A7Ab7Bb68b0ad6eB7688C5781E60BE6AFc658d/", // url (append nft id to it)
      maxImageUploadSizeMb: 1, // max image upload size in MB
      newsletterLink: "https://zcmp.eu/AXkd",
      nftDefaultRatio: 1, // default ratio for the NFT price bonding curve
      nftLaunchpadBondingAddress: "0xa9cfa4e8EA79537F5893f45c3B1491A2f7B54e7E", // NFT launchpad with bonding curve contract address
      nftOrbisContext: "kjzl6cwe1jw148wq50ose4mjrt17aodei2xor9kbw72b3wzvgzu7wm3jlhaghd0", // Orbis context for NFT collection pages
      orbisCategories: [ // use only alphanumeric ASCII characters for slugs! (no spaces, only dash is allowed)
        { "slug": "all", "title": "All posts", "hidden": false }, // not a real tag, just denotes the absence of a tag (always keep it here)
        { "slug": "general", "title": "General discussion", "hidden": false },
        { "slug": "shill", "title": "Shill & discuss projects", "hidden": true },
        { "slug": "nfts", "title": "Memes & NFTs", "hidden": false }, // keep this category for the purpose of the NFT launchpad
        { "slug": "governance", "title": "Governance", "hidden": true },
        { "slug": "food", "title": "Food & recipes", "hidden": true },
        { "slug": "movies-music", "title": "Movies & Music", "hidden": true },
        { "slug": "random", "title": "Random", "hidden": false },
      ],
      orbisContext: "kjzl6cwe1jw14anu2yjw8124d9j88fsxc5eospyzmiz9i76s4e3tknd48s0998c", // production context
      orbisTest: false, // if true, test context will be used instead of the production one
      orbisTestContext: "kjzl6cwe1jw145tfqv2eqv8tiz6puo27meyz4smz40atppuc13tulqca87k35z2", // test context
      previewImage: "/img/cover.png",
      previewImageAirdrop: "/img/cover-airdrop.png",
      previewImageNftCollection: "/img/cover-nft-collection.png",
      previewImageNftCreate: "/img/cover-nft-create.png",
      previewImageNftLaunchpad: "/img/cover-nft-launchpad.png",
      previewImagePost: "/img/cover-post.png",
      previewImagePostNft: "/img/cover-post-nft.png",
      previewImageProfile: "/img/cover-profile.png",
      previewImageStake: "/img/cover-stake.png",
      profileMintedPostIdsMax: 36, // max number of minted post ids to show in the profile page
      projectMetadataTitle: "Basebook - Social NFT Launchpad On Base",
      projectName: "Basebook",
      projectDescription: "Basebook is the first social NFT launchpad on Base. Create and discuss NFTs on Basebook!",
      projectTwitter: "https://twitter.com/Basebook0x",
      projectUrl: "https://basebook.xyz",
      punkMinterAddress: "0xfc79caeAc4F44e0eBaD2bE7F42bf134806850d9e", // punk domain minter contract address
      punkNumberOfPrices: 5, // number of different prices (based on domain length), usually 1 (price()) or 5 (price1char() - price5char())
      punkTldAddress: "0x4087fb91a1fbdef05761c02714335d232a2bf3a1", // punk domain TLD address
      randomPostsNumber: 1, // number of random post NFTs to show in the sidebar widget
      rpcCustom: process.env.RPC_CUSTOM || "https://mainnet.base.org", // Custom RPC URL
      showRepliesOnHomepage: true, // show replies on the homepage     
      stakingContractAddress: "", // this is also the stake/gov token address
      stakeTokenSymbol: "", // stake token symbol (governance token symbol)
      supportedChainId: 8453, // change chain ID
      swapPriceImpactMaxBps: 1000, // max price impact in bips (1 bps = 0.01%, 1000bps = 10%) for the swap function
      swapRouterAddress: "0x249f1172Ebd8686386a5C0Ee704378B85acD0627", // iggy swap router contract address
      tenorApiKey: process.env.TENOR_KEY || "",
      tldName: ".basebook",
      tokenAddress: null, // leave null if it's a native token of the chain
      tokenDecimals: 18,
      tokenSymbol: "ETH",
      web3storageKey: process.env.WEB3_STORAGE_KEY || ""
    }
  },
  vite: {
    build: {
      target: ['es2020'] // fix big integer literals error
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'  // fix nuxt3 global
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,  // fix nuxt3 process
            buffer: true
          }),
          NodeModulesPolyfillPlugin()
        ],
        target: "es2020" // fix big integer literals error
      }
    }
  }
})
