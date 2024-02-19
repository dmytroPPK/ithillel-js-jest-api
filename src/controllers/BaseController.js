const axios = require("axios");

class BaseController{
    constructor(){
        this.options = {
            baseURL: process.env.BASE_URL,
            validateStatus: (status)=>{
                return true;
            },
        };
        this.client = axios.create(this.options);
    }

    async login(){
        let authResponce = await axios.post(`${process.env.BASE_URL}/auth/signin`,{
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASS,
            remember: false,
        });

        let sid = authResponce.headers["set-cookie"][0].split(";")[0];
        this.options.headers = {Cookie: sid};
    }

    get(url){
        return this.client.get(url, this.options);
    }

    post(url, payload){
        return this.client.post(url, payload, this.options);
    }

    put(url, payload){
        return this.client.put(url, payload, this.options);
    }

    delete(url){
        return this.client.delete(url, this.options)
    }
}

module.exports = {
    BaseController,
}