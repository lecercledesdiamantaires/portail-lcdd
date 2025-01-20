<script setup>
    const whitelist = inject('whitelist')
    const popup = inject('popup')
    const profil = inject('profil')
    const searchBar = inject('searchBar')
    const myProfil = ref(null)

    const deleteUser = (user) => {
        whitelist.deleteEmail(user.email, user.userId) 
        popup.closePopup()
    }
    if (process.client) {
        myProfil.value = JSON.parse(localStorage.getItem('user'))
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
                    :class="{
                        'bg-blueLight': user.role === 'ADMIN'
                    }"
                >
                    <adminRow>
                        <select class="p-2 outline-none" v-model="user.role" @change="profil.updateUserRole(user.userId, user.role)">
                            <option value="ADMIN">ADMIN</option>
                            <option value="VENDEUR">VENDEUR</option>
                        </select>
                    </adminRow>  
                    <adminRow>{{ user.firstName }}</adminRow>
                    <adminRow>{{ user.lastName }}</adminRow>
                    <adminRow>{{ user.email }}</adminRow>
                    <adminRow>{{ user.promoCode }}</adminRow>

                    <adminRow>
                        <ButtonDanger v-if="myProfil.email !== user.email" @click="popup.openPopup()">
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
