<script setup>
import { inject } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Injection de l'objet sales
const sales = inject('sales');

// Déclaration des props avec defineProps()
const props = defineProps({
  isAllPeriod: {
    type: Boolean,
    required: true
  },
  isDisabled: {
    type: Boolean,
    required: true
  },
  direction: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Back'
  },
  onClick: {
    type: Function,
    required: true
  }
});

const icon = props.direction === 'left' ? faArrowLeft : faArrowRight;
</script>

<template>
    <button
      v-if="!props.isAllPeriod"
      :class="{
        'opacity-50 cursor-not-allowed': props.isDisabled,
        'bg-blue-500 hover:bg-blue-600 text-white': !props.isDisabled,
        'px-4 py-2 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400': true
      }"
      :disabled="props.isDisabled"
      @click="props.onClick"
    >
      <font-awesome-icon :icon="icon" class="text-gray-900" />
    </button>
  </template>