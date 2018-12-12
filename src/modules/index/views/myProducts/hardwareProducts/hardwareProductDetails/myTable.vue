<template>
  <div>
    <!--开始认证方式列表-->
    <div class=" details-table" border="1" bordercolor="#ebeef5">
      <!-- <tbody> -->
      <tr class="tr-row" v-for="(val, key) in tableLabel" :key="key">
        <td class="column-th">
          <span>{{val}}</span>
        </td>
        <td class="column">
          <span v-if="typeof hardwareDetail[key] !== 'object'">{{hardwareDetail[key]}}</span>
          <!-- <span v-else-if="typeof hardwareDetail[key] === 'object'&& hardwareDetail[key]==='applianceType'">
              <span class="col-item" v-for="(mItem, index) in hardwareDetail[key]" :key="index">
                <span>{{mItem[index]}}</span>
            </span>
          </span> -->
          <!-- <div class="col-list" v-if="(typeof hardwareDetail[key] === 'object') && (hardwareDetail[key] instanceof Array)">
            <div class="col-item" v-for="(mItem, index) in hardwareDetail[key]" :key="index">
              <div class="col-img">
                <img v-if="mItem.imgUrl" :src="mItem.imgUrl" alt="图片不存在" />
              </div>
              <p>{{mItem.level}}</p>
              <p>{{mItem.userName}}</p>
            </div>
          </div> -->
        </td>
      </tr>
      <!-- </tbody> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  // props: {
  //   hardwareDetail: {
  //     require: true,
  //     type: Object,
  //     default: () => ({})
  //   },
  //   tableLabel: {
  //     require: true,
  //     type: Object,
  //     default: () => ({})
  //   }
  // },

  computed: {
    ...mapGetters(['hardwareDetail', 'tableLabel', 'applianceTypeArr'])
  },
  watch: {
    hardwareDetail(o, n) {
      debugger;
    }
  },
  mounted() {
    console.log(this.tableLabel);
    console.log(this.hardwareDetail);
    this.tableLabel;
    this.hardwareDetail;
    debugger;
  }
};
</script>
<style lang="less" scoped>
.details-table {
  border: 1px solid #eeeeee;
  width: 100%;
  margin-top: 22px;
}
.tr-row {
  border-bottom: 1px solid #eeeeee;
  height: 49px;
  width: 100%;
  display: flex;
  align-items: center;
  &:hover > td,
  &:hover > th {
    background-color: #f5f7fa;
  }
  &:last-child {
    // border-bottom: none;
  }
}
.column {
  // border-right: 1px solid #eeeeee;
  display: inline-block;
  flex: 1;
  height: 100%;
  line-height: 49px;
  text-align: left;
  padding-left: 40px;
}
.column-th {
  border-right: 1px solid #eeeeee;
  width: 200px;
  height: 100%;
  display: inline-block;
  line-height: 49px;
  text-align: left;
  padding-left: 40px;
}
.tableclick {
  font-size: 14px;
  color: #5667ff;
  padding-left: 8px;
}
</style>

