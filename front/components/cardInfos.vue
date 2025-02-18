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

</script>

<template>
    <div class="rounded-3xl bg-white w-full flex gap-4 p-4 items-center justify-start">
      <Icones :icon="icon" :color="color" />
      <div class="flex flex-col">
        <h3 class="text-sm text-gray-400">{{ label }}</h3>
        <p class="font-bold">{{ amount }}</p>
      </div>
    </div>
</template>
  
