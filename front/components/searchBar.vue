<script setup>
    const searchBar = inject('searchBar');
</script>

<template>
    <div class="mb-4">
        <input 
            type="text" 
            v-model="searchBar.searchQuery.value" 
            placeholder="Rechercher..." 
            class="w-full p-2 border rounded-3xl "
        />
    </div>
</template>