<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="isEdit===false">创建HTTP服务</span>
          <span v-if="isEdit===true">修改HTTP服务</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="服务名称" class="is-required">
              <el-input
                v-model="form.service_name"
                placeholder="要求6-128位字母数字下划线"
                :disabled="isEdit===true"
              />
            </el-form-item>
            <el-form-item label="服务描述" class="is-required">
              <el-input
                v-model="form.service_desc"
                placeholder="最多255个字符，必填"
              />
            </el-form-item>
            <el-form-item label="接入类型" class="is-required">
              <el-input
                v-model="form.rule"
                placeholder="路径格式：/api/，域名格式：www.example.com"
                class="input-with-select"
                :disabled="isEdit===true"
              >
                <template #prepend>
                  <el-select
                    v-model="form.rule_type"
                    placeholder="请选择"
                    style="width: 100px"
                    :disabled="isEdit===true"
                  >
                    <el-option label="路径" :value="0" />
                    <el-option label="域名" :value="1" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="支持https">
              <template>
                <el-switch
                  v-model="form.need_https"
                  class="ml-2"
                  active-color="#13ce66"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-form-item>
            <el-form-item label="支持strip_uri">
              <template>
                <el-switch
                  v-model="form.need_strip_uri"
                  class="ml-2"
                  active-color="#13ce66"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-form-item>
            <el-form-item label="支持websocket">
              <template>
                <el-switch
                  v-model="form.need_websocket"
                  class="ml-2"
                  active-color="#13ce66"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-form-item>
            <el-form-item label="URL重写">
              <el-input
                v-model="form.url_rewrite"
                type="textarea"
                autosize
                placeholder="格式 ^/gateway/test_service(.*)$1 多条换行"
              />
            </el-form-item>
            <el-form-item label="Header转换">
              <el-input
                v-model="form.header_transfer"
                type="textarea"
                autosize
                placeholder="header转换支持增加（add）、删除（del）、修改（edit） 格式：add header_name header_value"
              />
            </el-form-item>
            <el-form-item label="开启验证">
              <template>
                <el-switch
                  v-model="form.open_auth"
                  class="ml-2"
                  active-color="#13ce66"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-form-item>
            <el-form-item label="IP白名单">
              <el-input
                v-model="form.white_list"
                type="textarea"
                autosize
                placeholder="格式：127.0.0.1 多条换行，白名单优先级高于黑名单"
              />
            </el-form-item>
            <el-form-item label="IP黑名单">
              <el-input
                v-model="form.black_list"
                type="textarea"
                autosize
                placeholder="格式：127.0.0.1 多条换行"
              />
            </el-form-item>
            <el-form-item label="客户端限流">
              <el-input v-model="form.clientip_flow_limit" placeholder="0表示无限制" />
            </el-form-item>
            <el-form-item label="服务端限流">
              <el-input v-model="form.service_flow_limit" placeholder="0表示无限制" />
            </el-form-item>
            <el-form-item label="轮询方式">
              <el-radio-group v-model="form.round_type">
                <el-radio :label="0">random</el-radio>
                <el-radio :label="1">round-robin</el-radio>
                <el-radio :label="2">weight-round-robin</el-radio>
                <el-radio :label="3">ip-hash</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="IP列表" class="is-required">
              <el-input
                v-model="form.ip_list"
                type="textarea"
                autosize
                placeholder="格式：127.0.0.1:80 多条换行"
              />
            </el-form-item>
            <el-form-item label="权重列表" class="is-required">
              <el-input
                v-model="form.weight_list"
                type="textarea"
                autosize
                placeholder="格式：50 多条换行"
              />
            </el-form-item>
            <el-form-item label="建立连接超时">
              <el-input v-model="form.upstream_connect_timeout" placeholder="单位:秒(s)，0表示无限制" />
            </el-form-item>
            <el-form-item label="获取header超时">
              <el-input v-model="form.upstream_header_timeout" placeholder="单位:秒(s)，0表示无限制" />
            </el-form-item>
            <el-form-item label="链接最大空闲时间">
              <el-input v-model="form.upstream_idle_timeout" placeholder="单位:秒(s)，0表示无限制" />
            </el-form-item>
            <el-form-item label="最大空闲连接数">
              <el-input v-model="form.upstream_max_idle" placeholder="0表示无限制" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="submitDisableButton" @click="onsubmitHandle">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>

