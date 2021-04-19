import React,{ Component } from 'react'
import { Card, Form,Input,Button,message,Icon,Checkbox } from 'antd'
 class Forms extends Component{
    
     handleSubmit = () =>{
         //getFieldsValue  如果传值只获取传值的  如果不穿值或获取getFiledDecorator里面的初始化得值
         let  userInfo = this.props.form.getFieldsValue()
         //validateFields 生成校验规则  errors如果里面没
          this.props.form.validateFields((errors,values)=>{
              if(!errors){
                  message.success(`${userInfo.userName}恭喜你，已经通过学习这次本次React高级课程，密码：${userInfo.userPwd}`)
              } 
          })
        }
    render(){
        const { getFieldDecorator } = this.props.form
        // console.log(this.props.form)
        return (
            <div>
                <Card title="登入行内表单">
                    <Form layout="inline">
                        <Form.Item>
                            <Input placeholder="请输入账户" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">按钮</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="登入水平表单">
                      <Form  style={{width:"300px"}}>
                           <Form.Item>
                               {
                                   getFieldDecorator('userName',{
                                       initialValue: '',
                                       rules:[
                                           {
                                               required:true,
                                               message:"用户名不能为空"
                                           },{
                                               min:5,
                                               max:10,
                                               message:"密码长度为5~10个单位"
                                           },{
                                            // pattern:/^\w+$/g,
                                            pattern:new RegExp('^\\w+?$','g'),
                                            message:"请输入字母或数字"
                                        }
                                       ]
                                   })(
                                    <Input prefix={<Icon type="user" />} placeholder="please enter you account number" />
                                   )
                               }
                                
                           </Form.Item>
                           <Form.Item>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required:true,
                                            message:"用户密码不能为空"
                                        },{
                                            min:5,
                                            max:10,
                                            message:"密码长度为5~10个单位"
                                        }
                                    ]
                                })(
                                    <Input prefix={ <Icon type="lock" /> } placeholder="please enter you account number password" />
                                )
                            }
                               
                           </Form.Item>
                           <Form.Item>
                            {
                                getFieldDecorator('rember', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                    rules: [
                                        {
                                            required:true,
                                            message:"用户密码不能为空"
                                        } 
                                    ]
                                })(
                                    <Checkbox >记住密码</Checkbox>
                                    
                                )
                               
                            }
                                <a style={{float:"right"}}>忘记密码</a>
                           </Form.Item>
                           <Form.Item>
                               <Button onClick={()=>this.handleSubmit()}>登入</Button>
                           </Form.Item>
                      </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Forms)
