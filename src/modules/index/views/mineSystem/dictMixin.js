import API from '@/modules/index/api/system/system.js';
export const dictMixin = {
    data () {
      return {
        applyList: [], // 模组厂商下拉
        deparmentList: [], // 事业部下拉
        applianList: [], // 品类下拉
        sn8List: [], // 子类型下拉
        networkList: [], // 联网方式
        protosList: [], // 支持协议
        roleList: [], // 所有角色
        userList: [], // 所有对接人
        preApplyIdList: [] // 对应预测单下拉
      };
    },
    methods: {
    // 获取模组厂商下拉列表
    getApply () {
        API.getSupplyList()
        .then(res => {
          if (res.code === 0) {
            this.applyList = res.result;
          } else {
            this.applyList = [];
          }
        })
        .catch(() => {
          this.applyList = [];
        });
      },
    // 事业部
    getAlldeparment () {
        API.getDepartment({})
          .then(res => {
            if (res.code === 0) {
                this.deparmentList = res.result;
              } else {
                this.deparmentList = [];
            }
        })
        .catch(() => {
            this.deparmentList = [];
        });
      },
    // 品类下拉
    getApplianList (id) {
        const params = {
          id: id || 0
        };
        API.getApplianSelect(params)
        .then(res => {
          if (res.code === 0) {
            this.applianList = res.result;
          } else {
            this.applianList = [];
          }
        })
        .catch(() => {
            this.applianList = [];
        });
      },
      // 三级联动品类下拉
      getApplianListAsDpartId (id) {
        const params = {
          deparId: id || 0
        };
        API.getApplianSelect(params)
        .then(res => {
          if (res.code === 0) {
            this.applianList = res.result;
          } else {
            this.applianList = [];
          }
        })
        .catch(() => {
            this.applianList = [];
        });
      },
    // 子类下拉
    getSn8List (val) {
        const params = {
          id: val
        };
        API.getSn8Select(params)
        .then(res => {
          if (res.code === 0) {
            this.sn8List = res.result;
          } else {
            this.sn8List = [];
          }
        })
        .catch(() => {
            this.sn8List = [];
        });
      },
    // 联网方式
    getNetworkList () {
        const params = {
          id: 0
        };
        API.getNetwork(params)
        .then(res => {
          if (res.code === 0) {
            this.networkList = res.result;
          } else {
            this.networkList = [];
          }
        })
        .catch(() => {
            this.networkList = [];
        });
      },
    // 支持协议
    getProtosList () {
        const params = {
          id: 0
        };
        API.getProtos(params)
        .then(res => {
          if (res.code === 0) {
            this.protosList = res.result;
          } else {
            this.protosList = [];
          }
        })
        .catch(() => {
            this.protosList = [];
        });
      },
    // 角色
    getAllrole () {
        const params = {roleId: ''};
        API.allRole(params)
        .then(res => {
          if (res.code === 0) {
            this.roleList = res.result;
          } else {
            this.roleList = [];
          }
        })
        .catch(() => {
            this.roleList = [];
        });
      },
    // 获取所有对接人
    getAlluser () {
        API.getAllusers()
        .then(res => {
          if (res.code === 0) {
            this.userList = res.result;
          } else {
            this.userList = [];
          }
        })
        .catch(() => {
          this.userList = [];
        });
      },
    // 获取对应预测单下拉
    getPreApplyIdList (val) {
      const params = {
        supplyId: val
      };
      API.findListBySupplyId(params)
      .then(res => {
        if (res.code === 0) {
          this.preApplyIdList = res.result;
        } else {
          this.preApplyIdList = [];
        }
      })
      .catch(() => {
          this.preApplyIdList = [];
      });
    }
    }
    // // 给对接人下拉新增属性
    // initUser (val) {
    //   for (var i = 0; i < val.length; i++) {
    //     if (val[i].realName) {
    //       val[i].showName = val[i].account + '[(' + val[i].realName + ')]';
    //     } else {
    //       val[i].showName = val[i].account;
    //     }
    //   }
    // }
};
