<script setup>
    const sales = inject('sales');

    const props = defineProps({
        sales: {
            type: Object,
            required: true
        }
    })
</script>



<template>

<div class="flex flex-col bg-white rounded-3xl p-6 h-full items-center justify-center max-h-72">
    <table class="bg-white rounded-3xl w-full h-full table-auto flex flex-col justify-between items-center"> 
        <thead class="border-b border-gray-100 w-full pb-4 md:block xs:hidden">
            <tr class="flex justify-between items-center w-full h-full gap-4">
            <TransactionsHead class="text-start w-full">Client</TransactionsHead>
            <TransactionsHead class="text-start w-full">Date</TransactionsHead>
            <TransactionsHead class="text-start w-full">Montant</TransactionsHead>
            <TransactionsHead class="text-start w-full">État</TransactionsHead>
            </tr>
        </thead>
        <tbody class="flex flex-col gap-4 justify-between items-center w-full h-full">
            <div 
                v-if="sales.salesData.length > 0"
                class="flex flex-col gap-4 w-full h-full pt-6"
            >
                <tr
                    v-for="(sale, index) in sales.salesData.slice(0, 3)" 
                    :key="index" 
                    class="flex justify-between items-center w-full h-full gap-4"
                >
                    <TransactionsRow class="text-start w-full">{{ sale.firstName + ' ' +sale.lastName }} </TransactionsRow>
                    <TransactionsRow class="text-start w-full">{{ formatDate(sale.orderDate) }}</TransactionsRow>
                    <TransactionsRow class="text-start w-full text-green">+ {{ sale.orderAmount }} €</TransactionsRow>
                    <TransactionsRow class="text-start w-full md:block xs:hidden">
                        <StatusTag :status="sale.status" />
                    </TransactionsRow>
                </tr>
            </div>
            <div v-else class="flex flex-1 h-full pt-6">
                <p class="text-sm text-gray-500 text-center">Aucune transaction</p>
            </div>
        </tbody>
    </table>
</div>  
</template>