<script setup>

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
      <Sidebar />
      
      <div class="flex flex-col gap-4 sm:p-6 w-full xs:px-2 xs:py-6">
         <HelloText class="xs:pl-20 lg:pl-0"/>   
         <CardInfosContainer />
         <div class="flex gap-4 flex-wrap">
            <CardQrCode :promoCode=" promoCode"/>
            <div class="flex flex-col gap-4 sm:w-96 xs:w-ful flex-1">
               <div class="flex justify-between items-center">
                  <h2 class="text-2xl font-semibold">Dernière transactions</h2>
                  <a href="" class="text-sm">Voir plus</a>
               </div>
               <div class="flex flex-col bg-white rounded-3xl p-6 h-full items-center justify-center max-h-72">
                  <table class="bg-white rounded-3xl w-full h-full table-auto flex flex-col justify-between items-center"> 
                     <thead class="border-b border-gray-100 w-full pb-4">
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <th class="text-start w-full">Description</th>
                           <th class="text-start w-full">Type</th>
                           <th class="text-start w-full">Prénom</th>
                           <th class="text-start w-full">Nom</th>
                           <th class="text-start w-full">Date</th>
                           <th class="text-start w-full">Montant</th>
                        </tr>
                     </thead>
                     <tbody class="flex flex-col gap-4 justify-between items-center w-full h-wull">
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <td class="text-center w-full">
                              <div class="flex gap-2 items-center">
                                 <Icones icon="hand-holding-dollar" color="green"/>
                                 <p>Commission</p>
                              </div>
                              
                           </td>
                           <td class="text-start   w-full">Completé</td>
                           <td class="text-start   w-full">Nikolo</td>
                           <td class="text-start   w-full">Kimpembe</td>
                           <td class="text-start w-full">25 Jan 2025</td>
                           <td class="text-start w-full text-green">+50€</td>
                        </tr>
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <td class="text-center w-full">
                              <div class="flex gap-2 items-center">
                                 <Icones icon="paper-plane" color="purple"/>
                                 <p>Achat client</p>
                              </div>
                           </td>
                           <td class="text-start   w-full">En cours</td>
                           <td class="text-start   w-full">Nikolo</td>
                           <td class="text-start   w-full">Kimpembe</td>
                           <td  class="text-start w-full">25 Jan 2025</td>
                           <td class="text-start w-full text-green">+250€</td>
                        </tr>
                        <tr class="flex justify-between items-center w-full h-full gap-4">
                           <td class="text-center w-full">
                              <div class="flex gap-2 items-center">
                                 <Icones icon="right-left" color="yellow"/>
                                 <p>Transfert</p>
                              </div>
                           </td>
                           <td class="text-start   w-full">Completé</td>
                           <td class="text-start w-full">Nikolo</td>
                           <td class="text-start w-full">Lorem, ipsum dolor</td>
                           <td class="text-start w-full">25 Jan 2025</td>
                           <td class="text-start w-full text-red">-50€</td>
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
