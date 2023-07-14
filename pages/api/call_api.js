import axios from 'axios';
class CallApi {
    static async callAPI(url, data, token) {
        let configHeader = {
            headers: {}
        };
        if (token) {
            configHeader.headers['Authorization'] = `Bearer ${token}`;
        }

        let configData = {}
        if (data) {
            configData = data;
        }

        let response = '';

        try {
            const call = await axios.post(url, configData, configHeader);
            response = call.data.data.data;
        } catch (error) {
            response = error.response;
        }

        return response;
    }

    // api register employee
    static async registerEp(data) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/employee/register', data);
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response;
    }

    //api register company
    static async registerCom(data) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Company/register', data);
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response;
    }

    // api register personal
    static async registerPersonal(data) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/individual/register', data);
            response = call;
        } catch (error) {
            response = error.response.data.error.message;
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

    // api login personal
    static async loginPersonal(data) {
        // let response = '';
        // try {
        //   const call = await axios.post('/api/qlc/individual/login', { phoneTK: data.email, password: data.password });
        //   response = call;

        // } catch (error) {
        //   response = error;
        // }
        // return response;
        let result = CallApi.callAPI(process.env.NEXT_PUBLIC_API + '/api/qlc/individual/login', data, '');
        return result;
    }

    // api login employee
    static async loginEmployee(data) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/employee/login', data);
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response;
    }

    // api login company
    static async loginCompany(data) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Company/login', data);
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response;
    }

    //  ????
    static async quen_mat_khau(data) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlcemployee/forgotPassword ', data);
            response = call;
        } catch (error) {
            response = error.message;
        }
        return response;
    }

    // api get infor personal
    static async getInfoPersonal(token) {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/individual/info', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            response = call.data.data.data;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response;
    }

    // api get infor employee
    static async getInfoEp(token) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/employee/info', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call.data.data.data;
        } catch (error) {
            response = error
        }
        return response
    }

    // api get infor company
    static async getInfoCom(token) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Company/info', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call.data.data.data;
        } catch (error) {
            response = error
        }
        return response
    }

    // api change password employee
    static async changePassEp(token, data) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/employee/updatePassword', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }

        return response
    }

    // api change password personal
    static async changePassPersonal(token, data) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/individual/updatePassword', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api change password personal
    static async changePassCom(token, data) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Company/updateNewPassword', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api authen personal
    static async authenPersonal(token) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/individual/verify', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api authen employee
    static async authenEp(token) {
        let response = ''
        try {
            const call = await await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/employee/verify', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api authen company
    static async authenCom(token) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Company/verify', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // update info personal 
    static async updatePersonal(token) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/individual/updateInfoindividual', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response

    }

    // update info employee
    static async updateEp(token) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/employee/updateInfoEmployee', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // update info company
    static async updateCom(data, token) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Company/updateInfoCompany', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api phòng ban
    static async listDepartments(idCom) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/department/get', { com_id: idCom })
            response = call.data.data.data;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api tổ
    static async listGroups(idCom, idDep) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/team/search', { com_id: idCom, dep_id: idDep })
            response = call.data.data.data;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api nhóm
    static async listTeams(idCom, idDep, idGroup) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/group/search', { com_id: idCom, dep_id: idDep, team_id: idGroup })
            response = call.data.data.data;
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api admin
    // api get list feedback
    static async listFeedback(currentPage) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Admin/getListFeedback', { page: currentPage })
            response = call
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api get list company
    static async listCom(data) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Admin/listCom', data)
            response = call
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api update vip
    static async updateVip(data) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Admin/vip', data)
            response = call
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api change pw admin
    static async updatePwAdmin(data) {
        let response = ''
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Admin/updatePassword', data)
            response = call
        } catch (error) {
            response = error.response.data.error.message
        }
        return response
    }

    // api lay danh sach bao loi
    static async dsBaoLoi() {
        let response = '';
        try {
            const call = await axios.post(process.env.NEXT_PUBLIC_API + '/api/qlc/Admin/getListReportErr');
            response = call;
        } catch (error) {
            response = error.response.data.error.message
        }

        return response;
    }
}

export default CallApi;