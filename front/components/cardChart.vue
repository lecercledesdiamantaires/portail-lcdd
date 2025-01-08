<script setup>
    const sales = inject('sales');
</script>

<template>
    <h2 class="text-2xl font-semibold">Vos ventes</h2>
    <div class="rounded-xl bg-white px-8 py-6">
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
                <p class="text-danger" v-if="sales.clickDuringCooldown.value">Attendez avant de cliquer</p>
            </div>
            <ChartOption />
        </div>
        
        <Chart /> 
    </div>
</template>