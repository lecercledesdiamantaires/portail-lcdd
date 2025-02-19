<script setup>

    const props  = defineProps({
        promoCode: {
            type: String,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    })

  const { generateQrCode, data } = inject('qrCode');

    watch(() => props.promoCode, (newPromoCode) => {
    if (newPromoCode) {
        generateQrCode(newPromoCode);
    }
    }, { immediate: true });
</script>


<template>

    <div class="flex flex-col gap-4 2xl:max-w-lg xs:max-w-96 w-full">
        <div>
            <h2 class="text-2xl font-semibold">Ma carte</h2>
        </div>
        <div class="container-card flex flex-col rounded-3xl max-h-72 h-full justify-between">
            <div class=" flex p-6 gap-4">
                <img :src="data" alt="qr code" class="qr-code rounded-2xl md:h-40 md:w-40 xs:h-32 xs:w-32"/>
                <div class="flex flex-col items-end justify-between h-full flex-1">
                    <ProfilePicture :userId="user?.id" size="w-20 aspect-square"/>
                    <div class="flex flex-col items-start w-full">
                        <p class="md:text-lg text-white xs:text-md capitalize">{{ user?.firstName }}</p>
                        <p class="md:text-lg text-white xs:text-md uppercase">{{ user?.lastName }}</p>
                    </div>
                </div>
            </div>
            <div class="bottom-card w-full h-full px-6 py-5 rounded-b-3xl flex justify-between items-center">
                <div>
                    <h4 class="md:text-sm uppercase font-extralight text-gray-200 tracking-wider xs:text-xs" >Code prestige :</h4>
                    <p class="text-lg text-white">{{ promoCode }}</p>
                </div>
                <Logo color="white" height="h-full" width="w-full" class="h-12 w-12"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
   .container-card {
      background: linear-gradient(107deg, #006D5C 2.61%, #003D34 101.2%);
   }

   .bottom-card {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.00) 100%);
   }
</style>