<script setup>
  const qrCode = useQrCode('test');
  provide('qrCode', qrCode);
  const shopifyApi = useShopifyApi();
  provide('shopifyApi', shopifyApi);
  const whitelist = useWhitelist();
  provide('whitelist', whitelist);
  const auth = useAuth();
  provide('auth', auth);
  const profil = useProfil();
  provide('profil', profil);
</script>


<template>
  <div>
    <NuxtPage />
  </div>
</template>
