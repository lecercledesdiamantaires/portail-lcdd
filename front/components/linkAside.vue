<script setup>
import { inject } from 'vue';
const route = useRoute();

const auth = inject('auth');

defineProps({
  direction: {
    type: String,
    required: true
  }
})

const getLink = (direction) => {
  switch (direction) {
    case 'accueil':
      return '/';
    case 'profil':
      return '/profil';
    case 'transactions':
      return '/transactions';
    case 'logout':
      return '#';
    case 'avantages':
      return '/avantages';
    default:
      return '/';
  }
};

const isActive = (direction) => {
  return route.path === getLink(direction);
};


const getIcon = (direction) => {
  switch (direction) {
    case 'accueil':
      return "house";
    case 'profil':
      return "user";
    case 'transactions':
      return "arrow-right-arrow-left";
    case 'avantages':
      return 'tag';
    default:
      return null;
  }
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

</script>

<template>

  <div class="flex w-full gap-12 group">
    <span
      class="transition-all duration-300 ease-in-out bg-primary h-full w-2 rounded-r-3xl opacity-0 group-hover:opacity-100"
      :class="{ 'group-hover:opacity-0': direction === 'logout' ,'active': isActive(direction),'group-hover:bg-red': direction === 'logout' }"
    ></span>
    <div class="flex flex-col gap-4 w-full">
      <NuxtLink
        v-if="direction !== 'logout'"
        :to="getLink(direction)"
        class="group flex flex-row items-center gap-4 hover:text-primary"
        :class="{ 'active': isActive(direction) }">
        <font-awesome-icon :icon="getIcon(direction)" class="h-8 transition-colors duration-300 ease-in-out group-hover:text-primary" />
        <p class="text-xl transition-colors duration-300 ease-in-out group-hover:text-primary">
          {{ capitalize(direction) }}
        </p>
      </NuxtLink>
      <a
        v-if="direction === 'logout'"
        @click="auth.logout()"
        class="group flex flex-row items-center gap-4 hover:text-red"
      >
        <font-awesome-icon icon="right-from-bracket" class="h-8 transition-colors duration-300 ease-in-out group-hover:text-red" />
        <p class="text-base transition-colors duration-300 ease-in-out group-hover:text-red">
          Déconnexion
        </p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: #006D5C;
  opacity: 1;
}
</style>