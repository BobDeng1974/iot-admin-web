<template>
    <div class="menu-content-warp">
        <div class="content-mine" v-loading="roleLoading">
            <div class="right" v-loading="autedLoading">
                <div class="right-title">
                   <span>菜单树</span>
                   <span class="btn-add" @click="addMenu">添加菜单</span>
                </div>
                <div class="popwer-mine">
                    <el-tree
                    :render-content="renderContent"
                    :data="treeData"
                    node-key="id"
                    ref="tree"
                    :props="defaultProps"
                    :default-expanded-keys="[1]"
                    @node-click="handleNodeClick"
                    >
                    </el-tree>
                </div>
            </div>
        </div>
        <mine-dialog :dialogFormVisible='flag' :width='"45%"' :modalFlag="modalFlag" @close="close"  :title="title" :showClose="showClose">
          <add-menu  slot="option"  @close="close" v-if="addFlag" @requestTable="requestList" :addInfo='addInfo'></add-menu>
          <eidt-menu slot="option" @close="close" :titleInfo='titleInfo' :info='info' @requestTable="requestList" v-else></eidt-menu>
        </mine-dialog>
    </div>
</template>
<script>
import API from '@/modules/index/api/system/system.js';
import TreeRender from './test';
import mineDialog from '@/modules/index/components/mine-dialog';
import addMenu from './form-menu-add';
import eidtMenu from './form-menu-eidt';
import ls from '@/utils/storage/local_storage';
export default {
  components: {
    mineDialog,
    addMenu,
    eidtMenu
  },
  data () {
    return {
      addFlag: false,
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      autedLoading: false,
      roleLoading: false,
      roleList: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      info: {},
      addInfo: {},
      titleInfo: {},
      menuSaveParams: null
    };
  },
  created () {
    this.getAllAuthed();
  },
  methods: {
    requestList () {
      this.getAllAuthed();
      // 出发左侧菜单重新加载
      this.$store.dispatch('getMeauAuthed', {uid: this.$store.getters.saveGetUserInfo.uid ||
          JSON.parse(ls.getItem('saveGetUserInfo')).uid});
    },
    close (val) {
      this.flag = val;
    },
    handleNodeClick (d, n, s) {
      this.addInfo = d;
    },
    renderContent (h, {node, data, store}) {
      let that = this;
      return h(TreeRender, {
        props: {
          DATA: data,
          NODE: node,
          STORE: store
        },
        on: {
          nodeEdit: (s, d, n) => that.handleEdit(s, d, n),
          nodeDel: (s, d, n) => that.handleDelete(s, d, n)
        }
      });
    },
    handleEdit (s, d, n) {
      debugger;
      console.log(s, d, n)
      this.addFlag = false;
      // if (d.type !== 9 && d.type !== 10) {
      //   this.info = d;
      //   this.info.type === 99999;
      // } else {
      //   this.info = d;
      // }
      this.info = d;
      this.titleInfo = n.parent;
      this.flag = true;
      this.title = '编辑';
    },
    addMenu () {
      this.flag = true;
      this.title = '新增';
      this.addFlag = true;
    },
    handleDelete (s, d, n) {
      debugger;
      this.$confirm('此操作将删除该节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      const params = {id: d.id};
      API.deletePermissionMenu(params)
      .then(res => {
        this.$message({
          type: 'success',
          message: res.message
        });
        this.requestList();
      });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
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
          padding: 0 0px 28px 0px;
          overflow-y: auto;
          height: 588px;
          .tree-expand{
            display: flex;
            justify-content: space-between;
            width: 100%;
            .tree-btn{
              padding-right: 25px;
              span{
                color: blue;
              }
              span:hover{
                cursor: pointer;
              }
              .line{
                color: #DEDFE5;
              }
            }
          }
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

