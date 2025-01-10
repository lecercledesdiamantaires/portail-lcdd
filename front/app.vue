<script setup>
  const qrCode = useQrCode();
  provide('qrCode', qrCode);
  const shopifyApi = useShopifyApi();
  provide('shopifyApi', shopifyApi);
  const whitelist = useWhitelist();
  provide('whitelist', whitelist);
  const auth = useAuth();
  provide('auth', auth);
  const profil = useProfil();
  provide('profil', profil);
  const sales = useSales();
  provide('sales', sales);
  const popup = usePopup();
  provide('popup', popup);
  const searchBar = useSearchbar();
  provide('searchBar', searchBar);
</script>


<template>
  <div>
    <NuxtPage />
  </div>
</template>
