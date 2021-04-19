import React,{ Component } from 'react'
import { Card,Button,DatePicker,Modal, Form,Input,Radio,Select} from 'antd'
import axios    from 'axios'
import Utils from '../../utils/utils'
import ETable from '../../components/ETable'
import './mock/mock1'
import BaseForm from '../../components/BaseForm'
import '../../style/common.less'
import moment from 'moment'
export default class User  extends Component{
    state = {
          isVisble:false
    }
    parmas = {
        page :1
    }
    formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名称',
        },{
            type:'INPUT',
            label:'用户名',
            field:'user_mobile',
            placeholder:'请输入手机号',
        },{
            type:'DATE',
            label:'请选择入职日期',
            field:'user_date',
            placeholder:'请输入日期'
        }
     ]
     componentDidMount = () =>{
         this.handleFilter()
         console.log("获取真实的dom对象",this.refs.input)
     }
     handleFilter = () =>{
         this.requestList()

     }
     //添加或删除
     handleOperate = (type) =>{
        //功能操作区
         let item=this.state.selectedItem
         if(type=="create"){
             this.setState({
                 type,
                 isVisible:true,
                 title:"创建员工"
             })
         }else if(type == 'edit'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:'请选择一个员工'
                })
                return
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userInfo:item
            })
        }else if(type == 'detail'){
            
            this.setState({
                type,
                isVisible:true,
                title:'员工详情',
                userInfo:item
            })
        }else{
            if(!item){
                Modal.info({
                    title:"提示",
                    content:'请选择一个员工'
                })
                return
            }
            let _this=this
            Modal.confirm({ 
                title:"确认删除", 
                content:"是否要删除",
                onOk(){
                    axios({ 
                        method:"post",
                        url:"list1.php",
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        if(res.status=="200"){
                            _this.setState({
                                isVisible:false
                            })
                            _this.requestList()
                        }
                    })
                }  })
        }
        
     }
     //创建员工提交
     handleSubmit = () => {
         let type = this.state.type
         console.log("出来瞧一瞧啊",this.userForm)
         let data =this.userForm.props.form.getFieldsValue()
         axios({ 
             method:"post",
             url:"list1.php",
             data:{
                 params:data
             }
         }).then(res=>{
             if(res.status=="200"){
                 this.setState({
                     isVisible:false
                 })
                 this.requestList()
             }
         })
     }
        requestList = () =>{
            let _this = this
            axios({
                method:"post",
                url:"list1.php",
                data:{
                    params:this.parmas
                }
            }).then((res)=>{
                if(res.status==200){
                    this.setState({
                        dataSource1:res.data.result.list,
                        pagination:Utils.pagination(res.data,current =>{
                            _this.params.page=current
                            this.requestList()
                        })
                    })
                }
            })
        }
    render(){
        const columns = [{
            title:'id',
            dataIndex:'id'
        },{
            title:'用户名',
            dataIndex:'userName'
        },{
            title:'性别',
            dataIndex:'sex',
            render(sex){
                return sex==1?'男':'女'
            }
        },{
            title:'状态',
            dataIndex:'state',
            render(state){
                return {
                    1:"咸鱼一条",
                    2:"风华浪子",
                    3:"无风不浪",
                    4:"浪里格朗",
                    5:"感叹生命苦短",
                    6:"风情水暖鸭先知",
                    7:"呀呀呀趋向线天鹅",
                    8:"老铁666啊"
                }[state]
            }
        },{
            title:'爱好',
            dataIndex:'interest',
            render(state){
                return {
                    1:"游泳",
                    2:"篮球",
                    3:"吉他",
                    4:"民族舞",
                    5:"古萧萧",
                    6:"点点风光",
                    7:"dance",
                    8:"人生苦短累"
                }[state]
            }
        },{
            title:'生日',
            dataIndex:'birthday'
        },{
            title:'联系地址',
            dataIndex:'address'
        },{
            title:'早起时间',
            dataIndex:'time'
        }]
        let footer ={}
        if(this.state.type=='detail'){
            footer = {
                footer:null
            }
        }
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList }  filterSubmit={this.handleFilter}>
                        
                    </BaseForm>
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" style={{marginLeft:10}} 
                      onClick={()=>this.handleOperate('delete')}
                    >删除员工</Button>
                </Card>
                <div className="content-wrap">
                                 
                                <ETable
                                   updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                                   columns = {columns}
                                   dataSource = {this.state.dataSource1}
                                    pagination = {this.state.pagination}
                                    selectedItem = {this.state.selectedItem}
                                    selectedRowKeys = {this.state.selectedRowKeys} 
                                    // rowSelection={false }
                                    />
                </div>
                <Modal
                   title={this.state.title}
                   visible={this.state.isVisible}
                   onOk={this.handleSubmit}
                   {...footer}
                   onCancel={()=>{
                       this.setState({
                           isVisible:false
                       })
                   }}
                   width={600} >
                       <UserForm userInfo={this.state.userInfo} type={this.state.type}  wrappedComponent={(inst)=>this.userForm=inst} />
                   </Modal>

                   

            </div>
        )
    }
}

