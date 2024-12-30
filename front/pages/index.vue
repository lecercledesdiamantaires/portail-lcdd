<script setup>
   definePageMeta({
      middleware: ['auth']
   })
   const qrCode = inject('qrCode');
</script>

<template>
    <div class="prose">
       <img src="" alt="qr code">
       <button @click="qrCode.download()">Télécharger mon Qr Code</button>
       <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink>
    </div>
</template>