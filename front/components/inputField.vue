<template>
    <div class="mb-4">
      <label :for="id" class="block text-sm font-medium">{{ label }}</label>
      <input :id="id" :type="type" v-model="modelValue" class="mt-1 p-2 w-full border border-gray-300 rounded" />
    </div>
</template>

<script setup>
    
</script>