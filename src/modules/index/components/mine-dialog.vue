<template>
    <div>
      <el-dialog class='dialog' @close="dilogClose" :title="title" :visible.sync="dialogFormVisibleFlag" :width="width" :show-close='showClose' :close-on-click-modal="modalFlag">
        <slot name="option"></slot>
      </el-dialog>
    </div>
</template>
<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '0'
    },
    modalFlag: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dialogFormVisibleFlag: {
      get () {
        return this.dialogFormVisible;
      },
      set (val) {
        this.$emit('close', val);
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    dilogClose () {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
</style>
