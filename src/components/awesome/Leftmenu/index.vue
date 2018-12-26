<template>
  <div class="side-wrapper" :style="{height: height}">
    <el-menu class="slide-menu" :default-active="defaultActive" :collapse="isCollapse" mode="vertical" background-color="#fbfbfb" text-color="#333" active-text-color="#fff" :default-openeds="openedsArr">
      <sidebar-item v-for="route in menus" :key="route.name" :item="route" :base-path="rootPath + '/' + route.path"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import _ from 'lodash';
import SidebarItem from './SidebarItem';
import { mapGetters } from 'vuex';
import ls from '@/utils/storage/local_storage';
export default {
  data() {
    return {
      isCollapse: false,
      height: '803px',
      rootPath: '',
      menus: [],
      // openedsArr: ['产品', '我的产品', '硬件产品', '我的协议', '审核管理', '配置管理', '系统设置', '开发者管理', '数据中心', '后台账户管理', '管理首页', '数据统计'],
      defaultActive: '/product/myAgreement/elecManagement',
      urlArrTemp: []
    };
  },
  // computed: {
  //   routes () {
  //     console.log(this.$router.history.current.path);
  //     let path = this.getRootPath(this.$router.history.current.path);
  //     let menus = this.getSecondPath(this.$router.options.routes, path);
  //     return menus;
  //     // return this.$router.options.routes;
  //   }
  // },
  computed: {
    ...mapGetters(['roles']),
    openedsArr () {
      let arr = [];
      this.initBtnAuthed(this.menus, arr);
      return arr;
    }
  },
  watch: {
    '$route.path': function() {
      this.getMenus();
    },
    roles: function() {
      this.getMenus();
    }
  },
  methods: {
    // 用来抽取要默认展开的数据
    initBtnAuthed(source, json) {
      if (source && source.length) {
        for (let i = 0; i < source.length; i++) {
          // debugger;
          if (source[i].show === 0 && !source[i].hidden && source[i].type !== 9) {
            json.push(source[i].name);
          }
         if (source[i].children && source[i].children.length) {
            this.initBtnAuthed(source[i].children, json);
          }
        }
      };
    },
    getHeight() {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.height = clientHeight - 97 + 'px';
    },

    // 获取当前路由根路径
    getRootPath(url) {
      let urlArr = url.split('/');
      this.urlArrTemp = urlArr;
      if (urlArr.length) {
        this.rootPath = '/' + urlArr[1];
      }
      return this.rootPath;
    },

    // 获取根路由的二级路由
    getSecondPath(routes, path) {
      if (!routes) return;
      let results = [];
      routes.forEach(item => {
        if (item.path === path) {
          results = _.cloneDeep(item.children);
        }
      });
      return results;
    },
    // 获取侧边栏菜单
    getMenus() {
      let path = this.getRootPath(this.$router.history.current.path);
      if (path === '/product') {
        this.menus = this.getSecondPath(this.$store.getters.roles.length ? this.$store.getters.roles : ls.getObject('roles'), path);
        // debugger;
        this.$router.push({path: this.urlArrTemp.join('/')});
        this.defaultActive = this.urlArrTemp.join('/');
      } else {
        this.menus = this.getSecondPath(this.$router.options.routes, path);
        // debugger;
        this.$router.push({path: this.urlArrTemp.join('/')});
        this.defaultActive = this.urlArrTemp.join('/');
      }
        // this.menus = this.getSecondPath(this.$router.options.routes, path);
        // // debugger;
        // this.$router.push({path: this.urlArrTemp.join('/')});
        // this.defaultActive = this.urlArrTemp.join('/');
    }
  },
  mounted() {
    // debugger;
    this.getMenus();
    this.getHeight();
    window.addEventListener(
      'resize',
      () => {
        this.getHeight();
      },
      false
    );
  },
  components: {
    'sidebar-item': SidebarItem
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.side-wrapper {
  overflow-x: hidden;
  overflow-y: auto;
  .slide-menu {
    box-sizing: border-box;
    border-right: none;
    width: 200px;
    height: 100%;
    @{deep} .el-submenu {
      .el-submenu__title {
        font-size: 16px;
        color: #333333;
        span {
          font-weight: 700;
        }
        .el-submenu__icon-arrow {
          // display: none;
        }
      }
    }
   @{deep} .el-menu.el-menu--inline{
     .el-menu-item {
       span{
         display: inline-block;
         width: 100%;
       }
     }
   }
  }
}
</style>
