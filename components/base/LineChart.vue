<template>
  <client-only>
    <LineChart
      :chart-options="chartOptions"
      :chart-data="computedChartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </client-only>
</template>

<script>
import { Line as LineChart } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  components: { LineChart },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default () { return {} }
    },
    plugins: {
      type: Array,
      default () { return [] }
    },
    data: {
      type: Array,
      default () { return [] }
    },
    labels: {
      type: Array,
      default () { return [] }
    }
  },

  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  computed: {
    computedChartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.data
          }
        ]
      }
    }
  }
}
</script>
