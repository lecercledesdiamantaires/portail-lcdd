<script setup>
    const transaction = inject('transaction')
    const props = defineProps({
        label: {
            type: String,
            required: true
        }, 
        columnFilter: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <th class="text-start w-full cursor-pointer flex gap-4 items-center" @click="transaction.sortColumn('orderDate')">
        {{ label }}
        <span v-if="transaction.sortBy.value === columnFilter">
            <font-awesome-icon :icon="transaction.sortOrder.value === 'asc' ? 'arrow-up' : 'arrow-down'" />
        </span>
        <span v-else class="flex flex-col">
            <font-awesome-icon icon="caret-up" class="w-2 h-4" />
            <font-awesome-icon icon="caret-down" class="w-2 h-4" />
        </span>
    </th>
</template>