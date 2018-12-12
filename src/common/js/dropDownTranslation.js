import API from '@/modules/index/api/myProductsData/index';
// import { getSn8Select } from '@/modules/index/api/myAgreement/index';
export const dropDownTranslation = {
  data() {
    return {
      cpuList: [], // 芯片CPU架构
      chipModelList: [], // 芯片型号
      chipBrandList: [],   // 芯片品牌
      OperatingSystemList: [], // 操作系统
      applianceTypeOpts: [], // 品类下拉
      sn8Opts: [], // 子型号
      sdkIdOptions: [], // sdk下拉
      optionsFirst: [], // 三级联动1
      optionsFirst1: [], // 三级联动2
      optionsFirst2: [], // 三级联动3
      networkArr: [], // 联网下拉
      protoArr: [] // proto下拉
    };
  },
  methods: {
    // 芯片CPU架构 下拉
    getCpuJson() {
      API.getCpuJson()
        .then(res => {
          if (res.code === 0) {
            if (res.result.length >= 0) {
              res.result.forEach((element, index) => {
                element.id = index + 1;
              });
              this.cpuList = res.result;
            }
            // debugger;
            // {this.cpuList = res.result;}
          } else {
            this.cpuList = [];
          }
        })
        .catch(() => {
          this.cpuList = [];
        });
    },
    // 芯片品牌 下拉
    getChipBrandJson() {
      API.getChipBrandJson()
        .then(res => {
          if (res.code === 0) {
            if (res.result.length >= 0) {
              res.result.forEach((element, index) => {
                element.id = index + 1;
              });
              this.chipBrandList = res.result;
            }
          } else {
            this.chipBrandList = [];
          }
        })
        .catch(() => {
          this.chipBrand = [];
        });
    },
    // 芯片型号 下拉
    getChipModelJson() {
      API.getChipModelJson()
        .then(res => {
          if (res.code === 0) {
            if (res.result.length >= 0) {
              res.result.forEach((element, index) => {
                element.id = index + 1;
              });
              this.chipModelList = res.result;
            }
          } else {
            this.chipModelList = [];
          }
        })
        .catch(() => {
          this.chipModelList = [];
        });
    },
    // 操作系统 下拉
    getOperatingSystem() {
      API.getOperatingSystem()
        .then(res => {
          if (res.code === 0) {
            if (res.result.length >= 0) {
              res.result.forEach((element, index) => {
                element.id = index + 1;
              });
              this.OperatingSystemList = res.result;
            }
          } else {
            this.OperatingSystemList = [];
          }
        })
        .catch(() => {
          this.OperatingSystemList = [];
        });
    },
    // 品类下拉
    async getApplianSelect() {
      let param = {
        id: 0
      };
      try {
        await this.$store.dispatch('getApplianSelect', param).then(result => {
          // debugger;
          this.applianceTypeOpts = result.result;
        });
      } catch (e) { }
    },
    // 子型号下拉
    async getSn8Select(objId) {
      try {
        await this.$store.dispatch('getSn8Select', objId).then(result => {
          // debugger;
          this.sn8Opts = result.result;
        });
      } catch (e) { }
    },
    // 芯片型号 下拉
    getSdkSelect(params) {
      API.getSdkSelect(params)
        .then(res => {
          if (res.code === 0) {
            if (res.result.length >= 0) {
              this.sdkIdOptions = res.result;
            }
          } else {
            this.sdkIdOptions = [];
          }
        })
        .catch(() => {
          this.sdkIdOptions = [];
        });
    },
    // 三级下拉
    // 1
    async getcategorySelect(objId) {
      try {
        await this.$store.dispatch('getcategorySelect', objId).then(result => {
          this.optionsFirst = result.result;
        });
      } catch (e) { }
    },
    // 2
    async getcategorySelect1(objId) {
      try {
        await this.$store.dispatch('getcategorySelect', objId).then(result => {
          this.optionsFirst1 = result.result;
        });
      } catch (e) { }
    },
    // 3
    async getApplianSelectAdd(objId) {
      try {
        await this.$store.dispatch('getApplianSelect', objId).then(result => {
          this.optionsFirst2 = result.result;
        });
      } catch (e) { }
    },
    // network
    async getNetwork() {
      try {
        await this.$store.dispatch('getNetwork', {'id': 0}).then((result) => {
          this.networkArr = result.result;
        });
      } catch (e) {}
    },
    async getProtos() {
      await this.$store.dispatch('getProtos', {'id': 0}).then((result) => {
        this.protoArr = result.result;
      });
    }
        // // 子品类
        // luaGetSn8Select(id) {
        //   let param = {
        //     id: id
        //   };
        //   getSn8Select(param).then(res => {
        //     if (res.code === 0) {
        //       this.sn8Opts = res.result;
        //     }
        //   });
        // }
  },
  watch: {
    // 'ruleForm.electrical'(e) {
    //   if (this.changeFlag) {
    //     this.ruleForm.electrical1 = {};
    //   }
    //   if (e && e.id) {
    //     this.getcategorySelect1({ pid: e.id });
    //   }
    // },
    // 'ruleForm.electrical1'(e) {
    //   // debugger;
    //   if (this.changeFlag) {
    //     this.ruleForm.electrical2 = {};
    //   }
    //   if (e && e.id) {
    //     this.getApplianSelectAdd({ id: e.id });
    //   }
    // },
    // 'ruleForm.electrical2'(e) {
    //   // debugger;
    //   // if (this.changeFlag) {
    //   //   this.form.projectaddress = '';
    //   // }
    // }
  }
};
