import React, { Component } from 'react';
import { Card,Button,Form,Select,Input ,Modal,Transfer,Switch,Tree}  from 'antd'
import ETable from '../../components/ETable'
import Utils from '../../utils/utils'
import axios from 'axios'
import './mock/list'
import './mock/user_list'
import menuConfig from '../../config/menuConfig'
export default class PermissionUser extends Component {
    state={
        isRoleVisible:false,
        isPermVisible:false,
        isUserVisible:false
    }
    componentWillMount(){
        this.requestList()
    }
    requestList = () =>{
        axios({
            method:"get",
            url:"/role/list.json"
            
        }).then(res=>{
                     if(res.data.code===0){
                        this.setState({
                            dataSource:res.data.result.item_list
                        })
                     }
            
        })
    }
    handleRoleShow = () =>{
        this.setState({
            isRoleVisible:true
        })
    }
    //创建角色
    handleRoleSubmit = ()=>{
        let data = this.roleForm.props.form.getFieldsValue()
        axios({
            method:"get",
            url:'/api/role/create.json',
            data:{
                params:data
            }
        }).then(res=>{
            if(res.data.code=="0"){
                this.setState({
                    isRoleVisible:false
                })
                this.requestList()
            }
        })
    }
    //权限设置
    handlePermission = () =>{
        let item = this.state.selectedItem  
        if(!item){
           return Modal.info({
                 title:'请选择一个角色'
            })
        }
        this.setState({
            isPermVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }
    //提交数据
    handlePermEditSubmit = () =>{
        let data = this.permForm.props.form.getFieldsValue()
        data.role_id=this.state.selectedItem.id
        data.menus = this.state.menuInfo
            this.setState({
                isPermVisible:false  
            })
            this.requestList()
    }
    //用户授权
    handleUserAuth = () =>{
        let item = this.state.selectedItem  
        if(!item){
           return Modal.info({
                 title:'请选择一个用户授权'
            })
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
        this.getRoleUserList(item.id)
    }
    getRoleUserList = (id) =>{
        axios({
            method:"get",
            url:'ads/api/role/user_list.json',
            data:{
                params:{
                    id
                }
            }
        }).then(res=>{
           
            if(res){
                this.getAuthUserList(res.data.result)
            }
        })
    }
    //筛选数据
    getAuthUserList = (dataSource)=>{
      const mockData = []
      const targetKeys = []
      for(let i=0;i<dataSource.length;i++){
          const data = {
              key:dataSource[i].user_id,
              title:dataSource[i].user_name,
              status:dataSource[i].status 
          }
          mockData.push(data)
          if(data.status==1){
              targetKeys.push(data.key)
          }
        
      }
      this.setState({
        mockData,targetKeys
      })
    }
    render() { 
        const columns = [{
            title:'角色ID',
            dataIndex:'id'
        },{
            title:'角色名称',
            dataIndex:'role_name'
        },{
            title:'创建时间',
            dataIndex:'create_time',
            render(times){
                return Utils.formateDate(times)
            }
        },{
            title:'使用状态',
            dataIndex:'status',
            render(status){
                return status ==0?'启用':'停用'
            }
        },{
            title:'授权时间',
            dataIndex:'authorize_time',
            render(time){
                return Utils.formateDate(time)
            }
        },{
            title:'授权人',
            dataIndex:'authorize_user_name',
        }]
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRoleShow} >创建角色</Button>
                    <Button type="primary" style={{margin:"0px 20px"}} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                      <ETable  
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        dataSource={this.state.dataSource}
                        columns={columns}   />
                </div>
                <Modal 
                   title="创建角色"
                   visible={this.state.isRoleVisible }
                   onOk={this.handleRoleSubmit}
                   onCancel={()=>{
                    this.roleForm.props.form.resetFields()
                       this.setState({
                           isRoleVisible:false
                       })
                   }} 
                    >
                   <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst}></RoleForm>

                </Modal>
                <Modal 
                    title="权限设置"
                    visible={this.state.isPermVisible}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>this.setState({isPermVisible:false}) }
                        >
                    <PermEditForm
                      wrappedComponentRef = {(inst)=>this.permForm=inst}
                      detailInfo={this.state.detailInfo}
                      menuInfo = {this.state.menuInfo}
                      patchMenuInfo={(checkedKeys=>{
                          this.setState({
                                menuInfo:checkedKeys
                          })
                      })}
                    ></PermEditForm>
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>this.setState({isUserVisible:false}) }
                >
                     <RoleAuthForm
                      wrappedComponentRef = {(inst)=>this.userAuthForm=inst}
                      detailInfo={this.state.detailInfo}
                      targetKeys = {this.state.targetKeys}
                      mockData = {this.state.mockData}
                      pathUserInfo={(targetKeys)=>{
                          this.setState({
                              targetKeys
                          })
                      }}
                    ></RoleAuthForm>
                </Modal>
                
