<script setup>
    const props = defineProps({
        withdraw: {
            type: Object,
            required: true,
        },
    });
</script>

<template> 
     <div>
        <p class="mb-2 text-lg font-semibold">
            Montant: 
            <span class="font-normal">{{ withdraw.amount }}</span>
        </p>
        <p class="mb-2 text-lg font-semibold">Date: <span class="font-normal">{{ withdraw.date }}</span></p>
        <p class="mb-2 text-lg font-semibold">Statut: <span class="font-normal">{{ withdraw.status }}</span></p>
    </div>
</template>