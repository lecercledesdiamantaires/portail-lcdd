<template>
    <div class="flex justify-center items-center py-2">
      <div class="w-full">
        <canvas ref="salesBarChart" class="w-full h-64 rounded-md"></canvas>
      </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted, inject, nextTick } from 'vue';
    import { Chart, registerables } from 'chart.js';

    const sales = inject('sales');
    const chartInstance = ref(null);
    const salesBarChart = ref(null); 
    const isUpdating = ref(false);
    const createChart = async () => {
    sales.startCooldown();

    if (isUpdating.value) return; 
    isUpdating.value = true;
    await nextTick();

    const chartData = sales.chartData.value;

    if (!salesBarChart.value) {
        isUpdating.value = false;
        return; // Si le canvas n'est pas disponible, on quitte la fonction
    }

    // Détruire l'instance précédente si elle existe
    if (chartInstance.value) {
        chartInstance.value.destroy();
    }

    try {
        const maxValue = sales.maxSalesValue.value;
        // Créer le graphique seulement si salesBarChart est valide
        chartInstance.value = new Chart(salesBarChart.value, {
            type: "bar",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: "Ventes",
                        data: chartData.values,
                        backgroundColor: "rgba(0, 109, 92, 0.6)",
                        borderColor: "rgba(0, 109, 92, 1)",
                        borderWidth: 1,
                        borderRadius: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "none", // Hide legend
                    },
                    tooltip: {
                        enabled: false, // Disable tooltips
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: false,
                            text: "Période",
                            font: {
                                family: "'Arial', sans-serif",
                                size: 16,
                                weight: 'bold',
                                color: '#000'
                            },
                        },
                        ticks: {
                            font: {
                                family: "'Arial', sans-serif",
                                size: 12,
                                color: '#666'
                            }
                        },
                        
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        title: {
                            display: false,
                            text: "Montant",
                            font: {
                                family: "'Arial', sans-serif",
                                size: 16,
                                weight: 'bold',
                                color: '#000'
                            },
                        },
                        ticks: {
                            font: {
                                family: "'Arial', sans-serif",
                                size: 12,
                                color: '#666'
                            },
                            callback: function(value) {
                                return value.toLocaleString() + ' €'; // Ajouter le symbole €
                            }
                        },
                        grid: {
                            display: true
                        },
                        min: 0, // Fixer le minimum de l'échelle
                        max: maxValue, 
                    }
                },
            },
        });
    } catch (error) {
        console.error("Erreur lors de la création du graphique : ", error);
    }

    isUpdating.value = false; // Réinitialiser le flag une fois la mise à jour terminée
};



    // Montée du composant
    onMounted(() => {
        Chart.register(...registerables);
        createChart(); // Créer le graphique au montage
    });

    // Surveille les changements de période et de date sélectionnée
    watch(() => sales.period.value, () => {
        createChart();
    });
    watch(() => sales.selectedDate.value, () => {
        createChart();
    });
</script>
