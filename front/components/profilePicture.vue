<script setup>
    const props = defineProps({
        userId: {
            type: Number,
            required: true,
        },
        size : {
            type: String,
            default: 'w-24 h-24 mb-4'
        }
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
    <img :src="`${API_BASE_URL}/${profil.picture.value?.url}`" alt="photo de profil" class="rounded-full bg-white object-cover" :class="size" />

</template>