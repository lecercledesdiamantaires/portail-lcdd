<script setup>
    const sales = inject('sales');

    const props = defineProps({
        label: {
            type: String,
            required: true
        },
        condition : {
            type: Boolean,
            required: true
        }
    })
</script>

<template>
    <div 
        v-if="condition" 
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center z-50"
    >
        <div class="bg-white text-danger px-6 py-8 rounded shadow-lg text-center">
            <p class="text-lg font-semibold">{{label}}</p>
            <slot/>
        </div>
    </div>

</template>
