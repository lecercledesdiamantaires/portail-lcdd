<script setup>
    const props = defineProps({
        label: {
            type: String,
            required: true,
        },
        info: {
            type: String,
            required: true,
        },
    });
</script>

<template>
    <div class="rounded-3xl p-4 bg-white w-full flex flex-col items-center justify-center">
        <p class="text-lg capitalize font-semibold">{{ label }} : </p>
        <p class="font-normal">{{ info }}</p>
    </div>
</template>