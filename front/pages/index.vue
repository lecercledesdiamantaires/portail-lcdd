<script setup>
   definePageMeta({
         middleware: ['auth', 'vendor']
   })
   const sales = inject('sales');
   const qrCode = inject('qrCode');
   const promoCode = ref('');
   const user = ref(null);
   const canShowCardValue = ref(false);

   if (process.client){
      promoCode.value = localStorage.getItem('promoCode');
      user.value = JSON.parse(localStorage.getItem('user'));
      qrCode.generateQrCode(promoCode.value);
      sales.getSales(promoCode.value);
      setTimeout(() => {
         canShowCardValue.value = true
      }, 500)
   } 

</script>
<template>
    <div class="flex w-full bg-gray-100 h-full">
      <Sidebar />
  
      
      <div class="flex flex-col gap-4 sm:p-6 w-full xs:px-2 xs:py-6">
         <HelloText class="xs:pl-20 lg:pl-0"/>   
         <CardInfosContainer />
         <div class="flex gap-4 xl:flex-row xs:flex-col">
            <CardQrCode :promoCode="promoCode" :owner="user"/>
            <div class="flex flex-col gap-4 w-full flex-1">
               <div class="flex justify-between items-center">
                  <h2 class="text-2xl font-semibold">Dernières transactions</h2>
                  <NuxtLink to='/transactions' class="text-primary">Voir plus</NuxtLink>
               </div>
               <TransactionsTable :sales="sales" />
            </div>
         </div> 
         <CardChart v-if="canShowCardValue" />
      </div>
   </div>
</template>
