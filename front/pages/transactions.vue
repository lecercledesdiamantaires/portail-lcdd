<script setup>
    const transaction = inject('transaction')
</script>

<template>
    <NuxtLayout name="default">
        <div class="flex w-full bg-gray-100 ">
            <div class="flex flex-col gap-4 sm:p-6 w-full xs:px-2 xs:py-6">
                <div class="flex justify-end">
                    <ButtonSecondary 
                        @click="transaction.resetFilters()"
                    >
                        Annuler les filtres
                    </ButtonSecondary>
                </div>
                <div class="flex flex-col bg-white rounded-3xl p-6  items-center justify-center">
                <table class="bg-white rounded-3xl w-full table-auto flex flex-col items-center"> 
                    <thead class="border-b border-gray-100 w-full pb-4 md:block">
                        <tr class="flex justify-between items-center w-full  gap-4">
                            <TableHead label="Client" />
                            <TableHeadWithFilter label="Date" columnFilter="orderDate" class="xs:hidden md:flex"  />
                            <TableHeadWithFilter label="Montant" columnFilter="orderAmount" />
                            <TableHead label="État" class="xs:hidden md:block" />
                        </tr>
                    </thead>
                    <tbody class="flex flex-col gap-4 justify-between items-center w-full pt-4">
                        <tr 
                            v-for="(sale, index) in transaction.sortedSales.value" 
                            :key="index" 
                            class="flex justify-between items-center w-full  gap-4"
                        >
                            <td class="text-start w-full">
                                <div class="flex flex-col">
                                    <p>{{ truncateText(sale.firstName + ' ' + sale.lastName, 16) }}</p>
                                    <p class="text-gray-400 text-xs md:hidden xs:block">{{ formatDate(sale.orderDate)}}</p>
                                </div>
                            </td>
                            <td class="text-start w-full xs:hidden md:block">{{ formatDate(sale.orderDate)}}</td>
                            <td class="text-start w-full text-green">+ {{ sale.orderAmount }} €</td>
                            <td class="text-start w-full md:block xs:hidden">
                                <StatusTag :status="sale.status" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    </NuxtLayout>
</template>