<script setup>

   definePageMeta({
      middleware: ['auth', 'vendor']
   })
   const sales = inject('sales');
   const qrCode = inject('qrCode');
   const auth = inject('auth');
   const shopifyApi = inject('shopifyApi');
   const promoCode = ref('');

   if (process.client){
      promoCode.value = localStorage.getItem('promoCode');
      qrCode.generateQrCode(promoCode.value);
      sales.getSales(promoCode.value);
   }


</script>
<template>
    <div class="flex w-full bg-gray-100 h-full">
      <Sidebar />
      
      <div class="flex flex-col gap-4 sm:p-6 w-full xs:px-2 xs:py-6">
         <HelloText class="xs:pl-20 lg:pl-0"/>   
         <CardInfosContainer />
         <div class="flex gap-4 xl:flex-row xs:flex-col">
            <CardQrCode :promoCode=" promoCode"/>
            <div class="flex flex-col gap-4 w-full flex-1">
               <div class="flex justify-between items-center">
                  <h2 class="text-2xl font-semibold">Dernière transactions</h2>
                  <a href="" class="text-sm">Voir plus</a>
               </div>
               <div class="flex flex-col bg-white rounded-3xl p-6 h-full items-center justify-center max-h-72">
                  <table class="bg-white rounded-3xl w-full h-full table-auto flex flex-col justify-between items-center"> 
                     <thead class="border-b border-gray-100 w-full pb-4 md:block xs:hidden">
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <th class="text-center w-full">Type</th>
                           <th class="text-start w-full">Prénom Nom</th>
                           <th class="text-start w-full">Date</th>
                           <th class="text-start w-full">Montant</th>
                           <th class="text-start w-full">État</th>
                        </tr>
                     </thead>
                     <tbody class="flex flex-col gap-4 justify-between items-center w-full h-wull">
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <td class="text-center w-full flex justify-center">
                               <Icones icon="sack-dollar" color="yellow"/>
                           </td>
                           <td class="text-start w-full">Nikolo Kimpembe</td>
                           <td class="text-start w-full">25 Jan 2025</td>
                           <td class="text-start w-full text-green">+50€</td>
                           <td class="text-start w-full md:block xs:hidden">
                              <div class="p-2 bg-gray-200 rounded-xl max-w-max">
                                 <p class="text-gray-600">En cours</p>
                              </div>
                           </td>
                        </tr>
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <td class="w-full flex justify-center">
                                 <Icones icon="hand-holding-dollar" color="green"/>                    
                           </td>
                           <td class="text-start w-full">Nikolo Kimpembe</td>
                           <td class="text-start w-full">25 Jan 2025</td>
                           <td class="text-start w-full text-green">+50€</td>
                           <td class="text-start w-full md:block xs:hidden">
                              <div class="p-2 bg-greenLight rounded-xl max-w-max">
                                 <p class="text-green">Validé</p>
                              </div>
                           </td>
                        </tr>
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <td class="w-full flex justify-center">
                                 <Icones icon="hand-holding-dollar" color="green"/>                             
                           </td>
                           <td class="text-start w-full">Nikolo Kimpembe</td>
                           <td class="text-start w-full">25 Jan 2025</td>
                           <td class="text-start w-full text-green">+50€</td>
                           <td class="text-start w-full md:block xs:hidden">
                              <div class="p-2 bg-gray-200 rounded-xl max-w-max">
                                 <p class="text-gray-600">En cours</p>
                              </div>
                           </td>
                        </tr>
                        
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <CardChart />
      </div>
   </div>
</template>
