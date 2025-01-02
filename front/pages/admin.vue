<script setup>
  definePageMeta({
      middleware: ['auth', 'admin']
    })
  const whitelist = inject('whitelist')
  const auth = inject('auth')

  onMounted(() => {
    whitelist.getWhitelist(auth.token.value)
  })

</script>


<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-4">Admin</h2>

    <div class="mb-6 flex gap-4 ">
      <input 
        v-model="whitelist.newEmail.value" 
        type="email" 
        placeholder="Ajouter un email à la whitelist" 
        class="p-2 border border-gray-300 rounded w-full" 
      />
      <Button @click="whitelist.addEmail(auth.token.value)">Ajouter</Button>
    </div>

    <div>
      <ul>
        <li v-for="user in whitelist.whitelist.value" :key="user" class="flex justify-between items-center mb-2">
          <span>{{ user.id }}</span>
          <span v-if="user.userId">{{ whitelist.users.value.find(users => users.id == parseInt(user.userId, 10))['firstName'] }}</span> 
          <span v-else>Pas connecté</span>

          <span v-if="user.userId">{{ whitelist.users.value.find(users => users.id == parseInt(user.userId, 10))['lastName'] }}</span> 
          <span v-else>Pas connecté</span>
          <span>{{ user.email }}</span>
          <button 
            @click="whitelist.deleteEmail(user.email, auth.token.value)" 
            class="bg-danger text-white px-3 py-1 rounded">
            Supprimer
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
