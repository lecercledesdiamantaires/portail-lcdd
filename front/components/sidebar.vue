<script setup>
    // État du menu burger
    const isOpen = ref(false);
    // Fonction pour ouvrir/fermer le menu
    const toggleMenu = () => {
        isOpen.value = !isOpen.value;
    };
</script>


<template>
    <div class="lg:w-64 lg:bg-white lg:shadow-lg h-screen lg:transform lg:transition-transform lg:duration-300 lg:ease-in-out lg:pr-32">
        <!-- Bouton du menu burger -->
        <ButtonToggleMenu :isOpen="isOpen" :toggleMenu="toggleMenu" />

        <!-- Sidebar -->
        <aside
            :class="[
            'fixed flex flex-col h-screen w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out py-8',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0 lg:w-auto'
            ]"
            >
            <div class="flex flex-col h-full justify-between w-full">
                <!-- Partie supérieure -->
                <div class="flex flex-col justify-center gap-12">
                    <Logo color="colored"/>
                    <div class="flex flex-col gap-4 items-center pr-8">
                        <LinkAside direction="dashboard" />
                        <LinkAside direction="transactions" />
                        <LinkAside direction="profil" />
                    </div>
                </div>

                <!-- Lien de déconnexion -->
                <LinkAside direction="logout" class="cursor-pointer"/>
            </div>
        </aside>

         <!-- Overlay (pour fermer le menu en mobile) -->
        <OverlayMenuMobile :isOpen="isOpen" :toggleMenu="toggleMenu" />
      </div>
</template>