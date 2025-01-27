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
      red: '#DC3545',
    };
    return colors[props.color] || props.color;
  });

  const bgColorClass = computed(() => {
    const bgColors = {
      yellow: 'bg-yellowLight',
      green: 'bg-greenLight',
      blue: 'bg-blueLight',
      purple: 'bg-purpleLight',
      red: 'bg-redLight-50',
    };
    return bgColors[props.color] || props.bgColor;
  });
</script>


<template>
    <div
        class="h-12 w-12 rounded-full flex items-center justify-center aspect-square"
        :class="bgColorClass">
        <font-awesome-icon
          :icon="icon"
          class="text-xl"
          :color="textColor"
        />
      </div>

</template>