<script setup>
   import { CircleUserRound } from 'lucide-vue-next';
   definePageMeta({
      middleware: ['auth']
   })
   const sales = inject('sales');
   const qrCode = inject('qrCode');
   const auth = inject('auth');
   const promoCode = ref('');
   if (process.client){
      promoCode.value = localStorage.getItem('promoCode');
      qrCode.generateQrCode(promoCode.value);
      sales.getSales('PROMO-HYADGXLR');
   }

   // État du menu burger
   const isOpen = ref(false);

   // Fonction pour ouvrir/fermer le menu
   const toggleMenu = () => {
   isOpen.value = !isOpen.value;
   };
  
</script>

<template>
    <div class="grid grid-cols-4 gap-6 w-full">
      <!-- <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink> -->
      <div>
         <!-- Bouton du menu burger -->
         <button
            @click="toggleMenu"
            class="fixed top-4 left-4 z-50 block lg:hidden bg-primary text-white p-3 rounded-full focus:outline-none"
         >
            <svg
            v-if="!isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
         </button>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed flex flex-col h-screen w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
      ]"
    >
      <div class="flex flex-col h-full justify-between py-6">
        <!-- Partie supérieure -->
        <div class="flex flex-col gap-12">
          <Logo />
          <div class="flex flex-col gap-4 items-center">
            <LinkAside direction="dashboard" />
            <LinkAside direction="transactions" />
            <LinkAside direction="profil" />
          </div>
        </div>

        <!-- Lien de déconnexion -->
        <LinkAside direction="logout" />
      </div>
    </aside>

    <!-- Overlay (pour fermer le menu en mobile) -->
    <div
      v-if="isOpen"
      @click="toggleMenu"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    ></div>
  </div>

      <div class="flex flex-col items-center gap-4 col-span-3">
         <h1 class="text-2xl font-semibold">Bonjour {{ auth?.user?.value?.firstName || '' }}</h1>
         <p>  {{ sales.data.value?.current_subtotal_price }}</p>
         <div class="grid grid-cols-3 w-full bg-test gap-4">
            <div class="flex flex-col items-start gap-4">
               <h2>My Card</h2>
               <div class="flex flex-col items-center gap-4 bg-primary rounded-3xl p-6 w-full max-w-80">
                  <img src="" alt="qr code" class="qr-code"/>
                  <p class="">{{ promoCode }}</p>
               </div>
            </div>
            <div class="flex flex-col items-center gap-4 bg-white rounded-3xl p-6 w-full max-w-80">
               <p>Balance</p>
               <p>Nb vente</p>
               <p>Montant vente ?</p>
            </div>
            <div class="flex flex-col items-start gap-4">
               <h2>Transaction récente</h2>
               <div class="flex flex-col items-center gap-4 bg-primary rounded-3xl p-6 w-full max-w-80">
                  <p>Montant</p>
                  <p>Date</p>
               </div>
            </div>
   
         </div>
      </div>
    </div>
</template>