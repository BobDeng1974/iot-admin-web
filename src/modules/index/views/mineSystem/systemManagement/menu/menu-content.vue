<template>
    <div class="menu-content-warp">
        <div class="content-mine" v-loading="roleLoading">
            <!-- 右侧 -->
            <div class="left">
              <div class="left-title">
                <img class="box-img"  :src="'/static/img/menu_folder@2x.png'"  alt="图片不存在"/><span class="totle-role-box">系统角色汇总</span>
              </div>
              <div class="role-left">
                 <ul>
                     <li @click="selectRole(index, item.id)" v-for="(item, index) in roleList" :key="index">
                        <img class="title-icon" :src="item.imgUrl"  alt="图片不存在"/>
                        <span :class="{'colorblur': item.isSelect}">{{item.name}}</span>
                     </li>
                 </ul>
              </div>
            </div>
            <!-- 左侧 -->
            <div class="right" v-loading="autedLoading">
                <div class="right-title">
                   <span>系统权限</span>
                   <span><el-button type="primary" @click="menuSave">保存</el-button></span>
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
import ls from '@/utils/storage/local_storage';
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
    this.initAllrole();
  },
  methods: {
    // 获取所有角色
    initAllrole () {
      this.roleLoading = true;
      const params = {roleId: ''};
      API.allRole(params)
      .then(res => {
        this.roleList = this.initData(res.result);
        this.selectRole(0, this.roleList[0].id);
        this.roleLoading = false;
        this.getAllAuthed();
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
    },
    // 角色数组新增属性isSelect
    initData (val) {
      if (!val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].isSelect = false;
      }
      return val;
    },
    // 保存触发
    menuSave() {
      API.updateAuth(this.menuSaveParams).then((res) => {
        if (res.code === 0) {
           this.$message({
          type: 'info',
          message: '角色权限更新成功'
        });
          // this.$store.dispatch('getUserInfo', '');
          this.$store.dispatch('getMeauAuthed', {uid: this.$store.getters.saveGetUserInfo.uid ||
          JSON.parse(ls.getItem('saveGetUserInfo')).uid});
        }
        // this.$message({
        //   type: 'info',
        //   message: '角色权限更新成功'
        // });
        //   // this.$store.dispatch('getUserInfo', '');
        //   this.$store.dispatch('getMeauAuthed', {uid: this.$store.getters.saveGetUserInfo.uid ||
        //   JSON.parse(localStorage.getItem('saveGetUserInfo')).uid});
      })
      .catch(() => {
      });
    },
    // 选取某个树节点触发
    handleNodeClick (d, n) {
      // console.log(d, n);
      // console.log(n);
      let arr = n.halfCheckedKeys.concat(n.checkedKeys);
      const selectId = arr.join('_');
      this.menuSaveParams = {roleId: this.roleId, ids: selectId};

      // debugger;
      // API.updateAuth(params).then((res) => {
      //   this.$message('角色权限更新成功');
      // })
      // .catch(() => {
      // });
    },
    // 获取角色对应权限
    getPermission (val) {
      const params = {roleId: val};
      API.permission(params)
      .then(res => {
        if (res.result) {
          const arr = [];
          for (var i = 0; i < res.result.length; i++) {
            // if (
            //   res.result[i].id === 1 ||
            //   res.result[i].id === 10 ||
            //   res.result[i].id === 20 ||
            //   res.result[i].id === 66 ||
            //   res.result[i].id === 69 ||
            //   res.result[i].id === 30 ||
            //   res.result[i].id === 40 ||
            //   res.result[i].id === 100 ||
            //   res.result[i].id === 102 ||
            //   res.result[i].id === 104
            // ) {
            // } else {
            //   arr.push(res.result[i].id);
            // }
            if (res.result[i].type === 10) {
              arr.push(res.result[i].id);
            } else if (
              res.result[i].id === 307 ||
              res.result[i].id === 309 ||
              res.result[i].id === 1001 ||
              res.result[i].id === 1002 ||
              res.result[i].id === 1003 ||
              res.result[i].id === 1004 ||
              res.result[i].id === 1005 ||
              res.result[i].id === 1020 ||
              res.result[i].id === 1040 ||
              res.result[i].id === 7110 ||
              res.result[i].id === 7112 ||
              res.result[i].id === 7114 ||
              res.result[i].id === 11 ||
              res.result[i].id === 40
              ) {
              arr.push(res.result[i].id);
            } else {}
          }
          console.log(arr, 'arrarrarr');
          // 这里先写死处理权限回显问题
          this.$refs.tree.setCheckedKeys(arr);
        } else {
          this.$refs.tree.setCheckedKeys([]);
        }
      })
      .catch(() => {
        this.$refs.tree.setCheckedKeys([]);
      });
    },
    selectRole (val, id) {
      this.changeImg(val);
      this.getPermission(id);
      this.roleId = id;
    },
    changeImg (val) {
      for (var i = 0; i < this.roleList.length; i++) {
        if (val === i) {
          this.roleList[i].imgUrl = '/static/img/menu_person_current@2x.png';
          this.roleList[i].isSelect = true;
        } else {
          this.roleList[i].imgUrl = '/static/img/menu_person @2x.png';
          this.roleList[i].isSelect = false;
        }
      }
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
     .left,.right{
        float: left;
     }
     .left{
        width: 22%;
        border-right: 1px solid #DEDFE5;
        .left-title{
            font-size: 16px;
            padding-left: 14px;
            padding-top: 28px;
            span{
             color: #333333;
             margin-left: 5px;
            }
        }
        .role-left{
          margin-top: 10px;
          padding-left: 15px;
          overflow-y: auto;
          height: 600px;
          li{
              height: 40px;
              line-height: 40px;
              transition: all .5s;
              background-color: #fff;
              img{
                width: 25px;
                height: 25px;
                vertical-align: middle;
              }
              span{
                    display: inline-block;
                    font-size: 14px;
                    color: #333;
                    vertical-align: middle;
              }
          }
          .colorblur{
              color: #5667FF;
          }
          li:hover{
            background-color: #f1f1f1;
            cursor: pointer;
          }
        }
     }
     .right{
        width: 77.6%;
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
        }
        @{deep} .popwer-mine{
          padding: 0 28px 28px 28px;
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
