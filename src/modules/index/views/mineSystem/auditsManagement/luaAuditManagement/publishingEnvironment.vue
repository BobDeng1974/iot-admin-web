<template>
    <div class="pub-lua-warp">

        <div class="title-pub title-other">
            测试环境 
        </div>
        <div>
            <ul>
            <li v-for="(item, index) in testlist" :key="index">
                <div v-if="item.type === 1">
                    <el-row>
                        <el-col :span="8"><div>{{item.name}}</div></el-col>
                        <el-col :span="8"><div>已生效</div></el-col>
                        <el-col :span="8"><div>{{item.time}}</div></el-col>
                    </el-row>
                </div>
                <div v-if="item.type === 2">
                    <el-row>
                        <el-col :span="8"><div>{{item.name}}</div></el-col>
                        <el-col :span="8"><div @click="publickOnce(item)" class="btn-submit">发布</div></el-col>
                        <el-col :span="8"><div></div></el-col>
                    </el-row>
                </div>
                <div v-if="item.type === 3">
                    <el-row>
                        <el-col :span="8"><div>{{item.name}}</div></el-col>
                        <el-col :span="8"><div>发布失败</div></el-col>
                        <el-col :span="8"><div @click="publickAgain(item)" class="btn-submit">重试</div></el-col>
                    </el-row>
                </div>
            </li>
            </ul> 
        </div>

        <div class="title-pub title-other">
            正式环境 
        </div>
        <div>
            <ul>
            <li v-for="(item, index) in testlist" :key="index">
                <div v-if="item.type === 1">
                    <el-row>
                        <el-col :span="8"><div>{{item.name}}</div></el-col>
                        <el-col :span="8"><div>已生效</div></el-col>
                        <el-col :span="8"><div>{{item.time}}</div></el-col>
                    </el-row>
                </div>
                <div v-if="item.type === 2">
                    <el-row>
                        <el-col :span="8"><div>{{item.name}}</div></el-col>
                        <el-col :span="8"><div @click="publickOnce(item)" class="btn-submit">发布</div></el-col>
                        <el-col :span="8"><div></div></el-col>
                    </el-row>
                </div>
                <div v-if="item.type === 3">
                    <el-row>
                        <el-col :span="8"><div>{{item.name}}</div></el-col>
                        <el-col :span="8"><div>发布失败</div></el-col>
                        <el-col :span="8"><div @click="publickAgain(item)" class="btn-submit">重试</div></el-col>
                    </el-row>
                </div>
            </li>
            </ul> 
        </div>

        <div class="dialog-footer">
          <el-button type="primary" @click="enter">确 定</el-button>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      testlist: [
        {type: 1, name: '美居app', time: '2018-10-24', id: ''},
        {type: 2, name: '云端123', time: '', id: ''},
        {type: 3, name: '云端456', time: '', id: ''}
      ]
    };
  },
  methods: {
    enter () {}
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
