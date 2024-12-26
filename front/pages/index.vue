<script setup>
   const qrCode = inject('qrCode');
</script>

<template>
    <div class="prose">
       <h1>je suis là</h1>
       <img src="" alt="qr code">
       <button @click="qrCode.download()">Télécharger mon Qr Code</button>
    </div>
</template>