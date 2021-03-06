export const checkInfo = {
  methods: {
    // 用户id校验
    checkSn(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        // 不能输入中文以及特殊字符只能输入数字以及英文字母以及小数点/[^\w\.\/]/ig
        // 不能输入中文以及特殊字符只能输入数字以及英文字母不包含小数点/[^\w\/]/ig
        if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
        } else {
          callback();
        }
      }
    },
    // 用户id校验
    checkId(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        if (!/^[1-9]\d*$/.test(value)) {
          callback(new Error('请输入正确的设备ID只能输入正整数'));
        } else {
          callback();
        }
      }
    },
    checkUserId(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        if (!/^[1-9]\d*$/.test(value)) {
          callback(new Error('请输入正确的用户id只能输入正整数'));
        } else {
          callback();
        }
      }
    },
    // 用户手机号校验
    checkMobile(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }
    }
    // checkMobile (rule, value, callback) {
    //   if (!value) {
    //       callback();
    //     } else {
    //       if (!/^1\d{0,10}$/.test(value)) {
    //         callback(new Error('请输入不超过11位，且第一位是1的整数'));
    //       } else {
    //         callback();
    //       }
    //     }
    // }
  }
};
// 型号录入
export const typeEnter = {
  methods: {
    checkSn8(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        // 不能输入中文以及特殊字符只能输入数字以及英文字母以及小数点/[^\w\.\/]/ig
        // 不能输入中文以及特殊字符只能输入数字以及英文字母不包含小数点/[^\w\/]/ig
        if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
        } else if (value.length > 20) {
          callback(new Error('不允许输入超过20个字符'));
        } else {
          callback();
        }
      }
    },
    checkModelNumber (rule, value, callback) {
      if (!value) {
        callback();
      } else {
        // 不能输入中文以及特殊字符只能输入数字以及英文字母以及小数点/[^\w\.\/]/ig
        // 不能输入中文以及特殊字符只能输入数字以及英文字母不包含小数点/[^\w\/]/ig
        if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
        } else if (value.length > 20) {
          callback(new Error('不允许输入超过20个字符'));
        } else {
          callback();
        }
      }
    },
    checkPoductName(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        // 不能输入特殊字符/[^u4e00-u9fa5w]/g但会包含@
        if (/[`~!@#$%^&*()_+<>?:"{},. \/;'[\]]/im.test(value) || /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) {
          callback(new Error('不允许输入特殊字符'));
        } else if (value.length > 50) {
          callback(new Error('不允许输入超过50个字符'));
        } else {
          callback();
        }
      }
    },
    checkModel(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        // 不能输入特殊字符/[^u4e00-u9fa5w]/g但会包含@
        if (/[`~!@#$%^&*()_+<>?:"{},. \/;'[\]]/im.test(value) || /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) {
          callback(new Error('不允许输入特殊字符'));
        } else if (value.length > 50) {
          callback(new Error('不允许输入超过50个字符'));
        } else {
          callback();
        }
      }
    },
    checkMaterielCode(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        if (/[`~!@#$%^&*()_+<>?:"{},. \/;'[\]]/im.test(value) || /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) {
          callback(new Error('不允许输入特殊字符'));
        } else if (value.length > 50) {
          callback(new Error('不允许输入超过50个字符'));
        } else {
          callback();
        }
      }
    }
  }
};
// 菜单管理
export const menuCtor = {
  methods: {
    checkPermissionTag(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        // 不能输入中文以及特殊字符只能输入数字以及英文字母以及小数点/[^\w\.\/]/ig
        // 不能输入中文以及特殊字符只能输入数字以及英文字母不包含小数点/[^\w\/]/ig
        if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
        } else if (value.length > 30) {
          callback(new Error('不允许输入超过30个字符'));
        } else {
          callback();
        }
      }
    },
    checkName (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        if (/[`~!@#$%^&*()_+<>?:"{},. \/;'[\]]/im.test(value) || /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符'));
        } else if (value.length > 20) {
          callback(new Error('不允许输入超过20个字符'));
        } else {
          callback();
        }
      }
    },
    checkPermissionUrl(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        if (/[^\w\.\/]/ig.test(value)) {
          callback(new Error('请输入正确的格式不允许输入特殊字符及中文'));
        } else if (value.length > 50) {
          callback(new Error('不允许输入超过50个字符'));
        } else {
          callback();
        }
      }
    },
    checkOrder(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入'));
      } else {
        if (!/^(\+?[1-9]\d{0,2}|\+?1000)$/.test(value)) {
          callback(new Error('只能输入1-1000的正整数'));
        } else {
          callback();
        }
      }
    }
  }
};
