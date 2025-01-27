<script>
    export default {
        props: {
            status: {
                type: String,
                required: true
            }
        },
        computed: {
            statusInFrench() {
                const statusMap = {
                    confirmed: 'Confirmé',
                    cancelled: 'Annulé',
                    pending: 'En attente',
                    PENDING: 'En attente',
                    PAID: 'Confirmé'
                };
                return statusMap[this.status] || this.status;
            }
        }
    }
</script>

<template>
    <div class="p-2 rounded-xl  max-w-max"
        :class="{
            'bg-greenLight': status === 'confirmed' || status === 'PAID',
            'bg-redLight-100': status === 'cancelled',
            'bg-gray-200': status === 'pending' || status === 'PENDING',
        }"
    >
        <p class="text-gray-600 capit"
            :class="{
                'text-green': status === 'confirmed' || status === 'PAID',
                'text-red': status === 'cancelled',
                'text-gray-600': status === 'pending' || status === 'PENDING',
            }"
        >{{ statusInFrench }}</p>
    </div>
</template>