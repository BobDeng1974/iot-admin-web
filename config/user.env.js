/**
 * Created by CHENRC2 on 2017-10-25.
 * 环境配置文件说明：
 * 1.建议经常性修改的环境信息都写在当前文件（避免重复修改需打包发布）
 * 2.带有私密性内容写在环境变量中
 */
var environment = (function () {
  var _application;
  if (window.location.host === 'devadmin-prod.msmartlife.com') {
    // 生产环境域名
    _application = {
      iotserver: 'http://devadmin-prod.msmartlife.com/adminWeb/v1/iotserver',
      iotserverUcenterAdminWeb: 'http://devadmin-prod.msmartlife.com/ucenterAdminWeb/v1/iotserver',
      iotmj: '/mj'
    }
  } else if (window.location.host === 'devadmin-sit.msmartlife.com') {
    // 测试环境域名
    _application = {
      iotserver: 'http://devadmin-sit.msmartlife.com/adminWeb/v1/iotserver',
      iotserverUcenterAdminWeb: 'http://devadmin-sit.msmartlife.com/ucenterAdminWeb/v1/iotserver',
      iotmj: '/mj'
    }
  } else {
    // 开发环境环境域名
    _application = {
      // iotserver: 'http://devadmin-sit.msmartlife.com/adminWeb/v1/iotserver',
      // iotserverUcenterAdminWeb: 'http://devadmin-sit.msmartlife.com/ucenterAdminWeb/v1/iotserver',
      iotserver: 'http://devadmin-dev.msmartlife.com/adminWeb/v1/iotserver',
      iotserverUcenterAdminWeb: 'http://devadmin-dev.msmartlife.com/ucenterAdminWeb/v1/iotserver',
      iotmj: '/mj'
    }
  }
  //项目目录..
  var _pathName = '/';

  return {
    securityKey: 'mideaiottest_sso_token',// 前端秘钥
    index: 'page.html', // 登录后跳转的系统
    appId: 'MFRAMEWORK_DEMO',
    // 基础框架配置
    iotserver: {
      APPLICATION_NAME: _application.iotserver,
      MJAPP_NAME: _application.iotserverUcenterAdminWeb
    }
  }
})();

window.environment = environment;
