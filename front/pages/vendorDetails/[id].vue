<script setup>

const route = useRoute()
const userId = route.params.id

definePageMeta({
  middleware: ['auth', 'admin'],
})

const whitelist = inject('whitelist')
const auth = inject('auth')
const sales = inject('sales')
const user = ref(null)

const canShowCardChart = ref(false)


// Fetch whitelist data when the token is available
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
    <div class="flex flex-col gap-4 sm:p-6 w-full h-screen xs:px-2 xs:py-6 bg-gray-100">

        <NuxtLink to="/admin" class="text-primary underline">Admin</NuxtLink>
        <h1 class="text-3xl font-bold">Vue de {{user?.firstName}}</h1>
        <CardInfosContainer />
        <CardChart v-if="canShowCardChart" />
    </div>
</template>