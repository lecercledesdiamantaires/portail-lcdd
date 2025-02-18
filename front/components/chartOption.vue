<script setup>
    const sales = inject('sales');
</script>

<template>
    <select 
        v-model="sales.period.value" 
        id="period-select"
        class="rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-primary "
    >
        <option value="all">Tout</option>
        <option value="year">Année</option>
        <option value="month">Mois</option>
    </select>
</template>