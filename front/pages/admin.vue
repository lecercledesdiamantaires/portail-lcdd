<script setup>
 definePageMeta({
    middleware: ['auth', 'admin']
  })

const { addEmailToWhitelist, deleteEmailFromWhitelist, getWhitelist, whitelist } = useWhitelist()
const newEmail = ref('')


const addEmail = async () => {
  if (newEmail.value) {
    await addEmailToWhitelist(newEmail.value)
    newEmail.value = ''
    await getWhitelist()
  }
}

const deleteEmail = async (email) => {
  await deleteEmailFromWhitelist(email)
  await getWhitelist()
}

onMounted(() => {
  getWhitelist()
})
</script>


<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-4">Admin</h2>

    <div class="mb-6 flex gap-4 ">
      <input 
        v-model="newEmail" 
        type="email" 
        placeholder="Ajouter un email à la whitelist" 
        class="p-2 border border-gray-300 rounded w-full" 
      />
      <button 
        @click="addEmail"
        class="bg-blue-500 text-white px-4 py-2 rounded">
        Ajouter
      </button>
    </div>

    <div>
      <ul>
        <li v-for="user in whitelist" :key="user" class="flex justify-between items-center mb-2">
          <span>{{ user.id }}</span>
          <span>{{ user.email }}</span>
          <button 
            @click="deleteEmail(user.email)" 
            class="bg-red-500 text-white px-3 py-1 rounded">
            Supprimer
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
