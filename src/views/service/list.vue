<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.info"
        placeholder="服务名称/服务描述"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <router-link to="/services/create_http">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          添加HTTP服务
        </el-button>
      </router-link>
      <router-link to="/services/create_tcp">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          添加TCP服务
        </el-button>
      </router-link>
      <router-link to="/services/create_grpc">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          添加GRPC服务
        </el-button>
      </router-link>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务名称" align="center" min-width="80px">
        <template slot-scope="{row}">
          <div class="text-left">{{ row.service_name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="服务描述" align="center" min-width="120px">
        <template slot-scope="{row}">
          <div class="text-left">
            {{ row.service_desc }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.load_type| loadTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务地址" align="center" min-width="160px">
        <template slot-scope="{row}">
          <div class="text-left">{{ row.service_addr }}</div>
        </template>
      </el-table-column>
      <el-table-column label="QPS" align="center" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.qps }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日请求量" align="center" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.qpd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点数" align="center" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.total_node }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <router-link :to="'/services/' + row.id + '/stats'">
            <el-button type="primary" size="mini">
              统计
            </el-button>
          </router-link>
          <router-link v-if="row.load_type===0" :to="'/services/edit_http/' + row.id">
            <el-button type="primary" size="mini">
              修改
            </el-button>
          </router-link>
          <router-link v-if="row.load_type===1" :to="'/services/edit_tcp/' + row.id">
            <el-button type="primary" size="mini">
              修改
            </el-button>
          </router-link>
          <router-link v-if="row.load_type===2" :to="'/services/edit_grpc/' + row.id">
            <el-button type="primary" size="mini">
              修改
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { serviceDelete, serviceList } from '@/api/service'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const loadTypeOptions = [
  { key: 0, display_name: 'HTTP' },
  { key: 1, display_name: 'TCP' },
  { key: 2, display_name: 'GRPC' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const loadTypeKeyValue = loadTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ServiceList',
  components: { Pagination },
  directives: { waves },
  filters: {
    loadTypeFilter(type) {
      return loadTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        info: ''
      },
      temp: {
        id: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      serviceList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        serviceDelete(row.id).then(response => {
          this.list = response.data.list
          this.total = response.data.total
          this.$notify({
            message: '删除成功！',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$notify({
          message: '删除已取消',
          type: 'info',
          duration: 2000
        })
        this.getList()
      })
    }
  }
}

</script>
