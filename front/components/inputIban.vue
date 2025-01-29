<script setup>
    const iban = inject('iban')

    watch(() => iban.iban.value, (newValue) => {
        if (newValue && !iban.errorMessage.value) {
            iban.updateIban(iban.vendorId.value);
        }
    });
</script>

<template>
    <div class="w-full flex flex-col gap-4">
        <div class="flex flex-col pt-12 lg:pt-0 xs:gap-2">
            <h3 class="font-bold">Votre Iban :</h3>
            <input 
                v-model="iban.iban.value" 
                type="text" 
                placeholder="Renseignez votre IBAN" 
                class="p-2 border border-gray-300 rounded-xl w-full"
            />
        </div>
        <p v-if="iban.errorMessage" class="text-red">{{ iban.errorMessage }}</p>
    </div>
</template>