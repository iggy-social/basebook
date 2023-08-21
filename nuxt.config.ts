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
      domainRequiredToPost: true,
      favicon: "/img/favicon.svg",
      getPostsLimit: 30, // number of posts to fetch from Orbis in the getPosts() function
      iggyPostAddress: "0x06A7Ab7Bb68b0ad6eB7688C5781E60BE6AFc658d",
      iggyPostMinterAddress: "0x5e54CebB2612744cB56547bC7CC41466ad7ac557",
      iggyPostEnumerationAddress: "0xF40284a811c82b4B9ab22E94Bb909Df6d2c66C08",
      lpTokenAddress: "", // liquidity pool token (token to stake in the staking contract)
      lpTokenSymbol: "", // LP token symbol
      marketplaceCollectionUrl: "https://opensea.io/collection/basebook-posts/",
      marketplaceNftItemUrl: "https://opensea.io/assets/base/0x06A7Ab7Bb68b0ad6eB7688C5781E60BE6AFc658d/", // url (append nft id to it)
      maxImageUploadSizeMb: 1, // max image upload size in MB
      newsletterLink: "https://zcmp.eu/AXkd",
      orbisContext: "kjzl6cwe1jw14anu2yjw8124d9j88fsxc5eospyzmiz9i76s4e3tknd48s0998c", // production context
      orbisTest: false, // if true, test context will be used instead of the production one
      orbisTestContext: "kjzl6cwe1jw145tfqv2eqv8tiz6puo27meyz4smz40atppuc13tulqca87k35z2", // test context
      previewImage: "/img/cover.png",
      previewImageAirdrop: "/img/cover-airdrop.png",
      previewImagePost: "/img/cover-post.png",
      previewImagePostNft: "/img/cover-post-nft.png",
      previewImageProfile: "/img/cover-profile.png",
      previewImageStake: "/img/cover-stake.png",
      profileMintedPostIdsMax: 36, // max number of minted post ids to show in the profile page
      projectMetadataTitle: "Basebook - Decentralized Social Network On Base",
      projectName: "Basebook",
      projectDescription: "Basebook is a decentralized social network on Base. Brought to you by Punk Domains & Iggy Social.",
      projectTwitter: "https://twitter.com/PunkDomains",
      projectUrl: "https://basebook.xyz",
      punkMinterAddress: "0x7e8aB50697C7Abe63Bdab6B155C2FB8D285458cB", // punk domain minter contract address
      punkNumberOfPrices: 5, // number of different prices (based on domain length), usually 1 (price()) or 5 (price1char() - price5char())
      punkTldAddress: "0x4087fb91a1fbdef05761c02714335d232a2bf3a1", // punk domain TLD address
      randomPostsNumber: 1, // number of random post NFTs to show in the sidebar widget
      rpcCustom: process.env.RPC_CUSTOM || "https://base-mainnet.public.blastapi.io", // Custom RPC URL
      showRepliesOnHomepage: true, // show replies on the homepage     
      stakingContractAddress: "", // this is also the stake/gov token address
      stakeTokenSymbol: "", // stake token symbol (governance token symbol)
      supportedChainId: 8453, // change chain ID
      swapPriceImpactMaxBps: 1000, // max price impact in bips (1 bps = 0.01%, 1000bps = 10%) for the swap function
      swapRouterAddress: "0x1EB2Adc19eB3Df26D84427Be11F1eB1887c6631c", // iggy swap router contract address
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
