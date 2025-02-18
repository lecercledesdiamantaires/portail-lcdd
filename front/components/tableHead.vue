<script setup>
    const props = defineProps({
        label: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <th class="text-start w-full capitalize">{{label}}</th>
</template>