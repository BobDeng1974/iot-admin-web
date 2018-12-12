<template>
  <li :class="{ completed: card.done, editing: editing }" class="Card">
    <div class="view">
      <el-card class="crad-container" v-if="card&&card.name" shadow="hover">
        <div class="card-top">
          <div class="card-network"><img class="small-wifi" src="/static/img/small_wifi@2x.png" alt="">{{card.network| cardNetwork(networkArr,card)}} </div>
          <div class="card-proto" v-show="false"><img class="small-wifi" src="/static/img/small_wifi@2x.png" alt="">{{card.proto| cardProto(protoArr,card)}} </div>
          <div class="card-publicstatis">
            <!-- <span v-if="card.publicStatus===1"><span class="card-spot">.</span>新建</span> -->
            <span v-if="card.publicStatus===10"><span class="card-spot">.</span>待审核</span>
            <span v-if="card.publicStatus===20"><span class="card-spot">.</span>待开发状态</span>
            <span v-if="card.publicStatus===30"><span class="card-spot">.</span>开发中</span>
            <span v-if="card.publicStatus===31"><span class="card-spot">.</span>申请试产中</span>
            <span v-if="card.publicStatus===40"><span class="card-spot">.</span>试产中</span>
            <span v-if="card.publicStatus===41"><span class="card-spot">.</span>申请上线中</span>
            <span v-if="card.publicStatus===50"><span class="card-spot">.</span>开发完成</span>
            <span v-if="card.publicStatus===11"><span class="card-spot">.</span>新建</span>
          </div>
        </div>
        <div class="card-name">{{card.name}}</div>
        <div class="card-date">
          <div class="create-date">
            <span class="date">创建时间</span>{{card.cdate}}</div>
          <div class="update-date">
            <span class="date">更新时间</span>{{card.mdate}}</div>
        </div>
        <div class="card-button-container">
          <el-button class="card-button" @click="cardBtnHandle(card.publicStatus)">{{"查看详情"}}</el-button>
          <!-- <el-button class="card-button" @click="cardBtnHandle(card.publicStatus)">{{card.publicStatus===1?'去调试':'查看统计'}}</el-button> -->
        </div>
      </el-card>
      <el-card v-else class="crad-container add-card-container" shadow="hover">
        <div @click="addCard">
          <!-- ./../../../img/mid_add@2x.png -->
          <img src="./../../img/mid_add@2x.png" alt="">
          <p>新增硬件产品</p>
        </div>
      </el-card>
    </div>
  </li>
</template>

<script>
import commonFun from '@/common/js/func';
export default {
  name: 'Card',
  directives: {
    // focus(el, { value }, { context }) {
    //   if (value) {
    //     context.$nextTick(() => {
    //       el.focus();
    //     });
    //   }
    // }
  },
  props: {
    card: {
      type: Object,
      default: function() {
        return {};
      }
    },
    networkArr: {
      type: Array,
      default: function() {
        return [];
      }
    },
    protoArr: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    cardBtnHandle(state) {
      this.$emit('cardBtnHandle', { state: state, detail: this.card });
    },
    addCard() {
      this.$emit('addCard');
    }
  },
  filters: {
    cardNetwork(val, networkArr, card) {
      return commonFun.transformationNetwork(val, networkArr, card);
    },
    cardProto(val, protoArr, card) {
      // return '22';
      // debugger;
      return commonFun.transformationProtos(val, protoArr, card);
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@deep: ~'>>>';
.card-button-container {
  padding-top: 32px;
}
.card-publicstatis {
  & > span {
    display: flex;
    align-items: center;
  }
}
.card-date {
  font-size: 12px;
  color: #666666;
  .create-date {
    padding-bottom: 12px;
  }
  .date {
    padding-right: 12px;
  }
}
.card-name {
  font-size: 18px;
  color: #333333;
  padding: 24px 0px 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-publicstatis {
  display: flex;
  align-items: center;
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .card-network {
    display: flex;
  }
  .card-spot {
    display: inline-block;
    background: #5667ff;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 4px;
    overflow: hidden;
  }
}
.small-wifi {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.card-button {
  border-radius: 0px;
  font-size: 12px;
  color: #5667ff;

  &.el-button {
    border: 1px solid #5667ff;
    border-radius: 1px;
    padding: 10px 26px;
    &:hover {
      background: #5667ff;
      border-radius: 1px;
      color: #ffffff;
    }
  }
}
.crad-container {
  width: 240px;
  height: 240px;
}
.Card {
  padding-right: 24px;
  padding-top: 22px;
}
.crad-container {
  border-radius: 1px;
  &:hover {
    border: 1px solid #5667ff;
    box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.1);
  }
  @{deep} .el-card__body {
    padding: 24px;
  }
}
.add-card-container {
  @{deep} .el-card__body {
    display: flex;
    justify-content: center;
    padding-top: 60px;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      & > img {
        display: inline-block;
        width: 60px;
        height: 60px;
      }
    }
    p {
      font-size: 14px;
      color: #5667ff;
    }
  }
}
// .view{
//   width: 100%;
//   height: 100%;
// }
</style>
