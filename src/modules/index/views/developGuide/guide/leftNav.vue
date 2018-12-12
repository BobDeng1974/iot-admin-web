<template>
  <div class="navMenu">

    <template v-for="navMenu in navMenus">
      <!-- 最后一级菜单 -->
      <el-menu-item v-if="!navMenu.children&&navMenu.name" :key="navMenu.id" :data="navMenu" :index="navMenu.id.toString()">
        <!-- <i :class="navMenu.icon"></i> -->
        <span style="display: inline-block;width: 100%;" slot="title">

          <a class="nav-menu-a" style="color:rgb(51, 51, 51);display: inline-block;width: 100%;" @click.native="goAnchor(navMenu.id)" :href="'#'+navMenu.id">{{navMenu.name}} </a>
          <!--     <div :id="'anchor-'+index" class="item" v-for="index in 20">{{index}}</div> -->
        </span>

      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="navMenu.children&&navMenu.name" :key="navMenu.id" :data="navMenu" :index="navMenu.id.toString()">
        <template slot="title">
          <!-- <i :class="navMenu.entity.icon"></i> -->
          <span> {{navMenu.name}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
    </template>

  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data() {
    return {};
  },
  mounted() {
    // this.goAnchor('#11');
  },
  methods: {
    goAnchor(val) {
      console.log(val);
      // debugger;
      this.$emit('select', val);
    }
    // navClick(valId) {
    //   this.$emit('navClick', valId);
    // }
  }
};
</script>

<style scoped>
.nav-menu-a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
