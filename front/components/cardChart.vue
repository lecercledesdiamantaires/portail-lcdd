<script setup>
    const sales = inject('sales');
</script>

<template>
    <h2 class="text-2xl font-semibold">Vos ventes</h2>
    <div class="rounded-xl bg-white px-8 py-6">
        <div class="flex items-center justify-between">
            <ChartTitle />
            <ChartOption />
        </div>
        
        <div 
            v-if="sales.period.value !== 'all'"
            class="flex"
        >
        <ButtonPrimary 
        :class="{ 'opacity-50 cursor-not-allowed': sales.isAtMinDate.value }" 
        :disabled="sales.isAtMinDate.value" 
        @click="sales.navigateBack">
        Back
        </ButtonPrimary>
        <font-awesome-icon icon="arrow-right" />

        <ButtonPrimary 
        :class="{ 'opacity-50 cursor-not-allowed': sales.isAtMaxDate.value }" 
        :disabled="sales.isAtMaxDate.value" 
        @click="sales.navigateForward">
        Forward
        </ButtonPrimary>
            <p class="text-danger" v-if="sales.clickDuringCooldown.value">Attendez avant de cliquer</p>
        </div>
        <Chart /> 
    </div>
</template>