<script setup>
    const whitelist = inject('whitelist')
    const popup = inject('popup')
    const searchBar = inject('searchBar')

    const deleteUser = (user) => {
        whitelist.deleteEmail(user.email, user.userId) 
        popup.closePopup()
    }
    const filteredUsers = computed(() => {
        return whitelist.combinedData.value.filter(user => {
            const query = searchBar.searchQuery.value.toLowerCase()
            return (
                user.role.toLowerCase().includes(query) ||
                user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.promoCode.toLowerCase().includes(query)
            )
        })
    })
</script>

<template>
    <div>
        <table class="table-auto w-full border-collapse">
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
                    v-for="user in filteredUsers" 
                    :key="user.id" 
                    class="hover:ring-2 hover:ring-inset hover:ring-redLight-300 hover:bg-gray-200"
                    :class="user.role === 'ADMIN' ? 'bg-blueLight' : ''"
                >
                    <adminRow>{{ user.role }}</adminRow>
                    <adminRow>{{ user.firstName }}</adminRow>
                    <adminRow>{{ user.lastName }}</adminRow>
                    <adminRow>{{ user.email }}</adminRow>
                    <adminRow>{{ user.promoCode }}</adminRow>
                    <adminRow>
                        <ButtonDanger @click="popup.openPopup()">
                            <font-awesome-icon icon="trash" />
                        </ButtonDanger>
                        <Popup :condition="popup.popup.value === true" label="Êtes-vous sûr de vouloir supprimer l'utilisateur ?">    
                            <div class="flex flex-col w-full gap-2 py-4">
                                <ButtonSecondary @click="popup.closePopup()">Annuler</ButtonSecondary>
                                <ButtonDanger @click="deleteUser(user)">Confirmer</ButtonDanger>
                            </div>
                        </Popup>
                    </adminRow>
                    <adminRow v-if="user.role === 'ADMIN' || user.role === 'Unknown'">
                        <ButtonPrimary class="cursor-not-allowed !bg-gray-600">
                            <font-awesome-icon icon="arrow-right" />
                        </ButtonPrimary>
                    </adminRow>   
                    <adminRow v-else>
                        <ButtonPrimary>
                            <NuxtLink :to="{ name: 'vendorDetails-id', params: { id: user.userId } }">
                                <font-awesome-icon icon="arrow-right" />
                            </NuxtLink>
                        </ButtonPrimary>
                    </adminRow>   
                </tr>
            </tbody>
        </table>
    </div>
</template>
