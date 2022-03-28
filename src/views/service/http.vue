<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建HTTP服务</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="服务名称">
              <el-input v-model="form.service_name" placeholder="要求6-128位字母数字下划线"></el-input>
            </el-form-item>
            <el-form-item label="服务描述">
              <el-input v-model="form.service_desc" placeholder="最多255个字符，必填"></el-input>
            </el-form-item>
            <el-form-item label="接入类型">
              <el-input
                v-model="form.rule"
                placeholder="路径格式：/api/，域名格式：www.example.com"
                class="input-with-select"
              >
                <template #prepend>
                  <el-select v-model="form.rule_type" placeholder="请选择" style="width: 100px">
                    <el-option label="路径" :value="0"/>
                    <el-option label="域名" :value="1"/>
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
                />
              </template>
            </el-form-item>
            <el-form-item label="支持strip_uri">
              <template>
                <el-switch
                  v-model="form.need_strip_uri"
                  class="ml-2"
                  active-color="#13ce66"
                />
              </template>
            </el-form-item>
            <el-form-item label="支持websocket">
              <template>
                <el-switch
                  v-model="form.need_websocket"
                  class="ml-2"
                  active-color="#13ce66"
                />
              </template>
            </el-form-item>
            <el-form-item label="URL重写">
              <el-input
                type="textarea"
                autosize
                v-model="form.url_rewrite"
                placeholder="格式 ^/gateway/test_service(.*)$1 多条换行"></el-input>
            </el-form-item>
            <el-form-item label="Header转换">
              <el-input
                type="textarea"
                autosize
                v-model="form.header_transfer"
                placeholder="header转换支持增加（add）、删除（del）、修改（edit） 格式：add header_name header_value"></el-input>
            </el-form-item>
            <el-form-item label="开启验证">
              <template>
                <el-switch
                  v-model="form.open_auth"
                  class="ml-2"
                  active-color="#13ce66"
                />
              </template>
            </el-form-item>
            <el-form-item label="IP白名单">
              <el-input
                type="textarea"
                autosize
                v-model="form.white_list"
                placeholder="格式：127.0.0.1 多条换行，白名单优先级高于黑名单"></el-input>
            </el-form-item>
            <el-form-item label="IP黑名单">
              <el-input
                type="textarea"
                autosize
                v-model="form.black_list"
                placeholder="格式：127.0.0.1 多条换行"></el-input>
            </el-form-item>
            <el-form-item label="客户端限流">
              <el-input v-model="form.clientip_flow_limit" placeholder="0表示无限制"></el-input>
            </el-form-item>
            <el-form-item label="服务端限流">
              <el-input v-model="form.service_flow_limit" placeholder="0表示无限制"></el-input>
            </el-form-item>
            <el-form-item label="轮询方式">
              <el-radio-group v-model="form.round_type">
                <el-radio :label="0">random</el-radio>
                <el-radio :label="1">round-robin</el-radio>
                <el-radio :label="2">weight-round-robin</el-radio>
                <el-radio :label="3">ip-hash</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="IP列表">
              <el-input
                type="textarea"
                autosize
                v-model="form.ip_list"
                placeholder="格式：127.0.0.1:80 多条换行"></el-input>
            </el-form-item>
            <el-form-item label="权重列表">
              <el-input
                type="textarea"
                autosize
                v-model="form.weight_list"
                placeholder="格式：50 多条换行"></el-input>
            </el-form-item>
            <el-form-item label="建立连接超时">
              <el-input v-model="form.upstream_connect_timeout" placeholder="单位:秒(s)，0表示无限制"></el-input>
            </el-form-item>
            <el-form-item label="获取header超时">
              <el-input v-model="form.upstream_header_timeout" placeholder="单位:秒(s)，0表示无限制"></el-input>
            </el-form-item>
            <el-form-item label="链接最大空闲时间">
              <el-input v-model="form.upstream_idle_timeout" placeholder="单位:秒(s)，0表示无限制"></el-input>
            </el-form-item>
            <el-form-item label="最大空闲连接数">
              <el-input v-model="form.upstream_max_idle" placeholder="0表示无限制"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        service_name: '',
        service_desc: '',
        rule_type: 0,
        rule: '',
        need_https: false,
        need_websocket: false,
        need_strip_uri: true,
        url_rewrite: '',
        header_transfer: '',
        round_type: 2,
        ip_list: '',
        weight_list: '',
        upstream_connect_timeout: undefined,
        upstream_header_timeout: undefined,
        upstream_idle_timeout: undefined,
        upstream_max_idle: undefined,
        open_auth: false,
        black_list: '',
        white_list: '',
        clientip_flow_limit: undefined,
        service_flow_limit: undefined
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
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
