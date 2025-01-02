<script setup>
  import { Trash2, Home } from 'lucide-vue-next';

  definePageMeta({
      middleware: ['auth']
    })
  const whitelist = inject('whitelist')
  const auth = inject('auth')

  onMounted(() => {
    whitelist.getWhitelist()
    
  })

</script>


<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="w-full flex items-center justify-between mb-6">
      <Button >
        <NuxtLink to="/" class="w-full"><Home /></NuxtLink>
      </Button>
      <h1 class="text-3xl font-bold mb-4">Admin</h1>
      <Button
        @click="auth.logout()"
        class="!bg-danger"
      >
        Déconnexion
      </Button>
    </div>
   

    <div class="mb-6 flex gap-4 ">
      <input 
        v-model="whitelist.newEmail.value" 
        type="email" 
        placeholder="Ajouter un email à la whitelist" 
        class="p-2 border border-gray-300 rounded w-full" 
      />
      <Button @click="whitelist.addEmail()">Ajouter</Button>
    </div>

    <div>
    <div class="grid grid-cols-5 gap-4 mb-4 font-bold">
      <div>ID</div>
      <div>Nom</div>
      <div>Prénom</div>
      <div>Email</div>
      <div></div>
    </div>
    <ul>
      <li v-for="user in whitelist.whitelist.value" :key="user.id" class="grid grid-cols-5 gap-4 items-center mb-2">
        <span>{{ user.id }}</span>
        <span v-if="user.userId">
          {{ whitelist.users.value ? whitelist.users.value.find(users => users.id == parseInt(user.userId, 10))?.lastName : 'Utilisateur inconnu' }}
        </span> 
        <span v-else>Inconnu</span>
        <span v-if="user.userId">
          {{ whitelist.users.value ? whitelist.users.value.find(users => users.id == parseInt(user.userId, 10))?.firstName : 'Utilisateur inconnu' }}
        </span> 
        <span v-else>Inconnu</span>
        <span>{{ user.email }}</span>
        <Button 
          @click="whitelist.deleteEmail(user.email, user.userId)" 
          class="!bg-danger"
        >
          <Trash2 />
        </Button>
      </li> 
    </ul>
  

    </div>
  </div>
</template>
