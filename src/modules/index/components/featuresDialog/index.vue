<template>
  <div class="features-dialog">
    <div class="features-body">
      <div class="features-wrapper un-features-wrapper">
        <div class="features-header clearfix">
          <span class="f-header-l pull-left">选择功能：</span>
          <span class="f-header-r pull-right" @click="addAll">全选添加</span>
        </div>
        <div class="features-con">
          <el-tabs :value="activeName">
            <el-tab-pane :label="applianceTypeName" name="first">
              <ul class="features-list-l">
                <li class="list-item" :class="{active: item.active}" v-for="(item, index) in featureDataSort" :key="index" @click="clickListItem(item)" @dblclick="dblclickItem(item, index)">
                  <h4 class="f-title4">{{item.featureName}}</h4>
                  <p class="f-desc">
                    <!-- <span>冷冻们状态:&nbsp;&nbsp;{{item.keyDesc}}</span> -->
                    <span class="f-desc-s">{{item.keyDesc}}:&nbsp;&nbsp;<span v-if="item.keyDesc" class="keydesc">属性</span></span>
                    <span>标识符:&nbsp;&nbsp;{{item.keyCode}}</span>
                    <span>使用类别:&nbsp;&nbsp;{{item.appType}}</span>
                  </p>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="其他类型" name="second">
              <ul class="features-list-l">
                <li class="list-item" :class="{active: item.active}" v-for="(item, index) in featureDataSort" :key="index" @click="clickListItem(item)">
                  <h4 class="f-title4">{{item.featureName}}</h4>
                  <p class="f-desc">
                    <span class="f-desc-s">{{item.keyDesc}}:&nbsp;&nbsp;<span v-if="item.keyDesc"  class="keydesc">属性</span></span>
                    <span>标识符:&nbsp;&nbsp;{{item.keyCode}}</span>
                    <span>使用类别:&nbsp;&nbsp;{{item.appType}}</span>
                    <!-- <span>标识符:&nbsp;&nbsp;{{item.identifier}}</span>
                    <span>使用类别:&nbsp;&nbsp;{{item.applianceType}}</span> -->
                  </p>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="features-btn">
        <span class="feat-arrow-btn" @click="handleToRight"></span>
      </div>
      <!-- 右侧 -->
      <div class="features-wrapper en-features-wrapper">
        <div class="features-header clearfix">
          <span class="f-header-l pull-left">已选功能：</span>
          <span class="f-header-r pull-right" @click="removeAll">全选删除</span>
        </div>
        <div class="features-con">
          <ul class="selected-list">
            <li class="list-item item-bg" v-for="(item, ind) in selectedListSort" :key="ind">
              <h4 class="f-title4">{{item.featureName}}</h4>
              <p class="f-desc">
                <!-- <span>冷冻们状态:&nbsp;&nbsp;{{item.keyDesc}}</span> -->
                <!-- <span>{{item.keyDesc}}:&nbsp;&nbsp;{{item.keyCode}}</span> -->
                <!-- <span>标识符:&nbsp;&nbsp;{{item.keyCode}}</span> -->
                <!-- <span>使用类别:&nbsp;&nbsp;{{item.appType}}</span> -->
                <!-- <span>标识符:&nbsp;&nbsp;{{item.identifier}}</span>
                <span>使用类别:&nbsp;&nbsp;{{item.applianceType}}</span> -->
                    <span class="f-desc-s">{{item.keyDesc}}:&nbsp;&nbsp;<span v-if="item.keyDesc" class="keydesc">属性</span></span>
                    <span>标识符:&nbsp;&nbsp;{{item.keyCode}}</span>
                    <span>使用类别:&nbsp;&nbsp;{{item.appType}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm">确定</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import commonFun from '@/common/js/func';
import { profeilInfoList } from '../../api/myAgreement/index';
import Vue from 'vue';
import _ from 'lodash';
// import {getOptionalFeatures} from '../../api/myAgreement/index';
export default {
  mixins: [dropDownTranslation],
  props: {
    flag: {
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    },
    applianceType: {
      type: String
    },
    applianceTypeArr: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showDialog: false,
      applianceTypeName: '',
      featuresData: [],
      activeName: 'first',
      selectedLeft: [],
      selectedList: []
    };
  },
  computed: {
    featureDataSort() {
      return this.featuresData.sort(this.compare);
    },
    selectedListSort() {
      return this.selectedList.sort(this.compare);
    }
  },
  methods: {
    // 排序
    compare(a, b) {
      return a.id > b.id ? 1 : -1;
    },
    // 此接口为新增profile文件页面中新增可选功能对话框前端界面自定义模拟的接口,后台暂时未提供真实接口
    // getOptionalList () {
    //   let params = {
    //     applianceType: ''
    //   };
    //   getOptionalFeatures(params).then(res => {
    //     if (res.code === '0') {
    //       res.list.forEach(item => {
    //         if (typeof item.active === 'undefined') {
    //           Vue.set(item, 'active', false);
    //         }
    //       });
    //       this.featuresData = res.list || [];
    //     }
    //   });
    // },

    // 点击未选列表
    clickListItem(item) {
      item.active = !item.active;
      let len = this.selectedLeft.length;
      if (item.active) {
        this.selectedLeft.push(item);
      } else {
        for (let i = len - 1; i >= 0; i--) {
          if (this.selectedLeft[i].id === item.id) {
            this.selectedLeft.splice(i, 1);
          }
        }
      }
      // console.log(this.selectedLeft);
    },

    // 双击未选列表
    dblclickItem(item, index) {
      let selItem = _.cloneDeep(item);
      selItem.active = false;
      this.selectedList.push(selItem);
      this.featuresData.splice(index, 1);
      this.featuresData.forEach(fitem => {
        fitem.active = false;
      });
      this.selectedLeft = [];
    },

    // 点击右箭头选择
    handleToRight() {
      let len = this.selectedLeft.length;
      if (len) {
        let selected = _.cloneDeep(this.selectedLeft);
        selected.forEach(item => {
          item.active = false;
          this.selectedList.push(item);
        });
        this.featuresData = this.featuresData.filter(item => {
          return !item.active;
        });
        this.selectedLeft = [];
        // console.log(this.selectedList);
      }
    },

    // 全选添加
    addAll() {
      let len = this.featuresData.length;
      if (len) {
        let selected = _.cloneDeep(this.featuresData);
        selected.forEach(item => {
          item.active = false;
          this.selectedList.push(item);
        });
        this.featuresData = [];
        this.selectedLeft = [];
      }
    },

    // 全部删除已选择的
    removeAll() {
      let len = this.selectedList.length;
      if (len) {
        let selected = _.cloneDeep(this.selectedList);
        selected.forEach(item => {
          item.active = false;
          this.featuresData.push(item);
        });
        this.selectedList = [];
        this.selectedLeft = [];
      }
    },
    // 点击取消
    handleCancel() {
      this.$emit('close', false);
      // this.showDialog = false;
    },

    // 点击确定
    handleConfirm() {
      // debugger;
      // this.$emit('confirmSelect', this.selectedListSort);
      this.$emit('handleSave', this.selectedListSort);

      // this.showDialog = false;
    },
    getProfeilInfoList() {
      // this.applianceTypeName = this.applianceType.nameZh;

      this.applianceTypeName = commonFun.fetchWord(
        this.applianceType,
        'type',
        this.applianceTypeArr,
        'nameZh'
      );
      // debugger;
      // this.applianceTypeName = 0;
      let params = {
        typeCode: this.applianceType
      };
      profeilInfoList(params).then(res => {
        console.log(res);
        if (res.code === 0) {
          res.result.forEach(item => {
            if (typeof item.active === 'undefined') {
              Vue.set(item, 'active', false);
            }
          });
          this.featuresData = res.result || [];
          // debugger;
          // this.dataList1 = res.list || [];
        }
      });
    }
  },
  created() {
    this.getSn8Select({ id: 0 });
    this.getApplianSelect({ id: 0 });
  },
  watch: {
    applianceType() {
      debugger;
      this.getProfeilInfoList();
    },
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          // this.getElDoc();
          debugger;
          this.selectedList = [];
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getProfeilInfoList();
    // this.getOptionalList();
  }
};
</script>

