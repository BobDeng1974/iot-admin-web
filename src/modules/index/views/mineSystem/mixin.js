// 模组厂商管理
export const moduleVendorMixin = {
    methods: {
        checkName (rule, value, callback) {
          if (!value) {
            callback(new Error('请输入'));
          } else {
            if (value.length > 50) {
              callback(new Error('输入内容在50字以下'));
            } else {
              callback();
            }
          }
        },
        checkCode (rule, value, callback) {
          if (!value) {
            callback(new Error('请输入'));
          } else {
            if (value.length > 50) {
              callback(new Error('输入内容在50字以下'));
            } else if (!/^[0-9a-zA-Z]*$/.test(value)) {
              callback(new Error('输入内容必须是数字或字母'));
            } else {
              callback();
            }
          }
        },
        checkEmail (rule, value, callback) {
          if (!value) {
            callback(new Error('请输入'));
          } else {
            if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
              callback(new Error('请输入正确的邮箱'));
            } else {
              callback();
            }
          }
        },
        checkTel (rule, value, callback) {
          if (!value) {
            callback();
          } else {
            if (!/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(value)) {
              callback(new Error('请输入正确的固定电话'));
            } else {
              callback();
            }
          }
        },
        checkMobile (rule, value, callback) {
          if (!value) {
            callback(new Error('请输入手机号'));
          } else {
            if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          }
        },
        checkPublicKey(rule, value, callback) {
          if (!value) {
            callback(new Error('请输入'));
          } else {
            // 不能输入中文以及特殊字符只能输入数字以及英文字母以及小数点/[^\w\.\/]/ig
            // 不能输入中文以及特殊字符只能输入数字以及英文字母不包含小数点/[^\w\/]/ig
            if (/[^\w\.\/]/ig.test(value)) {
              callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
            } else if (value.length > 1000) {
              callback(new Error('不允许输入超过1000个字符'));
            } else {
              callback();
            }
          }
        }
    }
};
// mac地址管理
export const macMixin = {
    methods: {
        checkStartMac (rule, value, callback) {
          if (!value) {
            callback(new Error('请输入'));
          } else {
            if (!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(value)) {
              callback(new Error('请输入正确的十六进制mac地址'));
            } else {
              callback();
            }
          }
        },
        checkEndMac (rule, value, callback) {
          if (!value) {
            callback(new Error('请输入'));
          } else {
            if (!/^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(value)) {
              callback(new Error('请输入正确的十六进制mac地址'));
            } else {
              callback();
            }
          }
        }
    }
};
// 账户管理
export const accountMixin = {
    methods: {
        checkMip (rule, value, callback) {
            if (!value) {
                callback(new Error('请输入账号'));
              } else {
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
                  callback(new Error('请输入正确的账号'));
                } else {
                  callback();
                }
              }
        },
        checkAccount (rule, value, callback) {
          if (!value) {
            callback();
          } else {
            if (!/^[1-9]\d*$/.test(value)) {
              callback(new Error('请输入正确的账户只能输入正整数'));
            } else {
              callback();
            }
          }
      }
    }
};
// 账户认证管理
export const authenticationManagementMixin = {
  methods: {
    checkMobile (rule, value, callback) {
        if (!value) {
          callback();
        } else {
          if (!/^[1-9]\d*$/.test(value)) {
            callback(new Error('请输入正确的手机号格式只能输入正整数'));
          } else {
            callback();
          }
        }
    }
  }
};
// 角色管理
export const roleMixin = {
  methods: {
    checkRoleName (rule, value, callback) {
        if (!value) {
          callback('请输入角色名');
        } else {
          if (value.length > 10) {
            callback(new Error('角色名不能超出10个字符'));
          } else {
            callback();
          }
        }
    }
  }
};
// licese预申请管理
export const preApplicationManagementMixin = {
  methods: {
    checkNums (rule, value, callback) {
      if (!value) {
          callback(new Error('请输入数量'));
        } else {
          if (!/^[1-9]+\d*$/.test(value) || Number(value) >= 2147483648) {
            callback(new Error('请输入不为0且小于2147483648的正整数'));
          } else {
            callback();
          }
        }
    }
  }
};
// licese申请管理
export const applicationManagementMixin = {
  methods: {
    checkMideaCode (rule, value, callback) {
      if (!value) {
          callback(new Error('请输入'));
        } else {
          if (!/^[0-9a-zA-Z]*$/g.test(value)) {
            callback(new Error('请输入字母，数字或字母数字组合'));
          } else {
            callback();
          }
        }
    },
    checkNums (rule, value, callback) {
      if (!value) {
          callback(new Error('请输入'));
        } else {
          if (!/^[1-9]+\d*$/.test(value) || Number(value) > 30000) {
            callback(new Error('请输入不为0的正整数且单次申请数量不超过30000'));
          } else if (Number(value) > this.largeNums) {
            callback(new Error('申请数量不能大于预测单数量'));
          } else {
            callback();
          }
        }
    },
    checktoTalOrders (rule, value, callback) {
      if (!value) {
          callback(new Error('请输入'));
        } else {
          if (!/^[1-9]+\d*$/.test(value) || Number(value) >= 2147483648) {
            callback(new Error('请输入不为0且小于2147483648的正整数'));
          } else {
            if (this.form.unFinishedOrders && (Number(this.form.unFinishedOrders) > Number(value))) {
              callback(new Error('总订单量必须大于等于未结订单数'));
            } else {
              callback();
            }
            // callback();
          }
        }
    },
    checkUnFinishedOrders (rule, value, callback) {
      if (!value) {
          callback(new Error('请输入'));
        } else {
          if (!/^[0-9]+\d*$/.test(value) || Number(value) >= 2147483648) {
            callback(new Error('请输入小于2147483648的正整数'));
          } else {
            if (this.form.totalOrders && (Number(this.form.totalOrders) < Number(value))) {
              callback(new Error('未结订单数不能超过总订单量'));
            } else {
              callback();
            }
          }
        }
    },
    checkPrice (rule, value, callback) {
      if (!value) {
          callback(new Error('请输入'));
        } else {
          if (!/^([1-9]\d*)(\.\d{1,2})?$/.test(value) || Number(value) * 100 >= 2147483648) {
            callback(new Error('请输入最多包含两位小数并且范围在1-21474836.48的数可以为1'));
          } else {
            callback();
          }
        }
    }
  }
};
