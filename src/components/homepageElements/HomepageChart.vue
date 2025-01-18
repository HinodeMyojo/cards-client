<template>
    <div :style="{ width: width, height: height, backgroundColor: 'transparent' }">
        <!-- Показать прогресс-бар, если данные еще не загружены -->
        <div v-if="!props.isLoaded" class="loading">
            <v-progress-circular indeterminate></v-progress-circular>
        </div>

        <!-- Показать график, если есть хотя бы одно значение в series, отличное от 0 -->
        <apexchart v-else-if="props.series.some(item => item !== 0)" :width="'100%'" :height="'100%'" type="donut"
            :options="options" :series="props.series" :labels="labels" :colors="colors">
        </apexchart>

        <!-- Показать текст (TODO переделать на гиф etc), если все значения в series равны 0 -->
        <div v-else>
            <p>Нет данных</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    series: {
        type: Array,
        default: () => [1, 1, 1, 1]
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '100%'
    },
    isLoaded: {
        type: Boolean,
        default: false
    }
})


// Chart options and series data
const options = ref({
    chart: {
        id: 'donut-chart',
        height: '100%'
    },
    plotOptions: {
        pie: {
            customScale: 1
        }
    },
    redrawOnParentResize: false,
    labels: ['Более 80%', 'Более 30%', 'Более 0%', 'Есть к чему стремиться!'],
    colors: ['#00EC93', '#FF9700', '#EDC60D', '#f1f1f1'],
    dataLabels: {
        style: {
            colors: ['#2b2b2b', '#2b2b2b', '#2b2b2b', '#2b2b2b']
        }
    },
    legend: {
        show: false,
        position: 'right',
        horizontalAlign: 'center',
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 500,
        markers: {
            size: 7,
            strokeWidth: 1,
        },
        itemMargin: {
            horizontal: 5,
        },
        onItemClick: {
            toggleDataSeries: true
        },
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: undefined
        },
        background: {
            enabled: true,
            foreColor: '#1B1B1F',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#1B1B1F',
            opacity: 0.9,
            dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.45
            }
        },
        dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
        }
    },
    tooltip: {
        enabled: true,
        shared: true,
        hideEmptySeries: false,
        style: {
            fontSize: '14px',
            color: '#2b2b2b'
        },
        theme: 'dark',
        x: {
            show: true,
            format: 'dd MMM',
        },
        y: {
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
    },
    stroke: {
        show: true,
        curve: 'monotoneCubic',
        lineCap: 'square',
        colors: 'transparent',
        width: 1,
        dashArray: 0,
    }
});

</script>
<style>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.apexcharts-tooltip {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
}

.apexcharts-tooltip span {
    color: rgb(1, 15, 15);
}
</style>