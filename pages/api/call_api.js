import axios from 'axios';
class callApi {
  // api đăng ký nv
  static async registerEp(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/employee/register', data);
      response = call;
    } catch (error) {
      response = error.response.data.error.message
    }
    return response;
  }

  // api check vip
  static async checkVip(idCom) {
    let response = '';
    const call = await axios.post('https://chamcong.24hpay.vn/service/verify_vip.php', { idCom: idCom });
    response = call;
    return response;
  }
}

export default callApi;