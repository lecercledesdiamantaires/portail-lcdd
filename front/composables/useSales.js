import axios from 'axios';
import { ref, reactive, computed, onMounted, watch } from 'vue';

export default function () {
    const data = ref(null);
    const totalAmount = ref(0);
    const orders = reactive([]);

    const isAtMinDate = ref(false);  // Indicateur si l'on est à la date minimale
    const isAtMaxDate = ref(false);  // Indicateur si l'on est à la date maximale
    const minDate = ref(null);
    const maxDate = ref(null);

    const isCooldownActive = ref(false);
    const clickDuringCooldown = ref(false);

    const startCooldown = () => {
        isCooldownActive.value = true;
        setTimeout(() => {
            isCooldownActive.value = false;
            clickDuringCooldown.value = false;
        }, 1100);
    };

    const period = ref('month');
    const salesData = reactive([
        { orderAmount: 0, orderDate: "2025-01-07T11:03:03+01:00" },
        { orderAmount: 100, orderDate: "2025-02-07T10:56:41+01:00" },
        { orderAmount: 200, orderDate: "2025-03-15T10:56:41+01:00" },
        { orderAmount: 200, orderDate: "2025-03-15T10:56:41+01:00" },
        { orderAmount: 300, orderDate: "2024-05-12T10:56:41+01:00" },
        { orderAmount: 150, orderDate: "2024-06-19T10:56:41+01:00" },
    ]);
    
    const selectedDate = ref(new Date());

    const setSelectedDate = (newDate) => {
        selectedDate.value = new Date(newDate);
    };

    // Calcule les dates min et max à chaque mise à jour des ventes
    const updateMinMaxDates = () => {
        const dates = salesData.map(data => new Date(data.orderDate));
        minDate.value = new Date(Math.min(...dates));
        maxDate.value = new Date(Math.max(...dates));
    };

   const groupedSalesData = computed(() => {
    const grouped = {};
    updateMinMaxDates(); // Mettre à jour minDate et maxDate

    if (period.value === 'all') {
        for (let year = minDate.value.getFullYear(); year <= maxDate.value.getFullYear(); year++) {
            grouped[year] = 0;
        }

        salesData.forEach(data => {
            const date = new Date(data.orderDate);
            const year = date.getFullYear();
            grouped[year] += data.orderAmount;
        });

    } else if (period.value === 'year') {
        const currentYear = selectedDate.value.getFullYear();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
        for (let month = 0; month < 12; month++) {
            grouped[monthNames[month]] = 0;
        }
    
        salesData.forEach(data => {
            const date = new Date(data.orderDate);
            if (date.getFullYear() === currentYear) {
                const monthKey = monthNames[date.getMonth()];
                grouped[monthKey] += data.orderAmount;
            }
        });
    } else if (period.value === 'month') {
        const currentYear = selectedDate.value.getFullYear();
        const currentMonth = selectedDate.value.getMonth();
    
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            grouped[`${day.toString().padStart(2, '0')}`] = 0; // Ajouter les jours au format "01", "02", ...
        }
        
        salesData.forEach(data => {
            const date = new Date(data.orderDate);
            if (
                date.getFullYear() === currentYear &&
                date.getMonth() === currentMonth
            ) {
                const dayKey = `${date.getDate().toString().padStart(2, '0')}`; // Clé au format "01", "02", ...
                grouped[dayKey] += data.orderAmount;
            }
        });
    }
    return grouped;
});

const groupedSalesByDay = computed(() => {
    const salesGrouped = {};

    salesData.forEach(data => {
        const dateKey = new Date(data.orderDate).toISOString().split('T')[0]; // Take the date without the time
        if (!salesGrouped[dateKey]) {
            salesGrouped[dateKey] = 0;
        }
        salesGrouped[dateKey] += data.orderAmount; // Add the sale for this day
    });

    return salesGrouped;
});

const groupedSalesByMonth = computed(() => {
    const salesGrouped = {};

    salesData.forEach(data => {
        const monthKey = new Date(data.orderDate).toISOString().split('T')[0].slice(0, 7); // Extract the month in 'YYYY-MM' format
        if (!salesGrouped[monthKey]) {
            salesGrouped[monthKey] = 0;
        }
        salesGrouped[monthKey] += data.orderAmount; // Add the sale for this month
    });

    return salesGrouped;
});

const groupedSalesByYear = computed(() => {
    const salesGrouped = {};

    salesData.forEach(data => {
        const yearKey = new Date(data.orderDate).getFullYear(); // Extract the year
        if (!salesGrouped[yearKey]) {
            salesGrouped[yearKey] = 0;
        }
        salesGrouped[yearKey] += data.orderAmount; // Add the sale for this year
    });

    return salesGrouped;
});

