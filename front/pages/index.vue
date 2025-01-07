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
      sales.getSales(promoCode.value);
   }
</script>

<template>
    <div class="grid grid-cols-4 gap-6 w-full">
      <!-- <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink> -->
      <Sidebar />

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
      <CardChart /> 

   </div>
</template>