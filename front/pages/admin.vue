<script setup>
  import { Trash2, Home, ArrowRight } from 'lucide-vue-next';
  import { onMounted } from 'vue';

  definePageMeta({
      middleware: ['auth', 'admin']
    })
  const whitelist = inject('whitelist')
  const auth = inject('auth')
  if (process.client) {
    watchEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            whitelist.getWhitelist(token)
        }
    })
  }
</script>


<template>
    <div class="flex-1 p-2 sm:p-8">
        <div class="flex items-center justify-between mb-2 sm:mb-6">
            <HelloText />   
            <ButtonDanger @click="auth.logout()">
                Déconnexion
            </ButtonDanger>
        </div>
        <InputWhitelist />
        <div class="overflow-x-auto">
            <AdminTable />   
        </div>
    </div>
</template>
