<script setup>
   import { CircleUserRound, PiggyBank, ShoppingBasket } from 'lucide-vue-next';


   definePageMeta({
      middleware: ['auth', 'vendor']
   })
   const sales = inject('sales');
   const qrCode = inject('qrCode');
   const auth = inject('auth');
   const promoCode = ref('');

   if (process.client){
      promoCode.value = localStorage.getItem('promoCode');
      qrCode.generateQrCode(promoCode.value);
      sales.getSales(promoCode.value);
   }
</script>
<template>
    <div class="flex w-full bg-gray-100 h-full">
      <!-- <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink> -->
      <Sidebar/>
      <div class="flex flex-col gap-4 p-6 w-full">
         <HelloText />   
         <div class="grid lg:grid-cols-4 w-full gap-4 md:grid-cols-2 sm:grid-cols-1">
            <CardInfos icon="hand-holding-dollar" color="green" label="Argent généré" amount="$12,750"/>
            <CardInfos icon="cart-shopping" color="blue" label="Mes Ventes" amount="104"/>
            <CardInfos icon="paper-plane" color="purple" label="Commande en cours" amount="12"/>
            <CardInfos icon="sack-dollar" color="yellow" label="Mon Portefeuille" amount="$12,750"/>
         </div>
         <CardChart /> 
      </div>
   </div>
</template>