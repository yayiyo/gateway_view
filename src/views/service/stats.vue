<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="chartData" />
  </div>
</template>

<script>
import Chart from './components/LineStats'
import { serviceDetail, serviceStats } from '@/api/service'

export default {
  name: 'ServiceStats',
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
    this.fetchStat(id)
  },
  methods: {
    fetchStat(id) {
      serviceStats(id).then(response => {
        serviceDetail(id).then(resp => {
          this.chartData = {
            'title': resp.data.info.service_name + '服务统计',
            'today': response.data.today,
            'yesterday': response.data.yesterday
          }
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

