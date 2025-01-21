<script setup>
    const props = defineProps({
        status: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <div class="p-2 rounded-xl max-w-max"
        :class="{
            'bg-greenLight': status === 'confirmed',
            'bg-redLight-100': status === 'cancelled',
            'bg-gray-200': status === 'pending'
        }"
    >
        <p class="text-gray-600 capit"
            :class="{
                'text-green': status === 'confirmed',
                'text-red': status === 'cancelled',
                'text-gray-600': status === 'pending'
            }"
        >{{ status }}</p>
    </div>
</template>