import { serviceDetail, serviceHTTPCreate, serviceHTTPUpdate } from '@/api/service'

export default {
  name: 'Dashboard',
  data() {
    return {
      isEdit: false,
      submitDisableButton: false,
      form: {
        id: 0,
        service_name: '',
        service_desc: '',
        rule_type: 0,
        rule: '',
        need_https: 0,
        need_websocket: 0,
        need_strip_uri: 0,
        url_rewrite: '',
        header_transfer: '',
        round_type: 2,
        ip_list: '',
        weight_list: '',
        upstream_connect_timeout: '',
        upstream_header_timeout: '',
        upstream_idle_timeout: '',
        upstream_max_idle: '',
        open_auth: 0,
        black_list: '',
        white_list: '',
        clientip_flow_limit: '',
        service_flow_limit: ''
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.isEdit = true
      this.fetchData(id)
    }
  },
  methods: {
    fetchData(id) {
      serviceDetail(id).then(response => {
        // info
        this.form.id = response.data.info.id
        this.form.load_type = response.data.info.load_type
        this.form.service_name = response.data.info.service_name
        this.form.service_desc = response.data.info.service_desc
        // http_rule
        this.form.rule_type = response.data.http_rule.rule_type
        this.form.rule = response.data.http_rule.rule
        this.form.need_https = response.data.http_rule.need_https
        this.form.need_websocket = response.data.http_rule.need_websocket
        this.form.need_strip_uri = response.data.http_rule.need_strip_uri
        this.form.url_rewrite = response.data.http_rule.url_rewrite.replace(/,/g, '\n')
        this.form.header_transfer = response.data.http_rule.header_transfer.replace(/,/g, '\n')
        // load_balance
        this.form.round_type = response.data.load_balance.round_type
        this.form.ip_list = response.data.load_balance.ip_list.replace(/,/g, '\n')
        this.form.weight_list = response.data.load_balance.weight_list.replace(/,/g, '\n')
        this.form.upstream_connect_timeout = response.data.load_balance.upstream_connect_timeout
        this.form.upstream_header_timeout = response.data.load_balance.upstream_header_timeout
        this.form.upstream_idle_timeout = response.data.load_balance.upstream_idle_timeout
        this.form.upstream_max_idle = response.data.load_balance.upstream_max_idle
        // access_control
        this.form.open_auth = response.data.access_control.open_auth
        this.form.black_list = response.data.access_control.black_list.replace(/,/g, '\n')
        this.form.white_list = response.data.access_control.white_list.replace(/,/g, '\n')
        this.form.clientip_flow_limit = response.data.access_control.clientip_flow_limit
        this.form.service_flow_limit = response.data.access_control.service_flow_limit
      }).catch(() => {
      })
    },
    onsubmitHandle() {
      this.submitDisableButton = true
      const query = Object.assign({}, this.form)
      console.log(query)
      query.url_rewrite = query.url_rewrite.replace(/\n/g, ',')
      query.header_transfer = query.header_transfer.replace(/\n/g, ',')
      query.ip_list = query.ip_list.replace(/\n/g, ',')
      query.weight_list = query.weight_list.replace(/\n/g, ',')
      query.white_list = query.white_list.replace(/\n/g, ',')
      query.black_list = query.black_list.replace(/\n/g, ',')
      query.clientip_flow_limit = Number(query.clientip_flow_limit)
      query.service_flow_limit = Number(query.service_flow_limit)
      query.upstream_connect_timeout = Number(query.upstream_connect_timeout)
      query.upstream_header_timeout = Number(query.upstream_header_timeout)
      query.upstream_idle_timeout = Number(query.upstream_idle_timeout)
      query.upstream_max_idle = Number(query.upstream_max_idle)

      if (this.isEdit) {
        serviceHTTPUpdate(this.form.id, query).then(response => {
          this.submitDisableButton = false
          this.$notify({
            message: '修改成功！',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitDisableButton = false
        })
      } else {
        serviceHTTPCreate(query).then(response => {
          this.submitDisableButton = false
          this.$notify({
            message: '添加成功！',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitDisableButton = false
        })
      }
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
</style>
