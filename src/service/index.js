/*接口文档请查阅 */
import service from './commonService.js'

// 公共接口
const bindCard = {
  /**绑卡*/
  bindCard(data){
    return service.get('/asset/bindCard', data)
  },
}


let http = Object.assign({}, bindCard);
export default http
