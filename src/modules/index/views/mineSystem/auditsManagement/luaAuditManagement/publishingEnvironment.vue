<template>
    <div class="pub-lua-warp" v-loading="loading">

        <div class="title-pub title-other">
            正式环境 
        </div>
        <div>
            <ul>
            <li v-for="(item, index) in testlist" :key="index">
                <!-- 已生效 -->
                <div v-if="item.publicStatus === 1">
                    <el-row>
                        <el-col :span="8"><div>{{item.LuaEvn === 0 ? '美居app' : '云端'}}</div></el-col>
                        <el-col :span="8"><div>已生效</div></el-col>
                        <el-col :span="8"><div>{{item.publishTime}}</div></el-col>
                    </el-row>
                </div>
                <!-- 还差一种情况 -->
                <div v-if="item.publicStatus === 99">
                    <el-row>
                        <el-col :span="8"><div>{{item.LuaEvn === 0 ? '美居app' : '云端'}}</div></el-col>
                        <el-col :span="8"><div @click="publickOnce(item)" class="btn-submit">提交发布</div></el-col>
                        <el-col :span="8"><div></div></el-col>
                    </el-row>
                </div>
                <!-- 发布失败 -->
                <div v-if="item.publicStatus === 2">
                    <el-row>
                        <el-col :span="8"><div>{{item.LuaEvn === 0 ? '美居app' : '云端'}}</div></el-col>
                        <el-col :span="8"><div>发布失败</div></el-col>
                        <el-col :span="8"><div @click="publickAgain(item)" class="btn-submit">重试</div></el-col>
                    </el-row>
                </div>
                <!-- 这里是区分 美居  还是 云端 等待运维确认-->
                <div v-if="item.LuaEvn === 1">
                    <div v-if="item.publicStatus === 0 ">
                        <el-row>
                            <el-col :span="8"><div>{{item.LuaEvn === 0 ? '美居app' : '云端'}}</div></el-col>
                            <el-col :span="8"><div>发布中</div></el-col>
                            <el-col :span="8"><div @click="checkSucess(item)" class="btn-submit">确认成功</div></el-col>
                        </el-row>
                    </div>
                </div>
                <div v-else>
                    <div v-if="item.publicStatus === 0 ">
                        <el-row>
                            <el-col :span="8"><div>{{item.LuaEvn === 0 ? '美居app' : '云端'}}</div></el-col>
                            <el-col :span="8"><div>发布中</div></el-col>
                            <!-- <el-col :span="8"><div @click="publickAgain(item)" class="btn-submit">确认成功</div></el-col> -->
                        </el-row>
                    </div>
                </div>

            </li>
            </ul> 
        </div>

        <div class="dialog-footer" v-if="show">
          <el-button type="primary" @click="enter">发布正式环境成功</el-button>
        </div>
    </div>
</template>

<script>
import API from '@/modules/index/api/system/system.js';
export default {
  props: {
    info: {
      type: Object,
      default: {}
    },
    flag: {
      type: Boolean
    }
  },
  watch: {
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          this.getList();
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      testlist: [
        {publicStatus: 2, name: '美居app', time: '2018-10-24', id: ''},
        {publicStatus: 3, name: '云端', time: '', id: ''}
      ],
      loading: false
    };
  },
  computed: {
    show () {
      var flag = false;
      for (var i = 0; i < this.testlist.length; i++) {
        if (this.testlist[i].publicStatus === 1) {
          flag = true;
        }
      }
      return flag;
    }
  },
  methods: {
    initData (val, flag) {
      var arr =[];
      for (var i = 0; i < val.length; i++) {
        if (flag === val[i].env) {
          arr.push(val[i]);
        }
      }
      return arr;
    },
    getList () {
      this.loading = true;
      const params = {
        luaId: this.info.id
      };
      API.getLuapub(params)
          .then(res => {
            this.loading = false;
            this.testlist = res.result ? this.initData(res.result, 1) : [];
          })
          .catch(() => {
            this.loading = false;
          });
    },
    enter () {
      const params = {
        luaId: this.info.id
      };
      API.luaPdatePro(params)
          .then(res => {
            if (res.code === 0) {
                this.$message({
                    type: 'success',
                    message: res.message
                });
                this.$emit('requestTable');
                this.$emit('close', false);
            }
          })
          .catch(() => {
          });
    },
    checkSucess () {
      const params = {
        luaId: this.info.id,
        evn: val.evn,
        type: 0
      };
      API.updateLuapub(params)
          .then(res => {
            if (res.code === 0) {
                this.$message({
                    type: 'success',
                    message: res.message
                });
                this.$emit('requestTable');
                this.$emit('close', false);
            }
          })
          .catch(() => {
          });
    },
    publickOnce (val) {
      const params = {
        luaId: this.info.id,
        LuaEvn: val.LuaEvn
      };
      API.luaPublishPro(params)
          .then(res => {
            if (res.code === 0) {
                this.$message({
                    type: 'success',
                    message: res.message
                });
                this.$emit('requestTable');
                this.$emit('close', false);
            }
          })
          .catch(() => {
          });
    },
    publickAgain () {
      const params = {
        luaId: this.info.id,
        LuaEvn: val.LuaEvn
      };
      API.luaPublishPro(params)
          .then(res => {
            if (res.code === 0) {
                this.$message({
                    type: 'success',
                    message: res.message
                });
                this.$emit('requestTable');
                this.$emit('close', false);
            }
          })
          .catch(() => {
          });
    }
  }
};
</script>
<style lang="less">
.pub-lua-warp{
    .title-pub{
      color: black;
      font-size: 18px;
      margin-bottom: 15px;
      font-weight: 700;
    }
    .btn-submit {
     color: blue;
     cursor: pointer;
    }
    li{
      height: 30px;
    }
    .title-other{
        margin-top: 15px;
    }
    .el-input{
      width: 90%;
    }
    .el-textarea{
      width: 90%;
    }
    .el-select{
      width: 100%;
    }
  .dialog-footer{
    margin-top: 30px;
    text-align: center;
  }
}
</style>
