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
      
      <div class="flex flex-col gap-4 sm:p-6 w-full xs:px-2 xs:py-6">
         <HelloText class="xs:pl-20 lg:pl-0"/>   

         <CardInfosContainer />
         <div class="flex gap-4">
            <CardQrCode :promoCode=" promoCode"/>
            <!-- <div class="flex flex-col gap-4 flex-1">    
            </div> -->
         </div>
         <CardChart />
      </div>
   </div>
</template>
