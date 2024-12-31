<script setup>
  const qrCode = useQrCode('test');
  provide('qrCode', qrCode);
  const shopifyApi = useShopifyApi();
  provide('shopifyApi', shopifyApi);
</script>


<template>
  <div>
    <NuxtPage />
  </div>
</template>
