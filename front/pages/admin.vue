<!-- <script setup>
const { user, token } = useAuth()

if (!token.value || user.value?.role !== 'ADMIN') {
router.push('/login')
}
</script> -->
  

<template>
    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Admin</h2>
        <p>Bienvenue sur la page Admin ! Vous avez accès à cette page parce que vous êtes connecté avec un rôle approprié.</p>
      </div>
    </div>
</template>
