<script setup>
    const props = defineProps({
        userId: {
            type: Number,
            required: true,
        },
    });

    const profil = inject('profil');
    const config = useRuntimeConfig();
    const API_BASE_URL = config.public.API_BASE_URL

    const pictureUrl = ref('');
    const isLoading = ref(true);

    if (process.client) {
        profil.getPicture(props.userId)
        .then((url) => {
            pictureUrl.value = url;
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération de l\'image :', error);
        })
        .finally(() => {
            isLoading.value = false;
        });
    } else {
        isLoading.value = false;
    }
</script>

<template>
    <img :src="`${API_BASE_URL}/${profil.picture.value?.url}`" alt="photo de profil" class="w-24 h-24 rounded-full mb-4 bg-white object-cover" />
</template>