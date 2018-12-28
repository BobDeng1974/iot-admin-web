<template>
  <span class="tree-expand">
      <span class="tree-label" >
        <span>{{DATA.name}}</span>
      </span>
      <span class="tree-btn" v-if="DATA.id !== 1">
        <span @click.stop="nodeEdit(STORE, DATA, NODE)" v-authority="'b1_menuUpdateTag'">编辑</span>
        <span class="line">|</span>
        <span @click.stop="nodeDel(STORE, DATA, NODE)" v-authority="'b1_menuDelTag'">删除</span>
        <!-- <i class="el-icon-edit" @click.stop="nodeEdit(STORE, DATA, NODE)"></i>
        <i class="el-icon-delete" @click.stop="nodeDel(STORE, DATA, NODE)"></i> -->
      </span>
  </span>
</template>
<script>
export default {
  props: ['NODE', 'DATA', 'STORE'],
  methods: {
    nodeEdit (s, d, n) {
      this.$emit('nodeEdit', s, d, n)
    },
    nodeDel (s, d, n) {
      this.$emit('nodeDel', s, d, n)
    }
  }
}
</script>
