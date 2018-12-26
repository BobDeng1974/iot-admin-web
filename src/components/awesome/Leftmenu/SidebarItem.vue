<template>
  <div v-if="item.show === 0 && item.children && !item.hidden" class="menu-wrapper">
    <!-- <template v-if="hasOneShowingChild(item.children)&&onlyOneChild.path==='goHome'">
      <a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path,$event)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </a>
    </template> -->
<div v-if="item.children.length">
    <template v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow">
      <a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path,$event)" >
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </a>
    </template>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-for="child in item.children" v-if="child.show === 0 && !child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"/>

        <a v-else :href="child.path" :key="child.name" target="_blank" @click="clickLink(child.path,$event)">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>
</div>
<div v-else>
  <div v-if="item.type === 9 && item.show === 0 && !item.hidden">
    <a :href="item.path" :key="item.name" target="_blank" @click="clickLink(item.path,$event)">
      <el-menu-item :index="resolvePath(item.path)">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </el-menu-item>
    </a>
  </div>
  <div v-if="item.type !== 9 && item.show === 0 && !item.hidden">
    <el-submenu :index="item.name||item.path">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
    </el-submenu>
  </div>
</div>
    
  </div>
</template>

<script>
import path from 'path';
import { validateURL } from '@/utils/validate';
import Item from './Item';
export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children) {
      // debugger;
      const showingChildren = children.filter(item => {
        if (item.show === 1) {
          return false;
        } else if (item.hidden) {
          return false;
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item;
          return true;
        }
      });
      if (children.path === 'goHome') {
        // debugger;
        this.onlyOneChild;
        return true;
      }
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
    isExternalLink(routePath) {
      return validateURL(routePath);
    },
    clickLink(routePath, e) {
      debugger;
      if (!this.isExternalLink(routePath)) {
        e.preventDefault();
        const path = this.resolvePath(routePath);
        this.basePath;
        if (this.item.type === 9) {
          this.$router.push(this.basePath);
        } else {
          this.$router.push(path);
        }
      } else {
        // e.preventDefault();
      }
    }
  }
};
</script>

<style lang="less">
  .menu-wrapper {
  .el-submenu__title {
    transition: all 0.5s;
    &:hover {
      // color: #fff !important;
      background-color: #EFEFF3 !important;
    }
  }

  .el-menu-item {
    transition: all 0.5s;
    &.is-active {
      background-color: #5667FF !important;
      &:hover{
        background-color: #6F7DFF !important;
      }
    }
    &:hover {
      // color: #fff !important;
      background-color: #EFEFF3 !important;
    }
  }
  [href="goHome"]{
    color: rgb(51, 51, 51);
    font-size: 16px;
    span{
      font-weight: 700;
    }
  }
}
</style>
