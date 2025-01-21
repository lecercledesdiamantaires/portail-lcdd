<script setup>
    import { format } from 'date-fns'
    import { fr } from 'date-fns/locale'
    
    const sales = inject('sales');
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return format(date, 'dd / MM / yyyy', { locale: fr })
    } 

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
            <th class="text-start w-full">Client</th>
            <th class="text-start w-full">Date</th>
            <th class="text-start w-full">Montant</th>
            <th class="text-start w-full">État</th>
            </tr>
        </thead>
        <tbody class="flex flex-col gap-4 justify-between items-center w-full h-wull">
            <tr 
            v-for="(sale, index) in sales.salesData.slice(0, 3)" 
            :key="index" 
            class="flex justify-between items-center w-full h-full gap-4"
            >
            <td class="text-start w-full">{{ sale.firstName + ' ' +sale.lastName }}</td>
            <td class="text-start w-full">{{ formatDate(sale.orderDate) }}</td>
            <td class="text-start w-full text-green">+ {{ sale.orderAmount }} €</td>
            <td class="text-start w-full md:block xs:hidden">
                <StatusTag :status="sale.status" />
            </td>
            </tr>
        </tbody>
    </table>
</div>  
</template>