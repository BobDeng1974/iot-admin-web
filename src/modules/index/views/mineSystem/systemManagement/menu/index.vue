<template>
    <div class="menu-warp">
        <div class="title-menu"> 
            <con-header :title-icon="addProductsIcon" title="菜单管理" :hasBottomBorder="false"></con-header>
        </div>
        <div>
           <menu-content></menu-content>
        </div>
    </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
import menuContent from './menu-content';
export default {
  components: {
    conHeader,
    menuContent
  },
  data () {
    return {
      addProductsIcon: '/static/img/title_13@2x.png'
    };
  }
};
</script>
<style lang="less" scoped>
.menu-warp{
  
}
</style>
