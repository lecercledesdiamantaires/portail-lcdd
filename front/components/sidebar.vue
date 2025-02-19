<script setup>
    // État du menu burger
    const isOpen = ref(false);
    // Fonction pour ouvrir/fermer le menu
    const toggleMenu = () => {
        isOpen.value = !isOpen.value;
    };
</script>


<template>
    <div class="lg:sticky top-0 lg:bg-white lg:shadow-lg h-screen lg:transform lg:transition-transform lg:duration-300 lg:ease-in-out ">
       
        <ButtonToggleMenu :isOpen="isOpen" :toggleMenu="toggleMenu" />
      
        <aside
            :class="[
            'xs:fixed lg:relative flex flex-col h-screen w-64 bg-white xs:z-40 transform transition-transform duration-300 ease-in-out py-8',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0 lg:w-auto'
            ]"
            >
            <div class="flex flex-col h-full justify-between w-full">
                <div class="flex flex-col justify-center gap-12">
                    <NuxtLink to="/" class="flex justify-center">
                        <Logo color="colored"/>
                    </NuxtLink>
                    <div class="flex flex-col gap-4 items-center pr-8">
                        <LinkAside direction="accueil" />
                        <LinkAside direction="transactions" />
                        <LinkAside direction="profil" />
                        <LinkAside direction="avantages" />
                    </div>
                </div>

                <LinkAside direction="logout" class="cursor-pointer"/>
            </div>
        </aside>

        <OverlayMenuMobile :isOpen="isOpen" :toggleMenu="toggleMenu" />
      </div>
</template>