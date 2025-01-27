<script setup>
    const iban = inject('iban')

</script>

<template>
    <div class="w-full flex flex-col gap-4">
        <div class="flex gap-4 flex-col pt-12 lg:pt-0 md:flex-row xs:gap-2">
            <input 
                v-model="iban.iban.value" 
                type="text" 
                placeholder="Renseignez votre IBAN" 
                class="p-2 border border-gray-300 rounded-xl w-full"
            />
            <ButtonSecondary 
                :class="{ 'cursor-not-allowed': !iban.iban.value || iban.errorMessage.value }"
                :disabled="!iban.iban.value || iban.errorMessage.value"
                @click="() => iban.updateIban(iban.vendorId.value)"
            >
                Sauvegarder
            </ButtonSecondary>
        </div>
        <p v-if="iban.errorMessage" class="text-red">{{ iban.errorMessage }}</p>
        <p v-if="iban.successMessage" class="text-green">{{ iban.successMessage }}</p>
    </div>
</template>