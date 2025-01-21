<script setup>
    import { ref, computed } from 'vue'
    import { format } from 'date-fns'
    import { fr } from 'date-fns/locale'

    const sales = inject('sales')
    const sortBy = ref(null)
    const sortOrder = ref('asc')

    
    const promoCode = ref('');

    if (process.client){
        promoCode.value = localStorage.getItem('promoCode');
        sales.getSales(promoCode.value);
   }

    const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, 'dd / MM / yyyy', { locale: fr })
    }

    const sortedSales = computed(() => {
    let sortedData = [...sales.salesData]

    if (sortBy.value) {
        sortedData.sort((a, b) => {
        let aValue, bValue

        if (sortBy.value === 'orderDate') {
            aValue = new Date(a[sortBy.value])
            bValue = new Date(b[sortBy.value])
        } else if (sortBy.value === 'orderAmount') {
            aValue = parseFloat(a[sortBy.value])
            bValue = parseFloat(b[sortBy.value])
        }

        if (sortOrder.value === 'asc') {
            return aValue - bValue
        } else {
            return bValue - aValue
        }
        })
    }

    return sortedData
    })

    const sortColumn = (column) => {
    if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortBy.value = column
        sortOrder.value = 'asc'
    }
    }
</script>

<template>
    <div class="flex w-full bg-gray-100 ">
        <Sidebar />
        <div class="flex flex-col gap-4 sm:p-6 w-full xs:px-2 xs:py-6">
            <div class="flex flex-col bg-white rounded-3xl p-6  items-center justify-center">
            <table class="bg-white rounded-3xl w-full table-auto flex flex-col items-center"> 
                <thead class="border-b border-gray-100 w-full pb-4 md:block xs:hidden">
                    <tr class="flex justify-between items-center w-full  gap-4">
                        <th class="text-start w-full">Client</th>
                        <th class="text-start w-full cursor-pointer" @click="sortColumn('orderDate')">
                            Date
                            <span v-if="sortBy === 'orderDate'">
                            <font-awesome-icon :icon="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'" />
                            </span>
                        </th>
                        <th class="text-start w-full cursor-pointer" @click="sortColumn('orderAmount')">
                            Montant
                            <span v-if="sortBy === 'orderAmount'">
                            <font-awesome-icon :icon="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'" />
                            </span>
                        </th>
                        <th class="text-start w-full">État</th>
                    </tr>
                </thead>
                <tbody class="flex flex-col gap-4 justify-between items-center w-full pt-4">
                    <tr 
                        v-for="(sale, index) in sortedSales" 
                        :key="index" 
                        class="flex justify-between items-center w-full  gap-4"
                    >
                        <td class="text-start w-full">{{ sale.firstName + ' ' + sale.lastName }}</td>
                        <td class="text-start w-full">{{ formatDate(sale.orderDate) }}</td>
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

</template>