<template>
<div class="col col-lg-auto px-0 mt-1">
  <div id="sidebar1" class="collapse collapse-horizontal sticky-lg-top">
    <div class="sidebar-nav list-group border-0 rounded-0 text-sm-start min-vh-100">
      <div class="card m-2 p-2 bg-light">

        <div v-if="isActivated" class="text-center">

          <NuxtLink to="/profile">
            <ProfileImage 
              :key="userStore.getOrbisImage"
              @click="closeLeftSidebar"
              class="img-fluid mt-3 rounded-circle w-30 sidebar-profile-image" 
              :address="address" :domain="userStore.getDefaultDomain" :image="userStore.getOrbisImage" 
            />
          </NuxtLink>

          <h6 class="mt-3">
            {{ userStore.getDefaultDomain }}
          </h6>

          <button v-if="userStore.getChatTokenBalanceWei > 0 && $config.chatTokenAddress" class="btn btn-outline-primary btn-sm mt-2 mb-2 disabled">
            {{ userStore.getChatTokenBalance }} {{ $config.chatTokenSymbol }}
          </button>

          <hr />
        </div>

        <ul class="nav nav-pills flex-column">
          <li class="nav-item p-1" @click="closeLeftSidebar">
            <NuxtLink class="nav-link" :class="$route.path === '/' ? 'active' : ''" aria-current="page" to="/">
              <i class="bi bi-house"></i> Home
            </NuxtLink>
          </li>
          <li v-if="isActivated" class="nav-item p-1" @click="closeLeftSidebar">
            <NuxtLink class="nav-link" :class="$route.path.startsWith('/profile') ? 'active' : ''" aria-current="page" to="/profile">
              <i class="bi bi-person"></i> Profile
            </NuxtLink>
          </li>
          <li v-if="isActivated" class="nav-item p-1" @click="closeLeftSidebar">
            <NuxtLink class="nav-link" :class="$route.path.startsWith('/notifications') ? 'active' : ''" aria-current="page" to="/notifications">
              <i class="bi bi-bell"></i> Notifications

              <span 
                class="badge text-bg-secondary" 
                v-if="!notificationsStore.getLoadingNotifications && notificationsStore.getUnreadNotificationsCount > 0">
                {{ notificationsStore.getUnreadNotificationsCount }}
              </span>

            </NuxtLink>
          </li>
          <li class="nav-item p-1" @click="closeLeftSidebar" v-if="$config.swapRouterAddress">
            <NuxtLink class="nav-link" :class="$route.path.startsWith('/swap') ? 'active' : ''" aria-current="page" to="/swap">
              <i class="bi bi-arrow-down-up"></i> Swap
            </NuxtLink>
          </li>
          <li class="nav-item p-1" @click="closeLeftSidebar" v-if="$config.airdropClaimDomainsAddress || $config.airdropPostMintersAddress">
            <NuxtLink class="nav-link" :class="$route.path.startsWith('/airdrop') ? 'active' : ''" aria-current="page" to="/airdrop">
              <i class="bi bi-gift"></i> Airdrop
            </NuxtLink>
          </li>
          <li class="nav-item p-1" @click="closeLeftSidebar" v-if="$config.stakingContractAddress">
            <NuxtLink class="nav-link" :class="$route.path.startsWith('/stake') ? 'active' : ''" aria-current="page" to="/stake">
              <i class="bi bi-cash-stack"></i> Stake & Earn
            </NuxtLink>
          </li>
          <li class="nav-item p-1" @click="closeLeftSidebar">
            <NuxtLink class="nav-link" :class="$route.path.startsWith('/about') ? 'active' : ''" aria-current="page" to="/about">
              <i class="bi bi-patch-question"></i> About
            </NuxtLink>
          </li>
          <li class="nav-item p-1" @click="closeLeftSidebar">
            <a class="nav-link cursor-pointer" href="https://zealy.io/c/basebook/questboard" target="_blank">
              <i class="bi bi-fire"></i> Quests 
              <i class="bi bi-box-arrow-up-right ms-1"></i>
            </a>
          </li>
          <li class="nav-item p-1" @click="closeLeftSidebar">
            <a class="nav-link cursor-pointer" href="https://id.basebook.xyz" target="_blank">
              <i class="bi bi-person-vcard"></i> Basebook ID 
              <i class="bi bi-box-arrow-up-right ms-1"></i>
            </a>
          </li>
          
        </ul>
      </div>

      <div v-if="$config.newsletterLink" class="card m-2 bg-light">
        <div class="card-header bg-light">{{ $config.projectName }} Newsletter</div>
        <div class="card-body sidebar-card-body">
          <a class="btn btn-outline-primary mt-2 mb-2" target="_blank" :href="$config.newsletterLink">
            Join our newsletter!
            <i class="bi bi-box-arrow-up-right ms-1"></i>
          </a>
        </div>
      </div>
      
   </div>
  </div>
</div>
</template>

<script>
import { useEthers } from 'vue-dapp';
import { useNotificationsStore } from '~/store/notifications';
import { useSidebarStore } from '~/store/sidebars';
import { useUserStore } from '~/store/user';
import ProfileImage from "~/components/profile/ProfileImage.vue";

export default {
  name: "SidebarLeft",
  props: ["lSidebar", "isMobile"],

  components: {
    ProfileImage
  },
  
  methods: {
    closeLeftSidebar() {
      if (this.isMobile) {
        this.lSidebar.hide();
        this.sidebarStore.setLeftSidebar(false);
        this.sidebarStore.setMainContent(true);
      }
    }
  },

  setup() {
    const sidebarStore = useSidebarStore();
    const { address, isActivated } = useEthers();
    const notificationsStore = useNotificationsStore();
    const userStore = useUserStore();

    return { address, isActivated, notificationsStore, sidebarStore, userStore }
  },
}
</script>
