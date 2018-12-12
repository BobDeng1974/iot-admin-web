import Mock from 'mockjs';
import applySdkAPI from './applySdk';
import hardwareListAPI from './hardwareList';
import hardwareDetailsAPI from './hardwareProductDetails';

// 开发者信息模拟数据
import './developInfo';

// 我的协议模拟数据
import './myAgreement';

// 申请sdk相关接口
Mock.mock(/\/hardware\/wifiSdkGetList/, 'post', applySdkAPI.getList);
// 获取硬件列表api
Mock.mock(/\/hardware\/getHardwareList/, 'post', hardwareListAPI.getList);

Mock.mock(/\/hardware\/getHardware/, 'post', hardwareDetailsAPI.getArticle);

 export default Mock;
