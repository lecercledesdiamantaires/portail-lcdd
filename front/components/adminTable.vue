<script setup>
    const whitelist = inject('whitelist')
</script>

<template>
    <table class="table-auto w-full border-collapse ">
        <thead>
            <tr class="bg-gray-100">
                <adminHead>Role</adminHead>
                <adminHead>Nom</adminHead>
                <adminHead>Prénom</adminHead>
                <adminHead>Email</adminHead>
                <adminHead>Promo code</adminHead>
                <adminHead>Supprimer</adminHead>
                <adminHead>Voir plus</adminHead>
            </tr>
        </thead>

        <tbody>
            <tr 
                v-for="user in whitelist.combinedData.value" 
                :key="user.id" 
                class="hover:ring-2 hover:ring-inset hover:ring-redLight-300 hover:bg-gray-200"
                :class="user.role === 'ADMIN' ? 'bg-redLight-100 hover:bg-redLight-200' : ''"
            >
                <adminRow>{{ user.role }}</adminRow>
                <adminRow>{{ user.firstName }}</adminRow>
                <adminRow>{{ user.lastName }}</adminRow>
                <adminRow>{{ user.email }}</adminRow>
                <adminRow>{{ user.promoCode }}</adminRow>
                <adminRow>
                    <ButtonDanger @click="whitelist.deleteEmail(user.email, user.userId)">
                        <font-awesome-icon icon="trash" />
                    </ButtonDanger>
                </adminRow>
                <adminRow v-if="user.role === 'ADMIN' || user.role === 'Unknown'">
                    <ButtonPrimary class="cursor-not-allowed !bg-gray-600">
                        <font-awesome-icon icon="arrow-right" />
                    </ButtonPrimary>
                </adminRow>   
                <adminRow v-else>
                    <ButtonPrimary>
                        <font-awesome-icon icon="arrow-right" />
                    </ButtonPrimary>
                </adminRow>   
            </tr>
        </tbody>
    </table>
</template>
