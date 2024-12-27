<template>
    <NuxtLayout name="header">
     <div class="prose">
       <h1>404!</h1>
       <NuxtLink to="/">Retour home</NuxtLink>
     </div>
   </NuxtLayout>
 </template>
 
 <script setup>
   defineProps(['error']);
 </script>
 