class UserForm extends Component{
    getState = (state) =>{
        return {
            1:"咸鱼一条",
            2:"风华浪子",
            3:"无风不浪",
            4:"浪里格朗",
            5:"感叹生命苦短",
            6:"风情水暖鸭先知",
            7:"呀呀呀趋向线天鹅",
            8:"老铁666啊"
        }[state]
    }
    render(){
        console.log(this.props)
        let type = this.props.type
        let userInfo = this.props.userInfo
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
                labelCol:{span:5},
                wrapperCol:{span:19}
        }
        return (
            <Form layout="horizontal">
                  <Form.Item label="用户名" {...formItemLayout} >
                           {
                               type=="detail"?userInfo.userName:
                               getFieldDecorator(('user_name'),{
                                   initialValue:userInfo.userName
                               })(
                                   <Input type="text" placeholder="请输入用户名" />
                               )
                           }
                  </Form.Item>
                 
                   <Form.Item {...formItemLayout} label="性别" >
                            {
                                type=="detail"?userInfo.sex==1?'男':'女':
                                getFieldDecorator(('sex'),{
                                    initialValue:userInfo.sex==1?'男':'女'
                                })(
                                    <Radio.Group>
                                        <Radio value="1" >男</Radio>
                                        <Radio value="2" >女</Radio>
                                    </Radio.Group>
                                )
                            }
                    </Form.Item> 
                    <Form.Item  label="状态" {...formItemLayout} >
                            {
                                type=="detail"?this.getState(userInfo.state):
                                getFieldDecorator(('state'),{
                                    initialValue:userInfo.state
                                })(
                                    <Select>
                                          <Select.Option value="0">全部</Select.Option>
                                          <Select.Option value="1">每日一说</Select.Option>
                                          <Select.Option value="2">看透时光</Select.Option>
                                          <Select.Option value="3">梦前进</Select.Option>
                                         <Select.Option value="4">热点更新</Select.Option>
                                    </Select>
                                )
                            }
                           
                    </Form.Item>  
                    <Form.Item  label="生日" {...formItemLayout} >
                            {
                               type=="detail"?userInfo.birthday:
                                getFieldDecorator(('birthday'),{
                                    initialValue:moment(userInfo.birthday)
                                })(
                                    <DatePicker
                                    showTime={true}
                                    />
                                )
                            }
                           
                    </Form.Item>  
                    <Form.Item  label="联系地址" {...formItemLayout} >
                            {
                                type=="detail"?userInfo.address:
                                getFieldDecorator(('address'),{
                                    initialValue:userInfo.address
                                })(
                                    <Input.TextArea placeholder="请输入地址"  />
                                )
                            }
                           
                    </Form.Item>    
                  
            </Form>
        )
    }
}
UserForm=Form.create({})(UserForm)
