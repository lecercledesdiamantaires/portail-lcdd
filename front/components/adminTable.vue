<script setup>
    const whitelist = inject('whitelist')
    console.log(whitelist)
</script>

<template>
    <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
        <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">Role</th>
            <th class="border border-gray-300 px-4 py-2">Nom</th>
            <th class="border border-gray-300 px-4 py-2">Prénom</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Promo code</th>
            <th class="border border-gray-300 px-4 py-2">Supprimer</th>
            <th class="border border-gray-300 px-4 py-2">Voir plus</th>
        </tr>
        </thead>

        <tbody>
            <tr 
                v-for="user in whitelist.combinedData.value" 
                :key="user.id" 
                class="hover:bg-gray-50"
                :class="user.role === 'ADMIN' ? 'bg-redLight' : ''"
            >
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.role }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.firstName }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.lastName }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">{{ user.promoCode }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
                <ButtonDanger @click="whitelist.deleteEmail(user.email, user.userId)">
                    <font-awesome-icon icon="trash" />
                </ButtonDanger>
            </td>
            <td class="border border-gray-300 px-4 py-2 text-center">
            <ButtonPrimary >
                <font-awesome-icon icon="arrow-right" />
            </ButtonPrimary>
            </td>   
        </tr>
        </tbody>
    </table>
</template>
