<script setup>
    const sales = inject('sales')
    
</script>

<template>
    <div class="grid lg:grid-cols-4 w-full gap-4 md:grid-cols-2 sm:grid-cols-1 mt-6">
        <CardInfos icon="hand-holding-dollar" color="green" label="Montant des ventes" :amount="'$ ' + sales.totalAmountConfirmed.value" />
        <CardInfos icon="cart-shopping" color="blue" label="Mes ventes" :amount="sales.totalOrderConfirmed.value + ' ventes'"/>
        <CardInfos icon="paper-plane" color="purple" label="En cours" :amount="sales.totalOdrerPending.value + ' ventes'"/>
        <CardInfos icon="sack-dollar" color="yellow" label="Mes commissions" :amount="'$ ' + sales.wallet.value"/>
    </div>
</template>