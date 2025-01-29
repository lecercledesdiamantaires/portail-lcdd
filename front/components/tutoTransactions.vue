<template>
  <div class="flex items-center justify-between w-full gap-5 xs:flex-col md:flex-row shadow-lg">
    <div class="flex flex-col items-start justify-center gap-4 max-w-lg flex-1 min-w-sm">
      <h2 class="text-2xl font-bold xs:text-center md:text-start w-full">Comment retirer vos commissions ?</h2>
      <p class="xs:text-center md:text-start">Lorsque vous réalisez une vente, votre commission est mise en attente pendant 30 jours. Ce délai permet de valider la réception du bijou par le client et sa satisfaction.<br>
      Une fois ce délai écoulé, rendez-vous dans la <NuxtLink to="/transactions" class="font-bold text-primary">Page Transactions</NuxtLink> pour demander vos commissions. C’est simple, rapide et sécurisé !</p>
      <ButtonPrimary>
        <NuxtLink to="/transactions">Retirer mes commissions</NuxtLink>
      </ButtonPrimary>
    </div>
    <div class="flex items-center justify-end relative max-w-md w-full">
      <div class="w-full h-96 flex justify-center items-center relative ">
        <img src="assets/images/transactions.png" alt="Transactions page" class="w-full h-full rounded-3xl absolute object-contain" />
        <img src="assets/images/test.gif" alt="absolute mouse" class="w-16 h-16 absolute" style="top: 42%; left: 50%; transform: translate(-50%, -50%);" />
      </div>
    </div>
        
  </div>
</template>