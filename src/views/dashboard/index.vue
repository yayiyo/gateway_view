<template>
  <div class="dashboard-editor-container">
    <panel-group :data="panelGroupData" />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { flowStats, panelGroupData, serviceStats } from '@/api/dashboard'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      panelGroupData: {
        'serviceNum': 900,
        'appNum': 897,
        'currentQps': 4380,
        'todayRequestNum': 79343
      },
      lineChartData: {
        'title': '服务流量统计',
        'today': [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122, 134, 150, 120, 110, 125, 145, 122, 165, 122, 158, 233, 178],
        'yesterday': [2, 4, 1, 5, 7, 170, 9, 23, 134, 150, 120, 110, 125, 145, 122, 165, 122, 52, 4, 78, 235, 78, 90, 123]
      },
      pieChartData: {
        'title': '服务占比',
        'legend': [],
        'series': []
      }
    }
  },
  created() {
    this.fetchPanelGroupData()
    this.fetchLineChartData()
    this.fetchPieChartData()
  },
  methods: {
    fetchPanelGroupData() {
      panelGroupData().then(response => {
        this.panelGroupData = response.data
      }).catch(() => {
      })
    },
    fetchLineChartData() {
      flowStats().then(response => {
        this.lineChartData.today = response.data.today
        this.lineChartData.yesterday = response.data.yesterday
      }).catch(() => {
      })
    },
    fetchPieChartData() {
      serviceStats().then(response => {
        this.pieChartData.legend = response.data.legend
        this.pieChartData.series = response.data.data
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
