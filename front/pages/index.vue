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
       <NuxtLink to="/admin" class="text-blue-500 underline">Admin</NuxtLink>
    </div>
</template>