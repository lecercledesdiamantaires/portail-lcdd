<script setup>
   definePageMeta({
      middleware: ['auth']
   })
   const qrCode = inject('qrCode');


</script>

<template>
    <div class="prose">
       <img src="" alt="qr code">
       <Button @click="qrCode.download()">Télécharger mon Qr Code</Button>
       <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink>
    </div>
</template>