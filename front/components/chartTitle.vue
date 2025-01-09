<script setup>
 const sales = inject('sales');
</script>

<template>
    <h3 
        v-if="sales.period.value == 'month'"
        class="sm:text-xl text-md font-semibold capitalize"
    >
        {{ sales.selectedDate.value.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }) }}
    </h3>
    <h3 
        v-else-if="sales.period.value == 'year'"
        class="sm:text-xl text-md font-semibold capitalize"
    >
        {{ sales.selectedDate.value.toLocaleDateString('fr-FR', { year: 'numeric'}) }}
    </h3>
    <h3 
        v-else 
        class="sm:text-xl text-md font-semibold"
    >
        Toutes les ventes
    </h3>
</template>