<script setup>
    const sales = inject('sales');
</script>

<template>
    <div class="w-full flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">Mes ventes</h2>
        <div class="rounded-3xl bg-white sm:px-8 sm:py-6 px-4 py-2 w-full">
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
                <Popup :condition="sales.clickDuringCooldown.value == true" label="Attendez avant de cliquer" />
            </div>
            <Chart/> 
        </div>
    </div>
</template>