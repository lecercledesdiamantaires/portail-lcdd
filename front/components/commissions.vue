<script setup>
    definePageMeta({
        middleware: ['auth']
    });
    const sales = inject('sales');
    const iban = inject('iban');
    const withdraw = inject('withdraw');

    const promoCode = ref('');
    const user = ref(null);

    if (process.client){
        promoCode.value = localStorage.getItem('promoCode');
        user.value = JSON.parse(localStorage.getItem('user'));
        sales.getSales(promoCode.value);
    }
</script>

<template>
        <div class="flex flex-col gap-2 w-full">
            <InputIban />
            <div class="flex gap-4 flex-col">
                <CardInfos icon="sack-dollar" color="yellow" label="Mes commissions" :amount="'$ ' + sales.wallet.value"/>
                <ButtonPrimary
                    :class="{ 'cursor-not-allowed': !iban.iban.value || iban.errorMessage.value || sales.wallet.value === 0 }"
                    :disabled="!iban.iban.value || sales.wallet.value === 0  || iban.errorMessage.value"
                    @click="() => withdraw.createWithdraw(sales.wallet.value, iban.vendorId.value, user, iban.iban.value)"
                >   
                    Recevoir mes commissions
                </ButtonPrimary>
                <p v-if="withdraw.errorMessage" class="text-red">{{ withdraw.errorMessage }}</p>
            </div>
        </div>
</template>

