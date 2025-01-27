import useIban from '@/composables/useIban';

export default function() {
    const { $axios } = useNuxtApp()
    let token = null
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }

    const { vendorId } = useIban()
    const sortBy = ref(null)
    const sortOrder = ref('asc')
    const sales = useSales()
    const promoCode = ref('')
    const sortedSales = ref([])
    const withdraws = ref([])
    const combinedData = ref([]) // Nouvelle propriété pour les données fusionnées

    if (process.client) {
        promoCode.value = localStorage.getItem('promoCode')
    }

    const formatWithdrawData = (data) => {
        return data.map(item => ({
            type: "Retrait",
            email: "",
            firstName: "Retrait",
            lastName: "",
            orderAmount: item.amount,
            orderDate: item.date,
            status: item.status
        }));
    };

    const getPayouts = async (id) => {
        try {
            const response = await $axios.get(`/api/withdraw/getWithdraw/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            withdraws.value = formatWithdrawData(response.data);
        } catch (error) {
            console.error('Error getting payouts:', error.response?.data || error.message);
            throw error;
        }
    }
    
    watch(vendorId, async (newVendorId) => {
        if (newVendorId) {
            await getPayouts(newVendorId);
        }
    }, { immediate: true });

    onMounted(() => {
        if (vendorId.value) {
            getPayouts(vendorId.value);
        }
    });
    
    const fetchSalesData = async () => {
        sales.getSales(promoCode.value)
    }

    fetchSalesData()

  

    const sortData = () => {
        let sortedData = [...combinedData.value]; // Créer une copie des données fusionnées

        if (sortBy.value) {
            sortedData.sort((a, b) => {
                let aValue, bValue;

                if (sortBy.value === 'orderDate') {
                    aValue = new Date(a[sortBy.value]).getTime();
                    bValue = new Date(b[sortBy.value]).getTime();
                } else if (sortBy.value === 'orderAmount') {
                    aValue = parseFloat(a[sortBy.value]) || 0;
                    bValue = parseFloat(b[sortBy.value]) || 0;
                }

                return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue;
            });
        }
        sortedSales.value = sortedData; // Mettre à jour les ventes triées
    };

    watch(
        () => [sales.salesData, withdraws.value], 
        ([newSalesData, newWithdraws]) => {
            // Fusionner les données
            combinedData.value = [...newSalesData, ...newWithdraws];
            sortData(); // Trier les données fusionnées
        },
        { immediate: true, deep: true }
    );

    watch(
        () => [sortBy.value, sortOrder.value],
        sortData,
        { immediate: true }
    );

    const sortColumn = (column) => {
        if (sortBy.value === column) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
        } else {
            sortBy.value = column
            sortOrder.value = 'asc'
        }
    }

    const resetFilters = () => {
        sortBy.value = null
        sortOrder.value = 'asc'
    }

    return { 
        sortBy, 
        sortOrder,
        sortColumn,
        resetFilters, 
        sortedSales, // Données triées pour affichage
        combinedData // Données fusionnées
    }
}
