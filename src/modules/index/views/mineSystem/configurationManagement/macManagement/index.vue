<template>
    <div class="macManagement-mine-wap">
        <div class="title-account">
            <con-header :title-icon="addProductsIcon" title="mac地址管理" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 卡片 -->
        <div class="card-macManagement">
          <el-row>
               <el-col :span="8" v-for="(item, index) in cardList" :key='index'>
                   <mine-card :info="item"></mine-card>
               </el-col>
          </el-row>
        </div>
        <!-- 有效mac表格 -->
        <div class="table-one" v-loading="validLoading">
          <div class="table-btn">
            <div class="left"><p>有效mac</p></div>
            <div class="right" v-authority="'b1_macAddTag'"><el-button type="primary" icon="el-icon-plus" @click="macAdd('valid')">{{'新增'}}</el-button></div>
          </div>
          <el-table :data="validMacList" style="width: 100%" class='table'>
            <el-table-column prop="index" width="150" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="startMac" label="起始mac/IMEI" align="center"></el-table-column>
            <el-table-column prop="endMac" label="结束mac/IMEI" align="center"></el-table-column>
            <el-table-column label="保存时间" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.updateTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="createUser" label="添加人" align="center"></el-table-column>
          </el-table>
          <div class="fenye">
            <el-pagination
            @current-change="handleCurrentChange('valid')"
            :page-size="validPageSize"
            :current-page.sync="validCurrentPage"
            layout="total, prev, pager, next"
            :total="validTotal">
            </el-pagination>
          </div>
        </div>
        <!-- 已分配mac表格 -->
        <div class="table-one" v-loading="allocatedLoading">
          <div class="table-btn">
            <div class="left"><p>已分配mac</p></div>
            <!-- <div class="right"><el-button type="primary" icon="el-icon-plus" @click="macAdd('allocated')">{{'新增'}}</el-button></div> -->
          </div>
          <el-table :data="allocatedMacList" style="width: 100%"  class='table'>
            <el-table-column prop="index" width="150" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="startMac" label="起始mac" align="center"></el-table-column>
            <el-table-column prop="endMac" label="结束mac" align="center"></el-table-column>
            <el-table-column prop="nums" label="对应license数量" align="center"></el-table-column>
            <el-table-column label="分配厂商" align="center">
              <template slot-scope="scope">
                 <a style="cursor:initial" @click="btnClick">{{scope.row.supplyName}}</a>
              </template>
            </el-table-column>
          </el-table>
            <div class="fenye">
              <el-pagination
              @current-change="handleCurrentChange('allocated')"
              :page-size="allocatedPageSize"
              :current-page.sync="allocatedCurrentPage"
              layout="total, prev, pager, next"
              :total="allocatedTotal">
              </el-pagination>
            </div>
        </div>
        <!-- 弹框 -->
        <mine-dialog :dialogFormVisible='flag' :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
          <add-valid slot="option" @close="close" v-if="type === 'valid'" @requestTable="handleCurrentChange('valid')"></add-valid>
          <add-allocated slot="option" @close="close" v-if="type === 'allocated'"  @requestTable="handleCurrentChange('allocated')"></add-allocated>
        </mine-dialog>
    </div>
</template>
<script>
import { format } from '@/modules/index/api/system/common.js';
import mineDialog from '@/modules/index/components/mine-dialog';
import conHeader from '@/components/awesome/con-header/con-header';
import mineCard from './card';
import API from '@/modules/index/api/system/system.js';
import addAllocated from './addAllocated';
import addValid from './addValid';
export default {
  components: {
    conHeader,
    mineCard,
    mineDialog,
    addAllocated,
    addValid
  },
  created () {
    this.allocatedCurrentChange();
    this.validCurrentChange();
    this.getCardNumber();
  },
  data () {
    return {
      type: '',
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      addProductsIcon: '',
      cardList: [
        {img: '/static/img/icon_effective@2x.png', tip: '有效地址段', number: 0, id: 'totalNum'},
        {img: '/static/img/icon_fenpei@2x.png', tip: '已分配地址段', number: 0, id: 'allocateNum'},
        {img: '/static/img/icon_remind@2x.png', tip: '剩余地址段', number: 0, id: 'surplusNum'}
      ],
      allocatedMacList: [],
      validMacList: [],
      validCurrentPage: 1,
      validTotal: 0,
      validPageSize: 5,
      allocatedCurrentPage: 1,
      allocatedTotal: 0,
      allocatedPageSize: 5,
      validLoading: false,
      allocatedLoading: false
    };
  },
  methods: {
    renderIndex (h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    close (val) {
      this.flag = val;
    },
    // 获取卡片数量处理
    getCardNumber () {
      API.getNumber()
      .then(res => {
        console.log(res, '获取数量');
        this.initNumber(res.result);
      });
    },
    initNumber (val) {
      for (var i = 0; i < this.cardList.length; i++) {
        for (var key in val) {
          if (this.cardList[i].id === key) {
            this.cardList[i].number = (val[key] / 10000).toFixed(2);
          }
        }
      }
    },
    btnClick () {},
    handleCurrentChange (val) {
      switch (val) {
        case 'allocated':
          this.allocatedCurrentChange();
          this.getCardNumber();
          break;
        case 'valid':
          this.validCurrentChange();
          this.getCardNumber();
          break;
      }
    },
    allocatedCurrentChange () {
      this.allocatedLoading = true;
      const params = {
        pageNo: this.allocatedCurrentPage,
        pageSize: this.allocatedPageSize
      };
      API.allocatedMacList(params)
          .then(res => {
            if (res.code === 0) {
              this.allocatedMacList = this.initTableData(res.result.data ? res.result.data : [], this.allocatedCurrentPage, this.allocatedPageSize);
              this.allocatedTotal = res.result.total;
            }
            this.allocatedLoading = false;
          })
          .catch(() => {
            this.allocatedLoading = false;
          });
    },
    validCurrentChange () {
      this.validLoading = true;
      const params = {
        pageNo: this.validCurrentPage,
        pageSize: this.validPageSize
      };
      API.validMacList(params)
          .then(res => {
            if (res.code === 0) {
              this.validMacList = this.initTableData(res.result.data ? res.result.data : [], this.validCurrentPage, this.validPageSize);
              this.validTotal = res.result.total;
            }
            this.validLoading = false;
          })
          .catch(() => {
            this.validLoading = false;
          });
    },
    // 给请求回来的表格数据新增index属性（序号）
    initTableData (val, currentPage, pageSize) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = ((currentPage - 1) * pageSize) + i + 1;
      }
      return val;
    },
    initDialog (title, type) {
      this.title = title;
      this.flag = true;
      this.type = type;
    },
    macAdd (val) {
      switch (val) {
        case 'allocated':
          this.initDialog('新增已分配mac', 'allocated');
          break;
        case 'valid':
          this.initDialog('新增有效mac', 'valid');
          break;
      }
    }
  },
  filters: {
    fomatDate (val, type) {
      if (!val) return '';
      return format(val, type);
    }
  }
};
</script>
<style lang="less" scoped>
.macManagement-mine-wap{
  .card-macManagement{
    padding: 24px 0;
  }
  .fenye{
    text-align: right;
    margin-top: 16px;
  }
  .table-one{
      margin-bottom: 30px;
      .table-btn{
        overflow: hidden;
        *zoom: 1;
        margin-bottom: 10px;
      }
    .left{
        float: left;
        p{
            line-height: 44px;
            height: 44px;
        }
    }
    a{
      cursor: pointer;
      color: blue;
    }
    .right{
        float: right;
    }
  }
}
</style>

