<script setup>
    const whitelist = inject('whitelist')
    const admin = inject('admin')
    const totalCardSentPending = ref('')
    const getTotalCardSentPending = () => {
        totalCardSentPending.value = whitelist.combinedData.value
            .filter(user => user.role == 'VENDEUR' && !user.cardSent)
            .length;
    }
    watchEffect(() => {
        getTotalCardSentPending();
    })
</script>

<template>
    <div v-if="whitelist?.withdrawsPending?.value?.length > 0" class="px-4 py-3 rounded-xl border border-redLight-300 bg-redLight-100 text-center">
        <p>Il y a {{ whitelist?.withdrawsPending?.value?.length }} demandes de virements en attente</p>
    </div>
    <div v-if="totalCardSentPending > 0" class="px-4 py-3 rounded-xl border border-redLight-300 bg-redLight-100 flex justify-between md:flex-row flex-col gap-2 md:text-start text-center items-center">
        <div class="flex flex-col" v-if="totalCardSentPending>1">
            <p>Il y a {{ totalCardSentPending }} cartes qui n'ont pas été envoyées</p>
            <p>Téléchargez le CSV à mettre dans google sheet pour les envoyer</p>
        </div>
        <div class="flex flex-col" v-else>
            <p>Il y a {{ totalCardSentPending }} carte qui n'a pas été envoyée</p>
            <p>Téléchargez le CSV à mettre dans google sheet pour l'envoyer</p>
        </div>
        <ButtonPrimary @click="admin.downloadCSV">Télécharger</ButtonPrimary>
    </div>
</template>