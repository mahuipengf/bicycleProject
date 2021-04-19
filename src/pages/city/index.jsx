import React,{Component} from 'react'
import { Card,Button,Input,Table,Form,Select,Modal ,message} from 'antd'
import axios from 'axios'
import Utils from './../../utils/utils'
import './mock/open_city'
import './mock/open'

export default class City extends Component{
    state={
        list:[],
        isShowOpenCity:false
    }
    componentDidMount(){
      this.requestList()
    }
    //默认请求
    params={
        page:1
    }
    requestList = () =>{
        let _this=this
        
    }
    //添加城市
      handleOpenCity = () =>{
          this.setState({
              isShowOpenCity:true
          })
      }
      handleSubmit = () => {
         let cityInfo=this.cityForm.props.form.getFieldsValue()
         console.log(cityInfo)
         axios({
             method:"get",
             url:"open.cjs"
            
         }).then((res)=>{
             if(res.data.code =="0"){
                  message.success(res.data.result)
                  this.setState({
                    isShowOpenCity:false
                  })
             }

         })
        }
      render(){
          const columns=[
              {
                title:"城市Id",
                dataIndex:"id"
             },
             {
                title:"城市名称",
                dataIndex:"name"
             },
             {
                title:"用车模式",
                dataIndex:"mode",
                render(mode){
                    return mode ==1?"禁停区":"停车区"
                }
             },
             {
                title:"营运模式",
                dataIndex:"op_mode",
                render(op_mode){
                    return op_mode ==1?"非法运营":"正规运营"
                }
             },
             {
                title:"授权加盟商",
                dataIndex:"franchisee_name"
             },
             {
                 title:"城市管理员",
                 dataIndex:"city_admins",
                 render(city_admins){
                      return city_admins.map(item=>{
                          return item.user_name
                      }).join(',')

                 }
             },
             {
                 title:"城市开通时间",
                 dataIndex:"open_time"
             },
             {
                 title:"操作时间",
                 dataIndex:"update_time"
             },
             {
                 title:"操作人",
                 dataIndex:'syc_user_name'
             }
            ]
          return (
              <div>
                  <Card >
                       <FilterForm/>
                  </Card>
                  <Card style={{marginTop:10}}>
                      <Button type="primary"  onClick={this.handleOpenCity}>开通城市</Button>
                  </Card>
                  <div className="content-wrap ">
                        <Table 
                                bordered
                                columns = {columns}
                                dataSource = {this.state.dataSource} 
                                pagination = {this.state.pagination}
                                />
                  </div>
                  <Modal
                      title="开通城市"
                      visible={this.state.isShowOpenCity}
                      onCancel={()=>{
                          this.setState({
                              isShowOpenCity:false
                          })
                      }}
                      onOk={this.handleSubmit}
                     >
                         <OpenCityForm  wrappedComponentRef={inst=>this.cityForm=inst }/>
                     </Modal>
              </div>
          )
      }
}
class FilterForm extends Component{
    render(){
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline">
                 <Form.Item label="城市">
                     {
                         getFieldDecorator("city_id")(
                             <Select placeholder="全部"
                             style={{width:100}}>
                                 <Select.Option value=" ">全部</Select.Option>
                                 <Select.Option value="1">北京市</Select.Option>
                                 <Select.Option value="2">天津市</Select.Option>
                                 <Select.Option value="3">深圳市</Select.Option>

                             </Select>
                         )
                     }
                 </Form.Item>
                 <Form.Item label="用车模式">
                     {
                         getFieldDecorator("mode")(
                             <Select placeholder="全部"
                             style={{width:140}}>
                                 <Select.Option value="">全部</Select.Option>
                                 <Select.Option value="1">指定停车点模式</Select.Option>
                                 <Select.Option value="2"> 禁停区模式</Select.Option>

                             </Select>
                         )
                     }
                 </Form.Item>
                 <Form.Item label="营运模式">
                     {
                         getFieldDecorator("op_mode")(
                             <Select placeholder="全部"
                             style={{width:100}}> 
                                 <Select.Option value="">全部</Select.Option>
                                 <Select.Option value="1">自营</Select.Option>
                                 <Select.Option value="2">加盟</Select.Option>

                             </Select>
                         )
                     }
                 </Form.Item>
                 <Form.Item label="加盟商授权状态">
                     {
                         getFieldDecorator("auth_status")(
                             <Select 
                                style={{width:100}}
                                placeholder="全部"> 
                                 <Select.Option value="">全部</Select.Option>
                                 <Select.Option value="1">已授权</Select.Option>
                                 <Select.Option value="2">未授权</Select.Option>

                             </Select>
                         )
                     }
                 </Form.Item>
                 <Form.Item>
                     <Button type="primary" style={{margin:"0 20px"}}>查询 </Button>
                     <Button >重置</Button>
                 </Form.Item>
            </Form>
        )
    }
}
FilterForm=Form.create({})(FilterForm)
class OpenCityForm extends Component{
       render(){
           const formItemLayout = {
               labelCol:{
                   span:5
               },
               wrapperCol:{
                   span:10
               }
           }
           let {getFieldDecorator} = this.props.form
           return (
               <Form layout="horizontal">
                   <Form.Item label="选择城市" {...formItemLayout}>
                       {
                           getFieldDecorator('city_id',{
                               initialValue:"1"
                           })(
                               <Select>
                                   <Select.Option value="" >全部</Select.Option>
                                   <Select.Option value="1">北京市</Select.Option>
                                   <Select.Option value="2">天津市</Select.Option>
                               </Select>
                           )
                       }
                         
                   </Form.Item>
                   <Form.Item label="营运模式" {...formItemLayout}>
                       {
                           getFieldDecorator('op_mode', {
                            initialValue:"1"
                           })(
                               <Select>
                                   <Select.Option value="" >自营</Select.Option>
                                   <Select.Option value="1">加盟</Select.Option>
                               </Select>
                           )
                       }
                        
                   </Form.Item>
                   <Form.Item label="用车模式" {...formItemLayout}>
                   {
                           getFieldDecorator('use_mode', {
                            initialValue:"1"
                           })(
                            <Select>
                            <Select.Option value="" >指定停车点</Select.Option>
                            <Select.Option value="1">禁停区</Select.Option>
                        </Select>
                           )
                       }
                         
                   </Form.Item>
               </Form>
           )
       }
}
OpenCityForm = Form.create({})(OpenCityForm)