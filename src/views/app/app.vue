<template>
  <div class="mixin-components-container">
    <el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-card class="box-card" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span v-if="isEdit===false">创建租户</span>
            <span v-if="isEdit===true">修改租户</span>
          </div>
          <div>
            <el-form-item label="app_id" class="is-required">
              <el-input v-model="form.app_id" :disabled="isEdit===true" placeholder="6-128位字母数字下划线" />
            </el-form-item>

            <el-form-item label="租户名称" class="is-required">
              <el-input v-model="form.name" placeholder="最多255字符，必填" />
            </el-form-item>

            <el-form-item label="32位密钥">
              <el-input v-model="form.secret" placeholder="32位字符串，非必填，自动生成" />
            </el-form-item>

            <el-form-item label="QPS限流" prop="qps">
              <el-input v-model="form.qps" placeholder="0表示无限制" />
            </el-form-item>

            <el-form-item label="日请求量限流" prop="qpd">
              <el-input v-model="form.qpd" placeholder="0表示无限制" />
            </el-form-item>

            <el-form-item>
              <router-link :to="'/apps'">
                <el-button type="primary" :loading="disableButton" @click="onSubmit">提交</el-button>
              </router-link>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { appCreate, appDetail, appUpdate } from '@/api/app'

export default {
  name: 'App',
  comments: {},
  data() {
    const checkNumber = (rule, value, cb) => {
      const regNumber = /[0-9]+/
      if (value === '' || regNumber.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的数字'))
    }
    return {
      isEdit: false,
      disableButton: false,
      form: {
        id: '0',
        app_id: '',
        name: '',
        secret: '',
        white_ips: '',
        qpd: '',
        qps: ''
      },
      rules: {
        qps: [{
          required: false,
          trigger: 'blur'
        }, {
          // 通过validator 进行自定义校验规则
          validator: checkNumber,
          trigger: 'blur'
        }
        ],
        qpd: [{
          required: false,
          trigger: 'blur'
        }, {
          // 通过validator 进行自定义校验规则
          validator: checkNumber,
          trigger: 'blur'
        }
        ]
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.isEdit = true
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      appDetail(id).then(response => {
        const formData = response.data
        this.form = formData
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        this.disableButton = true
        const formData = Object.assign({}, this.form)
        formData.id = Number(formData.id)
        formData.qpd = Number(formData.qpd)
        formData.qps = Number(formData.qps)

        if (this.isEdit) {
          appUpdate(this.form.id, formData).then(() => {
            this.disableButton = false
            this.$notify({
              title: 'success',
              message: '提交成功!',
              type: 'success',
              duration: 500
            })
          }, () => {
            this.disableButton = false
          })
        } else {
          appCreate(formData).then(() => {
            this.disableButton = false
            this.$notify({
              title: 'success',
              message: '提交成功！',
              type: 'success',
              duration: 500
            })
          }, () => {
            this.disableButton = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}

.component-item {
  min-height: 100px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #ffffff;
}
</style>
