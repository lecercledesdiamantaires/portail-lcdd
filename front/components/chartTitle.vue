<script setup>
 const sales = inject('sales');
</script>

<template>
    <h3 
        v-if="sales.period.value == 'month'"
        class="text-xl font-semibold capitalize"
    >
        {{ sales.selectedDate.value.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }) }}
    </h3>
    <h3 
        v-else-if="sales.period.value == 'year'"
        class="text-xl font-semibold capitalize"
    >
        {{ sales.selectedDate.value.toLocaleDateString('fr-FR', { year: 'numeric'}) }}
    </h3>
    <h3 
        v-else 
        class="text-xl font-semibold capitalize"
    >
        Toutes les ventes
    </h3>
</template>