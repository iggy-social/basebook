<template>
<div class="col-auto col-lg-3 px-0 mt-1">
  <div id="sidebar2" class="collapse collapse-horizontal" :class="{ show: sidebarStore.showRightSidebar }">
    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">

      <!-- Mint/register a domain name -->
      <NameMintWidget />

      <!-- Swap tokens -->
      <SimpleSwapWidget v-if="$config.swapRouterAddress" />

      <!-- Random minted post(s) -->
      <MintedPostsWidget @closeRightSidebar="closeRightSidebar" />
      
    </div>
  </div>
</div>
</template>

<script>
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
        return { sidebarStore };
    }
}
</script>