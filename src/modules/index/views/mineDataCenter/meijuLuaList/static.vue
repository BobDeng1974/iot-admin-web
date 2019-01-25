<template>
    <div class="pub-lua-warp" v-loading="loading">
       <div class="title-pub title-other">
           {{'测试环境'}}
        </div>
        <div>
            <ul>
                <li v-for="(item, index) in publiclist" :key="index">
                    <el-row>
                        <el-col :span="8"><div>{{item.LuaEvn === 0 ? '美居app' : '云端'}}</div></el-col>
                        <el-col :span="8">
                            <div v-if="item.publicStatus === 0">待运维确认</div>
                            <div v-if="item.publicStatus === 1">已生效</div>
                            <div v-if="item.publicStatus === 2">发布失败</div>
                        </el-col>
                        <el-col :span="8"><div>{{item.publishTime}}</div></el-col>
                    </el-row>
                </li>
            </ul> 
        </div>

        <div class="title-pub title-other">
           {{'正式环境'}}
        </div>
        <div>
            <ul>
                <li v-for="(item, index) in testlist" :key="index">
                    <el-row>
                        <el-col :span="8"><div>{{item.LuaEvn === 0 ? '美居app' : '云端'}}</div></el-col>
                        <el-col :span="8">
                            <div v-if="item.publicStatus === 0">待运维确认</div>
                            <div v-if="item.publicStatus === 1">已生效</div>
                            <div v-if="item.publicStatus === 2">发布失败</div>
                        </el-col>
                        <el-col :span="8"><div>{{item.publishTime}}</div></el-col>
                    </el-row>
                </li>
            </ul> 
        </div>

    </div>
</template>

<script>
import API from '@/modules/index/api/dataCenter/dataCenter.js';
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
        {type: 2, name: '美居app', time: '2018-10-24', id: ''},
        {type: 3, name: '云端', time: '', id: ''}
      ],
      publiclist: [
        {type: 2, name: '美居app', time: '2018-10-24', id: ''},
        {type: 3, name: '云端', time: '', id: ''}
      ],
      loading: false
    };
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
        url: this.info.url
      };
      API.luapubGetEnvironment(params)
          .then(res => {
            this.loading = false;
            this.testlist = res.result ? this.initData(res.result, 0) : [];
            this.publiclist = res.result ? this.initData(res.result, 1) : [];
          })
          .catch(() => {
            this.loading = false;
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
