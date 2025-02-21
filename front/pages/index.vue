<script setup>
import ButtonPrimary from '~/components/buttonPrimary.vue';

   definePageMeta({
         middleware: ['auth', 'vendor']
   })

   const sales = inject('sales');

   const promoCode = ref('');
   const user = ref(null);
   const canShowCardValue = ref(false);

   if (process.client){
      promoCode.value = localStorage.getItem('promoCode');
      user.value = JSON.parse(localStorage.getItem('user'));
      setTimeout(() => {
         canShowCardValue.value = true
      }, 800)
   }

</script>
<template>  
      <NuxtLayout name="default">
         <div class="flex flex-col gap-8 sm:p-6 w-full xs:px-2 xs:py-6">
            <HelloText class="xs:pl-20 lg:pl-0"/>   
            <CardInfosContainer />
            <div class="flex gap-4 xl:flex-row xs:flex-col">
               <CardQrCode v-if="user" :promoCode="promoCode" :user="user"/>
               <div class="flex flex-col gap-4 w-full flex-1">
                  <div class="flex justify-between items-center">
                     <h2 class="text-2xl font-semibold">Dernières transactions</h2>
                     <NuxtLink to='/transactions' class="text-primary">Voir plus</NuxtLink>
                  </div>
                  <TransactionsTable :sales="sales" />
               </div>
            </div> 
            <CardChart v-if="canShowCardValue" />
            <div class="w-full rounded-3xl bg-white p-6">
               <div class="flex flex-col items-center gap-4">
                  <h2 class="text-2xl font-semibold">Contactez nous</h2>
                  <p class="text-center">Si vous avez le moindre problème ou la moindre demande contactez nous</p>
                  <ButtonPrimary>
                     <NuxtLink to="/contact">Contactez nous</NuxtLink>
                  </ButtonPrimary>

               </div>
             
            </div>
         </div>
      </NuxtLayout>
</template>
