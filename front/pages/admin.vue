<script setup>
  definePageMeta({
      middleware: ['auth', 'admin']
    })
  const whitelist = inject('whitelist')
  const auth = inject('auth')
  const admin = inject('admin')
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
    <div class="flex flex-1 flex-col gap-4 p-2 sm:p-8">
        <div class="flex items-center justify-between sm:mb-6">
            <HelloText />   
            <div>
                <ButtonPrimary @click="admin.downloadCSV">Télécharger CSV</ButtonPrimary>
                <ButtonDanger @click="auth.logout()">
                    Déconnexion
                </ButtonDanger>
            </div>
        </div>
        <WithdrawPendingAlert />
        <InputWhitelist />
        <div>
            <SearchBar />
            <div class="overflow-x-auto">
                <AdminTable />   
            </div>
        </div>
    </div>
</template>
