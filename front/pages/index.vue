<script setup>
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

definePageMeta({
      middleware: ['auth', 'vendor']
   })
   const sales = inject('sales');
   const qrCode = inject('qrCode');
   const auth = inject('auth');
   const shopifyApi = inject('shopifyApi');
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

   const formatDate = (dateString) => {
      const date = new Date(dateString)
      return format(date, 'dd / MM / yyyy', { locale: fr })
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
                  <NuxtLink to='/transaction' class="text-primary">Voir plus</NuxtLink>
               </div>
               <div class="flex flex-col bg-white rounded-3xl p-6 h-full items-center justify-center max-h-72">
                  <table class="bg-white rounded-3xl w-full h-full table-auto flex flex-col justify-between items-center"> 
                     <thead class="border-b border-gray-100 w-full pb-4 md:block xs:hidden">
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <th class="text-start w-full">Client</th>
                           <th class="text-start w-full">Date</th>
                           <th class="text-start w-full">Montant</th>
                           <th class="text-start w-full">État</th>
                        </tr>
                     </thead>
                     <tbody class="flex flex-col gap-4 justify-between items-center w-full h-wull">
                        <tr 
                           v-for="(sale, index) in sales.salesData.slice(0, 3)" 
                           :key="index" 
                           class="flex justify-between items-center w-full h-full gap-4"
                        >
                           <td class="text-start w-full">{{ sale.firstName + ' ' +sale.lastName }}</td>
                           <td class="text-start w-full">{{ formatDate(sale.orderDate) }}</td>
                           <td class="text-start w-full text-green">+ {{ sale.orderAmount }} €</td>
                           <td class="text-start w-full md:block xs:hidden">
                              <StatusTag :status="sale.status" />
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div> 
         <CardChart v-if="canShowCardValue" />
      </div>
   </div>
</template>
