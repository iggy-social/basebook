<template>
<div class="card m-2 bg-light">
  <div class="card-header bg-light">Trade Friend.tech keys</div>

  <div class="card-body sidebar-card-body">

    <SimpleSwap 
      class="mt-3"
      :routerAddress="$config.swapRouterAddress" 
      swapId="SidebarRight1"
    />

  </div>
</div>
</template>

<script>
import SimpleSwap from '~~/components/swap/SimpleSwap.vue';

export default {
  name: "SimpleSwapWidget",

  components: { SimpleSwap }
}
</script>