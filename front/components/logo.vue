<script setup>
defineProps({
    color: {
        type: String,
        required: true
    },
    height:{
        type: String,
        default: 'h-20'
    },
    width:{
        type: String,
        default: 'w-20'
    }
})
</script>




<template>
    <div class="flex justify-center items-center">
        <img v-if="color === 'colored'" src="./../assets/icons/favicon.png" alt="Logo LCDD" :class="[height, width]" />
        <img v-if="color === 'white'" src="./../assets/icons/logo_white.png" alt="Logo LCDD" :class="[height, width]" />
    </div>
</template>