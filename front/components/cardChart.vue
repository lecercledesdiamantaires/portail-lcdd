<script setup>
    const sales = inject('sales');
</script>

<template>
    <select v-model="sales.period.value" id="period-select">
        <option value="all">Tout</option>
        <option value="year">Année</option>
        <option value="month">Mois</option>
    </select>
    <p>Selected Date: {{ sales.selectedDate.value.toISOString().slice(0, 10) }}</p>
    <div 
        v-if="sales.period.value !== 'all'"
        class="flex"
    >
        <ButtonPrimary v-if="!sales.isAtMinDate.value" @click="sales.navigateBack">Back</ButtonPrimary>
        <ButtonPrimary v-if="!sales.isAtMaxDate.value" @click="sales.navigateForward">Forward</ButtonPrimary>
        <p class="text-danger" v-if="sales.clickDuringCooldown.value">Attendez avant de cliquer</p>
    </div>
    <Chart /> 
</template>