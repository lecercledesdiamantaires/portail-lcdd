<script setup>
definePageMeta({
  middleware: ['auth']
});

</script>

<template>
  <NuxtLayout >
    <div class="py-16 px-8 flex flex-col items-center justify-center gap-32 max-w-7xl mx-auto">
      <div class="flex flex-col items-center justify-center gap-8">
        <h2 class="text-2xl font-bold xs:text-center lg:text-start w-full">Comment fonctionne votre code promo ?</h2>
        <CardAdvantagesContainer />
      </div>
      <TutoTransactions class="bg-white rounded-3xl p-8"/>
      <TutoInstall />
    </div>
  </NuxtLayout>

</template>