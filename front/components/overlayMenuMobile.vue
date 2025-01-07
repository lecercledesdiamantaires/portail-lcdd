<script setup>
    defineProps(
        {
        isOpen: Boolean,
        toggleMenu: Function
    })
</script>


<template>
    <div
        v-if="isOpen"
        @click="toggleMenu"
        class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        >
    </div>

</template>