            </div>
        );
    }
}
;
class RoleForm extends Component{
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
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
                labelCol:{span:5},
                wrapperCol:{span:19}
        }
        return (
            <Form layout="horizontal">
                  <Form.Item label="角色名称" {...formItemLayout} >
                           {
                               getFieldDecorator(('role_name'),{
                               })(
                                   <Input type="text" placeholder="请输入角色名称" />
                               )
                           }
                  </Form.Item>
                 
                   
                    <Form.Item  label="状态" {...formItemLayout} >
                            {
                                getFieldDecorator(('status'),{
                                })(
                                    <Select>
                                          <Select.Option value="0">开启</Select.Option>
                                          <Select.Option value="1">关闭</Select.Option>
                                    </Select>
                                )
                            }
                           
                    </Form.Item>  
                  
            </Form>
        )
    }
}
RoleForm=Form.create({})(RoleForm)
class PermEditForm extends Component{
    renderTreeNodes = (data) =>{
        return  data.map(item=>{
             if(item.children){
                 return <Tree.TreeNode title={item.title} key={item.key}>
                      {this.renderTreeNodes(item.children)}
                 </Tree.TreeNode>
             }else{
                 return <Tree.TreeNode title={item.title} key={item.key} />
             }
         })
    }
    onCheck = (checkedKeys) =>{
           this.props.patchMenuInfo(checkedKeys)
    }
    render(){
        let {getFieldDecorator} = this.props.form
         const formItemLayout = {
                labelCol:{span:5},
                wrapperCol:{span:19}
        }
        const detail_info = this.props.detailInfo
        const menuInfo = this.props.menuInfo
        return(
            <div>
                <Form layout="horizontal" >
                    <Form.Item label="角色名称" {...formItemLayout}>
                           <Input disabled placeholder={detail_info.role_name} />
                    </Form.Item>
                    <Form.Item label="状态" {...formItemLayout}>
                        {
                            getFieldDecorator("status",{
                                initialValue:"1"
                            })(
                                <Select>
                                    <Select.Option value="0">禁用</Select.Option>
                                    <Select.Option value="1">启用</Select.Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Tree
                     checkable
                     defaultExpandAll
                     onCheck={(checkedKeys)=>{
                         this.onCheck(checkedKeys)
                     }}
                     checkedKeys={menuInfo}
                    >
                    <Tree.TreeNode title="平台权限" key="platform_all">
                          {this.renderTreeNodes(menuConfig)}
                    </Tree.TreeNode>
                </Tree>
                </Form>
            </div>
        )
    }
}
PermEditForm=Form.create({})(PermEditForm)
class RoleAuthForm extends Component{
    handleChange = (targetKeys)=>{
           this.props.pathUserInfo(targetKeys)
    }
    onCheck = (checkedKeys) =>{
           this.props.patchMenuInfo(checkedKeys)
    }
    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;
    render(){
        let {getFieldDecorator} = this.props.form
         const formItemLayout = {
                labelCol:{span:5},
                wrapperCol:{span:19}
        }
        const detail_info = this.props.detailInfo
        const targetKeys = this.props.targetKeys
        const mockData = this.props.mockData
        return(
            <div>
                <Form layout="horizontal" >
                    <Form.Item label="角色名称" {...formItemLayout}>
                           <Input disabled placeholder={detail_info.role_name} />
                    </Form.Item>
                    <Form.Item label="选择用户" {...formItemLayout}>
                            <Transfer
                                listStyle={{width:200,height:400}}
                                dataSource={mockData}
                                showSearch
                                searchPlaceholder="请输入用户名"
                                filterOption={this.filterOption} 
                                targetKeys={targetKeys}
                                render={item => item.title}
                                onChange={this.handleChange}
                                />
                    </Form.Item>
                    
                </Form>
            </div>
        )
    }
}
RoleAuthForm=Form.create({})(RoleAuthForm)