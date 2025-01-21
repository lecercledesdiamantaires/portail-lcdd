<script setup>

</script>

<template>

    <form @submit.prevent="onSubmit">
        <div class="mb-4">
            <label for="password" class="block text-sm font-medium">Nouveau mot de passe *</label>
            <input 
            v-model="password"
            id="password" 
            type="password" 
            class="mt-1 p-2 w-full border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez un nouveau mot de passe"
            required
            />
            <p v-if="passwordError" class="text-sm text-danger mt-1">{{ passwordError }}</p>
        </div>
        <ButtonSecondary type="submit" class="w-full">Réinitialiser</ButtonSecondary>
    </form>
</template>