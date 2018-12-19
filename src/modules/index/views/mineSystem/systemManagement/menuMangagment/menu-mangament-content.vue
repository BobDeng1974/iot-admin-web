<template>
    <div class="menu-content-warp">
        <div class="content-mine" v-loading="roleLoading">
            <div class="right" v-loading="autedLoading">
                <div class="right-title">
                   <span>菜单树</span>
                   <span class="btn-add">添加菜单</span>
                </div>
                <div class="popwer-mine">
                    <el-tree
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    @check="handleNodeClick"
                    :props="defaultProps"
                    :default-expanded-keys="[1]"
                    :default-checked-keys="checkedArr"
                    >
                    </el-tree>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from '@/modules/index/api/system/system.js';
export default {
  data () {
    return {
      autedLoading: false,
      roleLoading: false,
      roleList: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedArr: [],
      roleId: '',
      menuSaveParams: null
    };
  },
  created () {
    this.getAllAuthed();
  },
  methods: {
    // 获取所有权限
    getAllAuthed () {
      this.autedLoading = true;
      API.allAuthed()
      .then(res => {
        this.autedLoading = false;
        if (res.result) {
          this.treeData = res.result;
        } else {
          this.treeData = [];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@deep: ~'>>>';
.menu-content-warp{
  .box-img{
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
  .totle-role-box{
    vertical-align: middle;
  }
  .content-mine{
     border: 1px solid #DEDFE5;
     height: 660px;
     .right{
        width: 100%;
        .right-title {
            display: flex;
            justify-content: space-between;
            padding-right: 30px;
            align-items: center;
           height: 44px;
           border-bottom: 1px solid #DEDFE5;
          //  line-height: 44px;
           font-size: 16px;
           color: #333333;
           padding-left: 24px;
           .btn-add{
            color: blue;
           }
           .btn-add:hover{
            cursor: pointer;
           }
        }
        @{deep} .popwer-mine{
          padding: 0 0px 28px 5px;
          overflow-y: auto;
          height: 559px;
          .el-tree-node__content{
            height: 50px !important;
           .el-tree-node__label{
             font-size: 16px !important;
           }
          }
        }
     }
  }
}
</style>