<style lang="less" scoped>
.f-desc-s{
  display: block;
}
.keydesc{
    display: inline-block;
    border: 1px solid #5667ff;
    border-radius: 8px;
    padding: 5px;
    color: #5667ff;
}
.dialog-footer {
  margin-top: 10px;
      display: flex;
    justify-content: flex-end;
    margin-right: 78px;
}
.features-body {
  display: flex;
}
.features-header {
  span {
    line-height: 24px;
    color: #666;
  }
  .f-header-r {
    color: #5667ff;
    cursor: pointer;
  }
}
.features-con {
  width: 320px;
  height: 320px;
  border: 1px solid #dedfe5;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
}
.features-btn {
  width: 56px;
  height: 344px;
  line-height: 344px;
  text-align: center;
  box-sizing: border-box;
}
.feat-arrow-btn {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url('../../../../assets/img/menu_moveto@2x.png') no-repeat center
    center;
  background-size: cover;
  cursor: pointer;
}
.features-list-l {
  height: 271px;
  overflow-x: hidden;
  overflow-y: auto;
}
.selected-list {
  height: 318px;
  padding-top: 8px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.list-item {
  padding: 6px 0 6px 16px;
  height: 53px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background: #f6f7ff;
  }
  &.active {
    background: #ecf5ff;
  }
  &.item-bg {
    background: #fbfbfb;
  }
  .f-title4 {
    line-height: 20px;
    font-weight: 600;
    font-size: 14px;
    color: #333;
  }
  .f-desc {
    line-height: 16px;
    font-size: 12px;
    color: #666;
  }
}
</style>

<style lang="less">
.features-con {
  .el-tabs__header {
    margin-bottom: 8px;
  }
  .el-tabs__item {
    padding: 0;
    width: 160px;
    text-align: center;
  }
  .el-tabs__nav-wrap.is-scrollable {
    padding: 0;
  }
  .el-tabs__nav-prev,
  .el-tabs__nav-next {
    display: none;
  }
  .el-tabs__active-bar {
    width: 160px !important;
  }
  .el-tabs__item.is-active{
    color: #5667ff;
  }
}
</style>
