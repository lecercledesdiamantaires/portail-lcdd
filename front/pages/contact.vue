<script setup>
    const email = inject('email');
    const user = ref('');
    if (process.client){
        user.value = JSON.parse(localStorage.getItem('user'));
    }
</script>


<template>
    <NuxtLayout name="default">
        <div class="flex w-full bg-gray-100 h-screen items-center justify-center">

            <div class="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
                <h1 class="text-3xl font-semibold mb-6">Contactez-nous</h1>
                <form @submit.prevent="submitForm">
                    <div class="mb-4">
                        <label class="block text-sm font-medium" for="message">Sujet:</label>
                        <input id="message" class="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        type="text" v-model="email.subject.value" required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium"  for="message">Message:</label>
                        <textarea id="message" class="mt-1 p-2 w-full h-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        v-model="email.message.value" required></textarea>
                    </div>
                    <ButtonPrimary type="submit" class="w-full" @click="email.sendEmailContact(user.email, email.subject.value, email.message.value )">
                        Envoyer
                    </ButtonPrimary>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>
  