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
         <HelloText />   

         <CardInfosContainer />
         <div class="flex gap-4">
            <div class="flex flex-col gap-4 sm:w-96 xs:w-full">
            
               <div>
                  <h2 class="text-2xl font-semibold">Ma carte</h2>
               </div>
               <div class="container-card flex flex-col rounded-3xl ">
                  <div class=" flex p-6 gap-4">
                     <img src="" alt="qr code" class="qr-code rounded-3xl h-40 w-40"/>
                     <div class="flex flex-col items-end justify-between h-full flex-1">
                        <Logo color="white" height="h-full" width="w-full" class="h-16 w-16"/>
                        <div class="flex flex-col items-start w-full">
                           <h4 class="md:text-sm uppercase font-extralight text-gray-200 tracking-wider xs:text-xs" >Propriétaire</h4>
                           <p class="md:text-md text-white xs:text-xs">Pierre Dupont</p>
                        </div>
                     </div>
                  </div>
                  <div class="bottom-card w-full h-full px-6 py-4 rounded-b-3xl">
                     <p class="text-xs text-white">Mon code promo :</p>
                     <p class="text-lg text-white">{{ promoCode }}</p>
                  </div>
               </div>
   
            </div>
            <!-- <div class="flex flex-col gap-4 flex-1">    
            </div> -->
         </div>
         <CardChart />
      </div>
   </div>
</template>

<style scoped>
   .container-card {
      background: linear-gradient(107deg, #006D5C 2.61%, #003D34 101.2%);
   }

   .bottom-card {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.00) 100%);
   }
</style>