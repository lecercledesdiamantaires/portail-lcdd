<script setup>
    const sales = inject('sales');
</script>

<template>
    <h2 class="text-2xl font-semibold">Mes ventes</h2>
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
            <Popup label="Attendez avant de cliquer" />
        </div>

        <Chart/> 
    </div>
</template>