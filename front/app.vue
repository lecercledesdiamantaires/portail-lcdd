<script setup>
 const qrCode = useQrCode('test');
 provide('qrCode', qrCode);
</script>


<template>
  <div>
    <NuxtPage />
  </div>
</template>
