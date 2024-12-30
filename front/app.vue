<script setup>
  const qrCode = useQrCode('test');
  provide('qrCode', qrCode);
  const whitelist = useWhitelist();
  provide('whitelist', whitelist);
  const auth = useAuth();
  provide('auth', auth);
</script>


<template>
  <div>
    <NuxtPage />
  </div>
</template>
