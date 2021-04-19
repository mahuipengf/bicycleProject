import JsonP from 'jsonp'
import { Modal } from '_antd@3.26.20@antd'
import { getOverflowOptions } from '_antd@3.26.20@antd/lib/tooltip/placements'
import {Modal} from 'antd'
import axios from '_axios@0.21.1@axios'
export default class Axios {
    static jsonp(options){
       return  new Promise((reslove,reject)=>{
           JsonP(options.url,{
            param:'callback'
           },function(err,response){
            
        })
        })
    }
    static ajax(options){
        let baseApi = ""
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseYrk:baseApi,
                timeout:5000,
                params:(options.data &&options.data.params) || ''
            }).then((response)=>{
                if(response.status =="200"){
                  let res= response.data;
                  if(res.code =="0"){
                      resolve(res)
                  }else{
                      Modal.info({
                          title:"提示",
                          content:res.msg
                      })
                  }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}