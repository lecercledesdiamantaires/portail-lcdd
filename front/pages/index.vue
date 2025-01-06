<script setup>
   import { CircleUserRound } from 'lucide-vue-next';
   definePageMeta({
      middleware: ['auth']
   })
   
   const qrCode = inject('qrCode');
   const auth = inject('auth');
</script>

<template>
    <div class="mx-auto max-w-sm md:max-w-3xl sm:max-w-lg py-6">
      <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink>

      <h1 class="text-2xl font-semibold">Bonjour {{ auth?.user?.value?.firstName || '' }}</h1>
      <img src="" alt="qr code">
      <ButtonPrimary @click="qrCode.download()">Télécharger mon Qr Code</ButtonPrimary>
      
      <div class="flex flex-col md:flex-row gap-2 w-full justify-between">
         <ButtonPrimary class="w-full">Récupérer l'argent</ButtonPrimary>
         <ButtonPrimary class="w-full">
            <NuxtLink to="/profil" class="w-full">Mon profil</NuxtLink>
         </ButtonPrimary>

         <ButtonDanger
            @click="auth.logout()"
            class=" w-full"
            >
            Déconnexion
         </ButtonDanger>
      </div>
    </div>
</template>