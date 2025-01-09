<script setup>
    const whitelist = inject('whitelist')
</script>

<template>
    <div class="mb-6 flex gap-4 ">
        <input 
            v-model="whitelist.newEmail.value" 
            type="email" 
            placeholder="Ajouter un email à la whitelist" 
            class="p-2 border border-gray-300 rounded w-full" 
        />
        <ButtonSecondary @click="whitelist.addEmail()">Ajouter</ButtonSecondary>
    </div>

</template>