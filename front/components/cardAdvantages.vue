<script setup>
import { icon } from '@fortawesome/fontawesome-svg-core';

    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        content : {
            type: String,
            required: true,
        }, 
        color: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    })

</script>

<template>
   <div class="flex flex-col items-start justify-start bg-white p-4 rounded-3xl shadow-md gap-2">
        <div class="flex flex-col items-start justify-center w-full">
            <div class="flex gap-4 items-center">
                <Icones :color="props.color" :icon="props.icon" />
                <h3 class="font-bold" >{{props.title}}</h3>
            </div>
            <p class="pl-16 self-end">{{ props.content }}</p>
        </div>
    </div>
</template>