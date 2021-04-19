import React, { Component } from 'react'
import {Button, Card,Checkbox,DatePicker,Form, Icon, Input, InputNumber, message,Radio, Select,Switch, TimePicker, Upload} from 'antd'
//var moment = require('moment');
import moment from 'moment'
const FormItem=Form.Item;
const RadioGroup=Radio.Group;
const Option =  Select.Option;
const TextArea = Input.TextArea;
class FormRegister extends Component {
    
  state = {
    loading:false,
  }

   getBase64 = (img, callback) =>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    beforeUpload = (file) =>{
        const isJPG = file.type ==='image/jpeg';
        if(!isJPG){
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size /1024/1024<2;
        if(!isLt2M){
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
        }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              userImg:imageUrl,
              loading: false,
            }),
          );
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,//屏幕尺寸小于576px 占24列 自己独占一行
                sm:4  //屏幕尺寸大于576 占4列
            },
            // 设置文本框占几列
            wrapperCol:{
                xs:24,
                sm:12
            }
        }

        const rowObject = {
            minRows:4,
            maxRows:6,
        }

        return (
            <div>
                <Card title="注册表单">
                  <Form layout="horizontal">
                        < FormItem label="用户名" {...formItemLayout}> 
                        {
                                getFieldDecorator('userName',{
                                    initialValue:'jack',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                    ],
                                })(
                                    <Input placeholder="请输入用户名"></Input>
                                )
                                
                            }
                         </FormItem>
                         < FormItem label="密码" {...formItemLayout}> 
                        {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'密码不能为空'
                                        },
                                    ],
                                })(
                                    <Input placeholder="请输入密码"></Input>
                                )
                                
                            }
                         </FormItem>
                         < FormItem label="性别" {...formItemLayout}> 
                        {
                                getFieldDecorator('sex',{
                                    initialValue:'1',
                                })(
                                   <RadioGroup>
                                       <Radio value="1">男</Radio>
                                       <Radio value="2">女</Radio>
                                   </RadioGroup> 
                                )
                                
                            }
                         </FormItem>
                         < FormItem label="年龄" {...formItemLayout}> 
                        {
                                getFieldDecorator('age',{
                                    initialValue:'18',
                                  
                                })(
                                 <InputNumber></InputNumber>
                                )
                                
                            }
                         </FormItem>
                         < FormItem label="当前状态" {...formItemLayout}> 
                        {
                                getFieldDecorator('state',{
                                    initialValue:'2',
                                  
                                })(
                                 <Select>
                                    <Option value="1">咸鱼一条</Option>
                                    <Option value="2">风华浪子</Option>
                                    <Option value="3">咸鱼一条</Option>
                                    <Option value="4">咸鱼一条</Option>
                                    <Option value="5">咸鱼一条</Option>
                                    
                                 </Select>
                                )
                                
                            }
                         </FormItem>
                         < FormItem label="爱好" {...formItemLayout}> 
                        {
                                getFieldDecorator('hobby',{
                                    initialValue:['2','3','10']
                                  
                                })(
                                 <Select mode="multiple">
                                    <Option value="1">钓鱼</Option>
                                    <Option value="2">游泳</Option>
                                    <Option value="3">放风筝</Option> 
                                    <Option value="4">捉泥鳅</Option>
                                    <Option value="5">写诗</Option>
                                    <Option value="6">唱歌</Option>
                                    <Option value="7">看电影</Option>
                                    <Option value="8">逛街</Option>
                                    <Option value="9">Gime</Option>
                                    <Option value="10">打篮球</Option>
                                    
                                 </Select>
                                )
                                
                            }
                         </FormItem>
                         < FormItem label="是否已婚" {...formItemLayout}> 
                        {
                                getFieldDecorator('isMarried',{
                                    valuePropName:'checked',
                                    initialValue:true,
                                  
                                })(
                                  <Switch/>
                                )
                                
                            }
                         </FormItem>
                         < FormItem label="生日" {...formItemLayout}> 
                        {
                                getFieldDecorator('birthday',{
                                    valuePropName:'checked',
                                    initialValue:moment('2021-04-16 20:13'),
                                    
                                })(
                                  <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH：mm:ss"
                            
                                  />
                                  
                                )
                                
                            }
                         </FormItem>

                         < FormItem label="联系地址" {...formItemLayout}> 
                        {
                                getFieldDecorator('address',{   
                                })(
                                  
                                  <TextArea
                                  autosize={rowObject}
                                  />
                                )
                                
                            }
                         </FormItem>

                         < FormItem label="早起时间" {...formItemLayout}> 
                        {
                                getFieldDecorator('time',{ 
                                    initialValue:""
                                   
                                })(
                                 <TimePicker/> 
                                 
                                )
                                
                            }
                         </FormItem>

                         < FormItem label="头像" {...formItemLayout}> 
                        {
                                getFieldDecorator('userImg')(
                                <Upload
                                action="//https://www.mocky.io/v2/5cc8019d300000980a055e76/"
                                listType="picture-card"
                                showUploadList={true}
                                onChange={this.handleChange}
                                >
                                     {this.state.userImg?<img alt="" src={this.state.userImg}/>:<Icon type="plus"/>}
                                </Upload>
                                
                                 
                                )
                                
                                
                            }
                         </FormItem>
                  </Form>
                </Card>
               
    
            </div>
        )
    }
}
export default Form.create()(FormRegister);