export default function() {
    const sortBy = ref(null)
    const sortOrder = ref('asc')
    const sales = useSales()
    const auth = useAuth()
    const promoCode = ref('')
    const sortedSales = ref([])

    if (process.client) {
        promoCode.value = localStorage.getItem('promoCode')
    }
    
    const fetchSalesData = async () => {
        await sales.getSales(promoCode.value)
    }

    fetchSalesData()

    watch(
        () => [sales.salesData, sortBy.value, sortOrder.value], // Multidépendances
        ([newSalesData]) => {
            let sortedData = newSalesData.map(item => ({ ...item })); // Copie des données

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
            sortedSales.value = sortedData; // Mise à jour des ventes triées
        },
        { immediate: true, deep: true }
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
        sortedSales,
    }
}

