<template>
    <div class="card-mi-warp">
      <div class="content-card">
        <div class="left-card">
            <img :src="info.img" alt="">
        </div>
        <div class="right-card">
            <p class="p1">{{info.number}}(万)</p>
            <p class="p2">{{info.tip}}</p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {};
  }
};
</script>
<style lang="less" scoped>
.card-mi-warp{
  border: 1px solid #DEDFE5;
  border-radius: 3px;
  width: 328px;
  height: 98px;
  .content-card{
    padding: 24px;
    img{
        width: 48px;
        height: 48px;
        margin-right: 24px;
    }
    .right-card, .left-card{
      float: left;
    }
    .right-card{
        p{
            height: 24px;
            line-height: 24px;
        }
        .p1{
          font-size: 18px;
          color: #333333;
        }
        .p2{
          font-size: 14px;
          color: #666666;  
        }
    }
  }
}
</style>