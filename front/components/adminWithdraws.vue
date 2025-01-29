<script setup>
    const props = defineProps({
        user: {
            type: Object,
            required: true,
        },
    });

    const admin = inject('admin');
</script>


<template>
    <div class="mt-6">
        <p v-if="user?.withdraws?.length > 1" class="mb-4 text-lg font-semibold">
            Demandes de retraits:       
            <span class="font-normal">{{ user?.withdraws?.length }}</span>
        </p>
        <p v-else class="mb-4 text-lg font-semibold">
            Demande de retrait: 
            <span class="font-normal">{{ user?.withdraws?.length }}</span>
        </p>
        <div v-for="withdraw in user?.withdraws" :key="withdraw.id" class="p-4 mb-4 flex items-center justify-between bg-white rounded-3xl">
            <AdminWithdraw :withdraw="withdraw" />
            <ButtonPrimary @click="admin.acceptWithdraw(withdraw.id, user?.email, withdraw.amount)">
                Confirmer l'envoi du paiement
            </ButtonPrimary>
        </div>
    </div>
</template>