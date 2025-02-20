<script setup>

  const route = useRoute()
  const userId = route.params.id

  definePageMeta({
    middleware: ['auth', 'admin'],
  })

  const whitelist = inject('whitelist')
  const sales = inject('sales')
  const admin = inject('admin')
  const user = ref(null)
  const canShowCardChart = ref(false)

  if (process.client) {
    watchEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
        whitelist.getWhitelist(token)
      }
    })
  }

  watch(
      () => whitelist.combinedData.value,
      (newData) => {
          if (newData) {
              user.value = newData.find((item) => item.userId == userId);
              if (user.value.promoCode) {
                  sales.getSales(user.value.promoCode);
              }
              setTimeout(() => {
                canShowCardChart.value = true
              }, 500)  
          } else {
              console.error('Whitelist combinedData is not yet available.');
          }
      }
  );
</script>

<template>
    <div class="flex flex-col gap-4 sm:p-6 w-full h-screen overflow-y-auto xs:px-2 xs:py-6 bg-gray-100">
        <NuxtLink to="/admin" class="text-primary underline">Retour</NuxtLink>        
        <div class="flex items-center justify-between gap-4">
          <h1 class="text-3xl font-bold">Vue de <span class="capitalize">{{user?.firstName}} {{user?.lastName}}</span></h1>
          <ProfilePicture :userId="userId" />
        </div>
        <div class="flex flex-col gap-6">
          <div class="flex lg:flex-row md:flex-col xs:flex-col gap-6 justify-between">
            <AdminInfo label="Email" :info="user?.email" />
            <AdminInfo label="Iban" :info="user?.vendorIban" />
            <AdminInfo label="Total retiré" :info="user?.totalWithdraw" />
          </div>
          <div class="flex lg:flex-row md:flex-col xs:flex-col gap-6 justify-between">
            <AdminInfo label="Adresse" :info="user?.address" />
            <AdminInfo label="Promocode" :info="user?.promoCode" />
          </div>
          <AdminWithdraws :user="user" />
        </div>
        <CardInfosContainer />
        <CardChart v-if="canShowCardChart" />
    </div>
</template>