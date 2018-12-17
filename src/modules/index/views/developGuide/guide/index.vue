<template>
  <div>
    <div class="guide-content">
      <div  class="left-tree-content">
        <el-menu :style="{height: height}" class="left-tree menu-wrapper" background-color="#fbfbfb" text-color="#333" active-text-color="#fff" @select="lefNavSelect">
          <left-nav :navMenus="menuData"></left-nav>
        </el-menu>
      </div>
      <!-- @select="lefNavSelect" -->
      <!-- <div :style="{height: height}" class="left-tree-content"> -->
      <!-- <el-tree class="left-tree" default-expand-all :data="menuData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
      <!-- </div> -->
      <div v-if="data.menuTitle" class="content">
        <div :class="['title-wrapper',hasBottomBorder?'title-wrapper-border':'']">
          <h3 class="title3">
            <div>
              <img v-if="titleIcon" class="title-icon" :src="titleIcon" alt="图片不存在" />
              <span>{{title}}</span>
            </div>
            <div class="menu">{{data.menuTitle}}</div>
          </h3>
        </div>
        <!-- <div class="title-time"> -->
        <!-- <div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item,index) in breadArr" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div> -->
        <!-- <div class="creat-time"><span>由{{data.uid}}发表于</span>{{data.createdTime}}</div> -->
        <!-- </div> -->
        <div v-html="data.content"></div>
      </div>

    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/myProductsData';
import commonFun from '@/common/js/func';
import leftNav from './leftNav';
export default {
  components: { leftNav, conHeader },
  data() {
    return {
      height: '803px',
      menu: '',
      title: '开发指引',
      hasBottomBorder: true,
      titleIcon: '/static/img/title_12@2x.png',
      menuData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // content: ''
      data: {},
      breadArr: []
    };
  },
  methods: {
    getHeight() {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.height = clientHeight - 97 + 'px';
    },
    checkBread(node) {
      this.breadArr.push(node.label);
      if (node.level > 1) {
        this.checkBread(node.parent);
      }
      return this.breadArr;
    },
    handleNodeClick(val, ele, w) {
      console.log(ele);
      this.breadArr = [];
      this.breadArr = this.checkBread(ele).reverse();
      // let breadcrumbArr
      // debugger;
      this.menu = val.name;
      if (val.id !== '开发指引') {
        this.getDocDetail(val.id);
      } else {
        this.data = {};
      }
    },
    // navClick(valId) {
    //   console.log(valId);
    //   debugger;
    //   if (valId !== '开发指引') {
    //     this.getDocDetail(valId);
    //   } else {
    //     this.data = {};
    //   }
    //   debugger;
    // },
    lefNavSelect(val) {
      console.log(val);
      if (val !== '开发指引') {
        this.getDocDetail(val);
      } else {
        this.data = {};
      }
      // debugger;
    },
    getDocDetail(id) {
      let params = {
        mid: id
      };
      API.docDetail(params).then(res => {
        if (res.code === 0) {
          // console.log(res.result);
          this.data = res.result;
        }
      });
    },
    getDocAllMenu() {
      let params = {
        docType: 1
      };
      API.docAllMenu(params).then(result => {
        // let obj = {
        //   name: '开发指引',
        //   children: commonFun.createTreeData(result.result, 0),
        //   open: true,
        //   id: '开发指引'
        // };
        // this.menuData.push(obj);
        // console.log(this.menuData);
        this.menuData = commonFun.createTreeData(result.result, 0);
      });
    }
  },
  watch: {
    menuData: {
      handler(newName, oldName) {
        console.log(this.$route.params.id);
        // console.log(this.menuData);
        // debugger;
        if (this.$route.params.id) {
          this.lefNavSelect(this.$route.params.id);
          return;
        } else if (newName.length > 0 && newName[0].id) {
          this.lefNavSelect(newName[0].id);
        }

        // console.log('obj.a changed');
        // debugger;
      },
      immediate: true
      // deep: true
    }
  },
  created() {
    console.log(this.$route);
    debugger;
    this.getDocAllMenu();
    this.getHeight();
    window.addEventListener(
      'resize',
      () => {
        this.getHeight();
      },
      false
    );
  },
  mounted() {
    console.log(this.$route);
    console.log(this.$route.params.adminWebEroorToken, 'this.$route.params.adminWebEroorToken');
    if (this.$route.params.adminWebEroorToken) {
      this.$store.commit('SET_TOKEN', this.$route.params.adminWebEroorToken);
    }

    debugger;
        // 获取4a登录信息
    this.$store.dispatch('get4AUserInfo');
    // this.$route.params.id;
    // this.$route.params;
    // console.log(this.$route.params.id);
    // console.log(this.menuData);
    // debugger;
    // this.lefNavSelect(10);
  }
};
</script>

<style lang="less" scoped>
.guide-content {
  .left-tree-content {
    // width: 277px;
    // width: 200px;
    position: absolute;
    left: 0px;
    margin-right: 32px;
    // border: 1px solid #dedfe5;
    height: 100%;
  }
  .title-time {
    height: 24px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  }
  .creat-time {
    font-size: 14px;
    color: #999999;
  }
  display: flex;
  .content {
    width: 100%;
    .menu {
      margin-top: 16px;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      color: #333333;
    }
  }
}
.left-tree {
  width: 200px;
}

.title-wrapper-border {
  border-bottom: 1px solid #dedfe5;
}
.title-wrapper {
  padding-bottom: 12px;

  .title3 .title-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .title3 span {
    display: inline-block;
    font-weight: 700;
    font-size: 16px;
    color: #333;
    vertical-align: middle;
  }
}
.menu-wrapper {
  .el-submenu__title {
    transition: all 0.5s;
    &:hover {
      // color: #fff !important;
      background-color: #efeff3 !important;
    }
  }

  .el-menu-item {
    transition: all 0.5s;
    &.is-active {
      background-color: #409eff !important;
      &:hover {
        background-color: #409eff !important;
      }
    }
    &:hover {
      // color: #fff !important;
      background-color: #efeff3 !important;
    }
  }
}
</style>
