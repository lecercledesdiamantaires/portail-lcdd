<script setup>
    const whitelist = inject('whitelist')
    const popup = inject('popup')
    const profil = inject('profil')
    const searchBar = inject('searchBar')
    const shopifyApi = inject('shopifyApi')
    const myProfil = ref(null)

    const deleteUser = (user) => {
        shopifyApi.deletePromoCode(user.promoCode)
        whitelist.deleteVendor(user.userId)
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
        <table class="table-auto  w-full border-collapse">
            <thead>
                <tr class="bg-gray-100">
                    <adminHead>Retrait</adminHead>
                    <adminHead>Carte</adminHead>
                    <adminHead>Role</adminHead>
                    <adminHead>Nom</adminHead>
                    <adminHead>Prénom</adminHead>
                    <adminHead>Email</adminHead>
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
                    <adminRow>{{user.withdraws?.length}}</adminRow>
                    <adminRow>
                        <input 
                            type="checkbox" 
                            :checked="user.cardSent" 
                            @change="profil.updateCardSent(user.userId, !user.cardSent)" 
                        />
                    </adminRow>                    
                    <adminRow>
                        <select class="py-2 outline-none" v-model="user.role" @change="profil.updateUserRole(user.userId, user.role)">
                            <option value="ADMIN">ADMIN</option>
                            <option value="VENDEUR">VENDEUR</option>
                        </select>
                    </adminRow>  
                    <adminRow>{{ user.firstName }}</adminRow>
                    <adminRow>{{ user.lastName }}</adminRow>
                    <adminRow>{{ user.email }}</adminRow>
                    <adminRow v-if="myProfil.email !== user.email">
                        <ButtonDanger  @click="popup.openPopup()">
                            <font-awesome-icon icon="trash" />
                        </ButtonDanger>
                        <Popup :condition="popup.popup.value === true" label="Êtes-vous sûr de vouloir supprimer l'utilisateur ?">    
                            <div class="flex flex-col w-full gap-2 py-4">
                                <ButtonSecondary @click="popup.closePopup()">Annuler</ButtonSecondary>
                                <ButtonDanger @click="deleteUser(user)">Confirmer</ButtonDanger>
                            </div>
                        </Popup>
                    </adminRow>
                    <adminRow v-if="user.role === 'VENDEUR'">
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
