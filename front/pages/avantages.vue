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

      <div class="flex items-center justify-between lg:flex-row-reverse lg:gap-32 bg-white p-8 rounded-3xl shadow-lg w-full xs:flex-col xs:gap-8 ">
        <div class="flex flex-col lg:items-start xs:items-center justify-center gap-8 max-w-2xl">
          <h2 class="text-2xl font-bold xs:text-center lg:text-start w-full">Facilitez l’accès au site en ajoutant un raccourci directement sur votre téléphone ! </h2>
          <p class="lg:text-start xs:text-center">
            Appuyez sur le bouton ci-dessous pour obtenir un livret explicatif détaillé. Suivez les étapes pas à pas et ajoutez facilement un raccourci vers le site sur votre écran d’accueil ! 🚀
          </p>
          <a href="/documents/fichier-raccourci-site.pdf" target="_blank">
            <ButtonPrimary> Voir le livret</ButtonPrimary>
          </a>
        </div>
        <div class="flex items-center justify-center gap-8 w-auto h-auto">
          <img src="assets/images/mockup.png" alt="Illustration raccourci site" class="h-full" />
        </div>

      </div>
    </div>
  </NuxtLayout>

</template>