const maxSalesValue = computed(() => {
    let maxValue;
    
    if (period.value === "all") {
        const groupedSales = groupedSalesByYear.value;
        maxValue = Math.max(...Object.values(groupedSales)); // Max sales for the year
    } else if (period.value === "year") {
        const groupedSales = groupedSalesByMonth.value;
        maxValue = Math.max(...Object.values(groupedSales)); // Max sales for the month
    } else if (period.value === "month") {
        const groupedSales = groupedSalesByDay.value;
        maxValue = Math.max(...Object.values(groupedSales)); // Max sales for the day
    }

    return maxValue;
});



const chartData = computed(() => {
    const maxValue = maxSalesValue.value;

    if (period.value === 'all') {
        const labels = Object.keys(groupedSalesData.value); // Années
        const values = Object.values(groupedSalesData.value); // Montants correspondants
    
        return { labels, values, maxValue };
    } else if (period.value === 'year') {
        const labels = Object.keys(groupedSalesData.value); // Mois (ex: "Jan", "Feb", ...)
        const values = Object.values(groupedSalesData.value); // Montants correspondants
    
        return { labels, values, maxValue };
    } else if (period.value === 'month') {
        const currentYear = selectedDate.value.getFullYear();
        const currentMonth = selectedDate.value.getMonth();
    
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const labels = Array.from(
            { length: daysInMonth },
            (_, i) => (i + 1).toString().padStart(2, '0') // Jours du mois (01, 02, ..., 31)
        );
    
        const groupedData = groupedSalesData.value;
        const values = labels.map(day => groupedData[day] || 0); // Valeurs correspondantes pour chaque jour
    
        return { labels, values, maxValue };
    }
});


    

    const updateDateStatus = () => {
        // Vérification que minDate et maxDate sont définis avant d'accéder à leurs méthodes
        if (minDate.value && maxDate.value) {
            const currentDate = new Date();
    
            if (period.value === 'year') {
                isAtMinDate.value = selectedDate.value.getFullYear() === minDate.value.getFullYear();
                isAtMaxDate.value = selectedDate.value.getFullYear() === maxDate.value.getFullYear();
            } else if (period.value === 'month') {
                isAtMinDate.value = (selectedDate.value.getFullYear() === minDate.value.getFullYear() && selectedDate.value.getMonth() === minDate.value.getMonth());
                isAtMaxDate.value = (selectedDate.value.getFullYear() === maxDate.value.getFullYear() && selectedDate.value.getMonth() === maxDate.value.getMonth());
            }
        }
    };

    // Fonction pour naviguer en arrière
    const navigateBack = () => {
        if (isCooldownActive.value) {
            clickDuringCooldown.value = true;
            return;
        }

        const currentDate = new Date();

        if (period.value === 'year') {
            if (selectedDate.value.getFullYear() > minDate.value.getFullYear()) {
                setSelectedDate(
                    new Date(selectedDate.value.setFullYear(selectedDate.value.getFullYear() - 1))
                );
                startCooldown();
            }
        } else if (period.value === 'month') {
            if (selectedDate.value.getFullYear() > minDate.value.getFullYear() || 
                (selectedDate.value.getFullYear() === minDate.value.getFullYear() && selectedDate.value.getMonth() > minDate.value.getMonth())) {
                setSelectedDate(
                    new Date(selectedDate.value.setMonth(selectedDate.value.getMonth() - 1))
                );
                startCooldown();
            }
        }

        updateDateStatus();  // Mettre à jour l'état de la date après modification
    };

    // Fonction pour naviguer en avant
    const navigateForward = () => {
        if (isCooldownActive.value) {
            clickDuringCooldown.value = true;
            return;
        }

        if (period.value === 'year') {
            if (selectedDate.value.getFullYear() < maxDate.value.getFullYear()) {
                setSelectedDate(
                    new Date(selectedDate.value.setFullYear(selectedDate.value.getFullYear() + 1))
                );
                startCooldown();
            }
        } else if (period.value === 'month') {
            if (selectedDate.value.getFullYear() < maxDate.value.getFullYear() ||
                (selectedDate.value.getFullYear() === maxDate.value.getFullYear() && selectedDate.value.getMonth() < maxDate.value.getMonth())) {
                setSelectedDate(
                    new Date(selectedDate.value.setMonth(selectedDate.value.getMonth() + 1))
                );
                startCooldown();
            }
        }

        updateDateStatus();  // Mettre à jour l'état de la date après modification
    };

    // Mise à jour de l'état initial de la date min/max
    onMounted(() => {
        updateDateStatus();
    });

    const getSales = (code) => {
        axios
            .get(`http://localhost:4000/shopify/sales/${code}`)
            .then((response) => {
                response.data.forEach((element) => {
                    orders.push({
                        orderAmount: parseFloat(element.current_subtotal_price),
                        orderDate: element.created_at,
                    });

                    totalAmount.value += parseFloat(element.current_subtotal_price);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return {
        totalAmount,
        chartData,
        period,
        orders,
        data,
        selectedDate,
        getSales,
        startCooldown,
        navigateBack,
        navigateForward,
        isCooldownActive,
        clickDuringCooldown,
        isAtMaxDate,
        isAtMinDate,
        maxSalesValue
    };
}
