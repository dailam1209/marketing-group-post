import axios from 'axios';
class callApi {
  // api register employee
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

  //api dang ky cty
  static async registerCom(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/Company/register', data);
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
  static async registerPerson(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/individual/register', data);// api looix
      response = call;
      //  console.log("response : " + response);
    } catch (error) {
      response = error.message;
    }
    return response;
  }
  static async loginPerson(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/individual/login', { phoneTK: data.email, password: data.password });
      response = call;

    } catch (error) {
      response = error;
    }
    return response;
  }
  static async quen_mat_khau(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlcemployee/forgotPassword ', data);
      response = call;
      //  console.log("response : " + response);
    } catch (error) {
      response = error.message;
    }
    return response;
  }

  static getInfo(headers) {
    let response = '';
    try {
      const call = axios.post('http://210.245.108.202:3000/api/qlc/individual/info', {}, (headers));
      response = call;
      //  console.log("response : " + response);
    } catch (error) {
      response = error.message;
    }
    return response;
  }
}



export default callApi;