<script setup>
    const sales = inject('sales');
</script>

<template>
    <h2 class="text-2xl font-semibold">Vos ventes</h2>
    <div class="rounded-xl bg-white sm:px-8 sm:py-6 px-4 py-2 ">
        <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
        <ButtonArrow
            :isAllPeriod="sales.period.value === 'all'"
            :isDisabled="sales.isAtMinDate.value"
            direction="left"
            :onClick="sales.navigateBack"
        />
        <ChartTitle />
        <ButtonArrow
            :isAllPeriod="sales.period.value === 'all'"
            :isDisabled="sales.isAtMaxDate.value"
            direction="right"
            :onClick="sales.navigateForward"
        />
    </div>
    <ChartOption />

    <!-- Popup -->
    <div 
        v-if="sales.clickDuringCooldown.value" 
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white text-danger px-6 py-4 rounded shadow-lg text-center">
            <p class="text-lg font-semibold">Attendez avant de cliquer</p>
        </div>
    </div>
</div>

        
        <Chart /> 
    </div>
</template>