<script setup>
import { CircleUserRound, CircleDollarSign, User, House, LogOut } from 'lucide-vue-next';
import { inject } from 'vue';

defineProps({
  direction: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="flex w-full gap-12 group">
    <span
        class="transition-all duration-300 ease-in-out bg-primary h-full w-2 rounded-r-3xl opacity-0 group-hover:opacity-100"
        :class="{
          'bg-red': direction === 'logout'
        }"
    ></span>
    <div class="flex flex-col gap-4 w-full">
      <a
        v-if="direction === 'dashboard'"
        href="/"
        class="group flex flex-row items-center gap-4 hover:text-primary"
      >
        <House class="h-8 transition-colors duration-300 ease-in-out group-hover:text-primary" fill="test"/>
        <p class="text-xl transition-colors duration-300 ease-in-out group-hover:text-primary">
          Dashboard
        </p>
      </a>
      <a
        v-if="direction === 'profil'"
        href="/profil"
        class="group flex flex-row items-center gap-4 hover:text-primary"
      >
        <User class="h-8 transition-colors duration-300 ease-in-out group-hover:text-primary" />
        <p class="text-xl transition-colors duration-300 ease-in-out group-hover:text-primary">
          Profil
        </p>
      </a>
      <a
        v-if="direction === 'transactions'"
        href="/transactions"
        class="group flex flex-row items-center gap-4 hover:text-primary"
      >
        <CircleDollarSign class="h-8 transition-colors duration-300 ease-in-out group-hover:text-primary" />
        <p class="text-xl transition-colors duration-300 ease-in-out group-hover:text-primary">
          Transactions
        </p>
      </a>
      <a
        v-if="direction === 'logout'"
        @click="auth.logout()"
        class="group flex flex-row items-center gap-4 hover:text-red"
      >
        <LogOut class="h-8 transition-colors duration-300 ease-in-out group-hover:text-red" />
        <p class="text-base transition-colors duration-300 ease-in-out group-hover:text-red">
          Déconnexion
        </p>
      </a>
    </div>
  </div>
</template>