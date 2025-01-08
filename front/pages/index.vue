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
    <div class="flex w-full bg-gray-100 h-full">
      <!-- <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink> -->
      <Sidebar/>
      <div class="flex flex-col gap-4 p-6 w-full">
         <h1 class="text-3xl font-semibold">Bonjour {{ auth?.user?.value?.firstName || '' }}</h1>
         <div class="grid grid-cols-4 w-full gap-8 ">
            <div class="rounded-3xl bg-white w-full flex gap-4 p-2 px-4 items-center">
               <div class="h-16 w-16 bg-yellowLight rounded-full p-2 flex items-center justify-center">
                  <font-awesome-icon icon="hand-holding-dollar" class="text-2xl h-full w-full" color="#FFC107"/>
               </div>
               <div class="flex flex-col">
                  <h3 class="text-lg">Argent généré</h3>
                  <p>$12,750</p>
               </div>
            </div>
            <div class="rounded-3xl bg-white w-full flex gap-4 p-2 px-4 items-center ">
               <div class="h-16 w-16 bg-greenLight rounded-full p-2 flex items-center justify-center">
                  <font-awesome-icon icon="cart-shopping" class="text-2xl h-full w-full" color="#198754"/>
                  
               </div>
               <div class="flex flex-col">
                  <h3 class="text-lg">Mes Ventes</h3>
                  <p class="text-base">104</p>
               </div>
            </div>
            <div class="rounded-3xl bg-white w-full flex gap-4 p-2 px-4 items-center ">
               <div class="h-16 w-16 bg-blueLight rounded-full p-2 flex items-center justify-center">
                  <font-awesome-icon icon="paper-plane" class="text-2xl h-full w-full" color="#0D6EFD"/>
               </div>
               <div class="flex flex-col">
                  <h3 class="text-lg">Commande en cours</h3>
                  <p class="text-base">$12,750</p>
               </div>
            </div>
            <div class="rounded-3xl bg-white w-full flex gap-4 p-4 px-4 items-center ">
               <div class="h-16 w-16 bg-purpleLight rounded-full p-2 flex items-center justify-center">
                  <font-awesome-icon icon="sack-dollar" class="text-2xl h-full w-full" color="#FAA6FF"/>
               </div>
               <div class="flex flex-col">
                  <h3 class="text-lg">Mon Portefeuille</h3>
                  <p class="text-base">$12,750</p>
               </div>
            </div>
            
            
            
   
         </div>
         <CardChart /> 
      </div>
   </div>
</template>