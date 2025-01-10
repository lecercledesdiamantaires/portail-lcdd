<script setup>
    const sales = inject('sales')
    
</script>

<template>
    <div class="grid lg:grid-cols-4 w-full gap-4 md:grid-cols-2 sm:grid-cols-1 mt-6">
        <CardInfos icon="hand-holding-dollar" color="green" label="Argent généré" :amount="'$ ' + sales.totalAmount.value" />
        <CardInfos icon="cart-shopping" color="blue" label="Mes ventes" :amount="sales.salesData.length + ' ventes'"/>
        <CardInfos icon="paper-plane" color="purple" label="En cours" :amount="sales.incomingSales.value + ' ventes'"/>
        <CardInfos icon="sack-dollar" color="yellow" label="Mon Portefeuille" :amount="'$ ' + sales.wallet.value"/>
    </div>
</template>