<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: 'bg-red-200',
  },
});

// Variables dérivées pour les couleurs et arrière-plans
const textColor = computed(() => {
  const colors = {
    yellow: '#FFC107',
    green: '#198754',
    blue: '#0D6EFD',
    purple: '#FAA6FF',
  };
  return colors[props.color] || props.color;
});

const bgColorClass = computed(() => {
  const bgColors = {
    yellow: 'bg-yellowLight',
    green: 'bg-greenLight',
    blue: 'bg-blueLight',
    purple: 'bg-purpleLight',
  };
  return bgColors[props.color] || props.bgColor;
});
</script>

<template>
    <div class="rounded-3xl bg-white w-full flex gap-4 p-4 items-center justify-start">
      <!-- Cercle avec couleur de fond dynamique -->
      <div
        class="h-12 w-12 rounded-full flex items-center justify-center aspect-square"
        :class="bgColorClass"
      >
        <!-- Icône avec couleur de texte dynamique -->
        <font-awesome-icon
          :icon="icon"
          class="text-xl"
          :color="textColor"
        />
      </div>
  
      <!-- Texte -->
      <div class="flex flex-col">
        <h3 class="text-sm text-gray-400">{{ label }}</h3>
        <p class="font-bold">{{ amount }}</p>
      </div>
    </div>
</template>
  
