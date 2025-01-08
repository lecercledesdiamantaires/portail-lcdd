<script setup>
    // État du menu burger
    const isOpen = ref(false);
    // Fonction pour ouvrir/fermer le menu
    const toggleMenu = () => {
        isOpen.value = !isOpen.value;
    };
</script>


<template>
    <div class="w-64 bg-white shadow-lg h-screen">
        <!-- Bouton du menu burger -->
        <ButtonToggleMenu :isOpen="isOpen" :toggleMenu="toggleMenu" />

        <!-- Sidebar -->
        <aside
            :class="[
            ' fixed flex flex-col h-screen bg-white lg:shadow-lg z-40 transform transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0'
            ]"
            >
            <div class="flex flex-col h-full justify-between py-6">
                <!-- Partie supérieure -->
                <div class="flex flex-col gap-12">
                <Logo />
                <div class="flex flex-col gap-4 items-center">
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