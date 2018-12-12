

<script>
export default {
  data() {
    return {};
  },
  props: {
    // 三级名称显示
    applianceTypeArr: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      require: true,
      type: Object,
      default: () => ({})
    },
    // 默认不显示id
    ignoreDatas: {
      require: false,
      type: Object,
      default: () => ({ id: '1' })
    },
    tableLabel: {
      require: true,
      type: Object,
      default: () => ({})
    },
    clickData: {
      require: false,
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleClick(state) {
      this.$emit('detailTableClick', {id: this.tableData.id, state: state});
      // alert(state);
    }
  },
  render() {
    this.tableData;
    this.ignoreData;
    this.tableLabel;
    this.applianceTypeArr;
    debugger;
    let that = this;
    let obj = this.tableData;
    // const testComponent = <span {...this.applianceTypeArr}>dd</span>;
    // testComponent;
    debugger;
    return (
      <div class="details-table">
        {
        Object.keys(obj).map(function(key) {
          for (let ignoreData in that.ignoreDatas) {
            if (ignoreData === key) {
              return;
            }
          }
          return (
            <tr class="tr-row">
              <th class="column-th">
                {
                Object.keys(that.tableLabel).map(function(label) {
                  if (label === key) {
                    return that.tableLabel[label];
                  }
                })}
              </th>
              <td class="column">
                {
                obj[key]
                  // key==='applianceType' ? { obj[key] } : ''
                }
                {
                Object.keys(that.clickData).map(function(clickItem) {
                  if (clickItem === key) {
                    return (
                      <a
                        class={[
                          'tableclick',
                          `${clickItem}`
                        ]
                        }
                        on-click={that.handleClick.bind(null, key)}
                      >
                        {that.clickData[clickItem]}
                      </a>
                    );
                  }
                })}
              </td>
            </tr>
          );
        })}
      </div>
    );
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
    border-bottom: none;
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
