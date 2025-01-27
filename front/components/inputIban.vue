<script setup>
    const iban = inject('iban')
    const myProfile = ref(null)

    if (process.client) {
        const userProfile = localStorage.getItem('user');
        if (userProfile) {
            myProfile.value = JSON.parse(userProfile);
            iban.getVendorByUserId(myProfile.value.id);
        }
    }

    watch(myProfile, (newProfile) => {
        if (newProfile && newProfile.id) {
            iban.getVendorByUserId(newProfile.id);
        }
    }, { immediate: true })

    watch(iban.vendorId, (newVendorId) => {
        if (newVendorId) {
            iban.getIban(newVendorId);
        }
    }, { immediate: true })

    watch(() => iban.iban.value, (newValue) => {
        if (iban.validateIban(newValue)) {
            iban.errorMessage.value = null;
        } else {
            iban.errorMessage.value = 'IBAN invalide';
        }
    })
</script>

<template>
    <div class="mb-6 w-full flex flex-col gap-4">
        <div class="flex gap-4">
            <input 
                v-model="iban.iban.value" 
                type="text" 
                placeholder="Renseignez votre IBAN" 
                class="p-2 border border-gray-300 rounded w-full"
            />
            <ButtonPrimary 
                :class="{ 'cursor-not-allowed': !iban.iban.value || iban.errorMessage.value }"
                :disabled="!iban.iban.value || iban.errorMessage.value"
                @click="() => iban.updateIban(iban.vendorId.value)"
            >
                Sauvegarder
            </ButtonPrimary>
        </div>
        <p v-if="iban.errorMessage" class="text-red">{{ iban.errorMessage }}</p>
        <p v-if="iban.successMessage" class="text-green">{{ iban.successMessage }}</p>
    </div>
</template>