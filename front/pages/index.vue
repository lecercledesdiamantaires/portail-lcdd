<script setup>
   import { CircleUserRound, PiggyBank, ShoppingBasket } from 'lucide-vue-next';
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
    <div class="grid grid-cols-4 gap-6 w-full bg-gray-100 h-full">
      <!-- <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink> -->
      <Sidebar />

      <div class="flex flex-col gap-4 lg:col-span-3 col-span-4 py-6 pr-16">
         <h1 class="text-3xl font-semibold">Bonjour {{ auth?.user?.value?.firstName || '' }}</h1>
         <div class="grid grid-cols-4 w-full gap-8 ">
            <div class="rounded-3xl bg-white w-full flex gap-4 p-2 px-4 flex flex items-center ">
               <div class="h-16 w-16 bg-redLight rounded-full p-2">
                  <PiggyBank class="h-full w-full" fill="red" color="#df293566"/>
               </div>
               <div class="flex flex-col gap-2 p-4">
                  <h3>Mon argent</h3>
                  <p>$12,750</p>
               </div>
            </div>
            <div class="rounded-3xl bg-white w-full flex gap-4 p-2 px-4 flex flex items-center ">
               <div class=" h-16 w-16 bg-test rounded-full p-2">
                  <ShoppingBasket class="h-full w-full"/>
               </div>
               <div class="flex flex-col gap-2 p-4">
                  <h3>Mes Ventes</h3>
                  <p>12</p>
               </div>
            </div>
            <div class="rounded-3xl bg-white w-full flex gap-4 p-2 px-4 flex flex items-center ">
               <div class=" h-16 w-16 bg-test rounded-full p-2">
                  <PiggyBank class="h-full w-full"/>
               </div>
               <div class="flex flex-col gap-2 p-4">
                  <h3>Mon argent</h3>
                  <p>$12,750</p>
               </div>
            </div>
            <div class="rounded-3xl bg-white w-full flex gap-4 p-2 px-4 flex flex items-center ">
               <div class=" h-16 w-16 bg-test rounded-full p-2">
                  <PiggyBank class="h-full w-full"/>
               </div>
               <div class="flex flex-col gap-2 p-4">
                  <h3>Mon argent</h3>
                  <p>$12,750</p>
               </div>
            </div>
            
            
   
         </div>
         <CardChart /> 

      </div>
   </div>
</template>