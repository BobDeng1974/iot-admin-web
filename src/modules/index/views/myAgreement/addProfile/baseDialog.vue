<template>
  <div class="property-dialog">
    <div class="dialog-body">
      <el-form ref="property-form" :disabled="isBaseDetails" :model="baseEditData" :rules="propertyRules" label-width="128px">
        <el-form-item label="属性" prop="keyCode">
          <el-input v-model.trim="baseEditData.keyCode"></el-input>
        </el-form-item>
        <el-form-item label="属性名称" prop="keyDesc">
          <el-input v-model.trim="baseEditData.keyDesc"></el-input>
        </el-form-item>
        <!-- <el-form-item label="读取方式" prop="readwrite">
          <el-radio-group v-model.trim="baseEditData.readwrite">
            <el-radio :label="1">读写</el-radio>
            <el-radio :label="0">只读</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="取值类型" prop="keyType">
          <el-radio-group v-model.trim="baseEditData.keyType">
            <el-radio label="ENUM">枚举型</el-radio>
            <el-radio label="string">字符型</el-radio>
            <el-radio label="double">浮点型</el-radio>
            <el-radio label="int">数值型</el-radio>
            <el-radio label="boolean">布尔型</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="property-item" v-for="(item, index) in baseEditData.lists" :key="index" :prop="'lists.' + index + '.valueEn'" :label="index === 0 ? '属性值' : ''">
          <el-row type="flex" :gutter="10">
            <el-col :span="12">
              <el-input v-model.trim="item.valueCode"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model.trim="item.valueEn"></el-input>
            </el-col>
          </el-row>
          <i class="el-icon-circle-plus-outline icon-i icon-plus" :style="{transform: baseEditData.lists.length === 1 ? 'translateX(8px)' : 'translateX(30px)'}" v-show="!isBaseDetails" v-if="index === baseEditData.lists.length - 1" @click="addProperty"></i>
          <i class="el-icon-remove-outline icon-i icon-remove" v-if="baseEditData.lists.length  > 1" v-show="!isBaseDetails" @click="removeProperty(index)"></i>
        </el-form-item>
        <!-- <el-form-item label="说明">
          <el-input type="textarea" v-model.trim="baseEditData.description" :autosize="{minRows: 2, maxRows: 4}"></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    <div slot="footer" v-if="!isBaseDetails" class="dialog-footer">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import commonFun from '@/common/js/func';
export default {
  props: {
    isBaseDetails: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    baseEditData: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  data() {
    return {
      showDialog: false,
      propertyRules: {
        keyCode: [
          { required: true, message: '请输入属性', trigger: 'blur' }
        ],
        keyDesc: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ],
        sn8: [{ required: true, message: '请输入型号', trigger: 'blur' }],
        readwrite: [
          { required: true, message: '请选择读取方式', trigger: 'change' }
        ],
        keyType: [
          { required: true, message: '请选择取值类型', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    // 点击取消
    handleCancel() {
      this.$emit('close', false);
      // commonFun.restData(this.baseEditData);
    },
    // 点击保存
    handleSave() {
      if (!commonFun.doSubmit('property-form', this)) return;
      this.$emit('handleSave', this.baseEditData);
    },

    // 点加号添加属性值
    addProperty() {
      this.baseEditData.lists.push({ valueCode: '', valueEn: '' });
    },

    // 点击减号移除属性
    removeProperty(i) {
      this.baseEditData.lists.splice(i, 1);
    }
  },
  created() {
    console.log(this.baseEditData);
    debugger;
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.dialog-footer {
      display: flex;
    justify-content: flex-end;
       margin-right: 28px;
}
.property-item {
  position: relative;
  .icon-i {
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -9px;
    font-size: 18px;
    cursor: pointer;
  }
  .icon-plus {
    color: #409eff;
    transform: translateX(8px);
  }
  .icon-remove {
    color: #f56c6c;
    transform: translateX(8px) rotate(0);
  }
}
</style>
