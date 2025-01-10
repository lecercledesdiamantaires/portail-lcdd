<script setup>
    import { ref, inject } from 'vue'
    const whitelist = inject('whitelist')
    watch(() => whitelist.newEmail.value, (newValue) => {
        if (whitelist.errorMessage.value && whitelist.validateEmail(newValue)) {
            whitelist.errorMessage.value = ''
        }
    })
</script>

<template>
    <div class="mb-6 flex flex-col gap-4">
        <div class="flex gap-4">
            <input 
                v-model="whitelist.newEmail.value" 
                type="email" 
                placeholder="Ajouter un email à la whitelist" 
                class="p-2 border border-gray-300 rounded w-full" 
            />
            <ButtonSecondary @click="whitelist.addEmail()">Ajouter</ButtonSecondary>
        </div>
        <p v-if="whitelist.errorMessage" class="text-red text-sm">{{ whitelist.errorMessage }}</p>
    </div>
</template>
