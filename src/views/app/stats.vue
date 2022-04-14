<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="chartData" />
  </div>
</template>

<script>
import Chart from './components/LineStats'
import { appDetail, appStats } from '@/api/app'

export default {
  name: 'AppsStats',
  components: { Chart },
  data() {
    return {
      chartData: {
        'title': '',
        'today': [],
        'yesterday': []
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchStats(id)
  },
  methods: {
    fetchStats(id) {
      appStats(id).then(response => {
        appDetail(id).then(resp => {
          this.chartData = {
            'title': resp.data.name + '流量统计',
            'today': response.data.today,
            'yesterday': response.data.yesterday
          }
          console.log(this.chartData)
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
