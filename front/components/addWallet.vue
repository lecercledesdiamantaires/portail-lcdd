<script setup>
import { inject } from "vue";

    // const { getWalletId } = inject('wallet');
    const props = defineProps({
        logo :{
            type:String,
            required:true
        },
        user:{
            type:Object,
            required:true
        },

    })

    const image = computed(() => new URL(`../assets/icons/${props.logo}-wallet.png`, import.meta.url).href);

    // const walletCard = await getWalletId(props.user.id);

    // const linkWalletCard = `https://app.addtowallet.co/card/${walletCard.walletId}`;

    
</script>

<template>
    <a :href="linkWalletCard" class="flex justify-center items-center w-full" target="_blank">
        <div class="flex justify-center items-center gap-3 bg-black text-white py-3 px-6 rounded-2xl cursor-pointer w-full text-sm">
        <img :src="image"  class="h-6 w-auto" :alt="logo"/>
            <h3>Ajouter à {{ logo }} Wallet</h3>
        </div>
    </a> 
</template>