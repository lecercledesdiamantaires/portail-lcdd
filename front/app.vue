<script setup>
 const qrCode = useQrCode('le monde ');
 provide('qrCode', qrCode);
</script>


<template>
  <div>
    <NuxtPage />
  </div>
</template>
