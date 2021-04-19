import React,{Component} from 'react'
import moment from 'moment'
import { Card,Icon,Form,Button,Checkbox,Input,Radio,Select,Switch,DatePicker,TimePicker,Upload,message,InputNumber} from 'antd'

class Regisiters extends Component {
    state = {}
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
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
      };
      handleSubmit = () =>{
          let userInfo = this.props.form.getFieldsValue()
          console.log(JSON.stringify("asdasd"+userInfo))
          message.success(`${userInfo.userName}恭喜你，已经通过学习这次本次React高级课程，密码：${userInfo.userPwd}`)
      }
    render(){
        const Option = Select.Option
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        console.log(getFieldDecorator)
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal" >
                          <Form.Item label="账户" {...formItemLayout}>
                                {
                                    getFieldDecorator('userName',{
                                        initialValue:"MALstart",
                                        rules:[
                                            {
                                                required:true,
                                                message:'用户名不能为空'
                                            }
                                        ]
                                    })(
                                        <Input  placeholder="plase actton number"/>
                                    )
                                }
                          </Form.Item>
                          <Form.Item label="密码"{...formItemLayout}>
                                {
                                    getFieldDecorator('userPwd',{
                                        initialValue:""    
                                    })(
                                        <Input  placeholder="plase actton password"/>
                                    )
                                }
                          </Form.Item>
                          <Form.Item label="性别"{...formItemLayout}>
                                {
                                    getFieldDecorator('sex',{
                                        initialValue:"1"    
                                    })(
                                        <Radio.Group>
                                            <Radio value="1">男</Radio>
                                            <Radio value="2">女</Radio>
                                        </Radio.Group>
                                    )
                                }
                          </Form.Item>
                          <Form.Item label="年龄"{...formItemLayout}>
                                {
                                    getFieldDecorator('age',{
                                        initialValue:"18"    
                                    })(
                                        <InputNumber/>
                                    )
                                }
                          </Form.Item>
                          <Form.Item label="当前状态"{...formItemLayout}>
                                {
                                    getFieldDecorator('state',{
                                        initialValue:"1"    
                                    })(
                                        <Select>
                                            <Option value="1">一条咸鱼</Option>
                                            <Option value="2">萝卜青菜</Option>
                                            <Option value="3">各有所爱</Option>
                                            <Option value="4">青春努力的动力</Option>
                                            <Option value="5">不断的向前冲刺</Option>
                                        </Select>
                                    )
                                }
                          </Form.Item>
                          <Form.Item label="兴趣爱好"{...formItemLayout}>
                                {
                                    getFieldDecorator('hobbys',{
                                        initialValue:["1","7","5"]   
                                    })(
                                        <Select mode="multiple">
                                            <Option value="1">游泳</Option>
                                            <Option value="2">吉他</Option>
                                            <Option value="3">兴趣</Option>
                                            <Option value="4">唱歌</Option>
                                            <Option value="5">古典舞</Option>
                                            <Option value="6">民族舞</Option>
                                            <Option value="7">美声</Option>
                                            <Option value="8">现代舞</Option>
                                            <Option value="9">跆拳道</Option>
                                            <Option value="10">散打</Option>
                                            <Option value="11">足球</Option>
                                            <Option value="12">摄影</Option>
                                            <Option value="13">读文</Option>
                                            <Option value="14">人生</Option>
                                        </Select>
                                    )
                                }
                          </Form.Item>
                          <Form.Item label="是否已婚"{...formItemLayout}>
                                {
                                    getFieldDecorator('isMarred',{
                                        valuePropName:"checked",
                                        initialValue:true
                                    })(
                                        <Switch />
                                        )
                                }
                          </Form.Item> 
                          <Form.Item label="出生日期"{...formItemLayout}>
                                {
                                    getFieldDecorator('happly',{
                                        initialValue:moment("2021-03-28 12:00:16")
                                    })(
                                        <DatePicker
                                           showTime
                                           format="YYYY-MM-DD HH:mm:ss"
                                        />
                                        )
                                }
                          </Form.Item> 
                          <Form.Item label="联系地址"{...formItemLayout}>
                                {
                                    getFieldDecorator('address',{
                                        initialValue:moment("河北唐山公园总部")
                                    })(
                                       <Input.TextArea
                                       altoSize={{  minRows:4,maxRows:6 }}
                                       />
                                        ) 
                                }
                          </Form.Item> 

                          <Form.Item label="早起时间"{...formItemLayout}>
                                {
                                    getFieldDecorator('time')(
                                       <TimePicker
                                       showTime
                                       format="YYYY-MM-DD HH:mm:ss "
                                       />
                                        )   
                                }
                          </Form.Item> 
                          <Form.Item label="头像"{...formItemLayout}>
                                {
                                    getFieldDecorator('userImg')(
                                       <Upload
                                         listType="picture-card"
                                         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                         showUploadList={true}
                                         onChange={this.handleChange}
                                       >
                                       {this.state.userImg?<img src={this.state.userImg} />:<Icon type="plus"/> }
                                       </Upload>
                                        )   
                                }
                          </Form.Item> 
                          <Form.Item {...offsetLayout}>
                                {
                                    getFieldDecorator('userImg',{
                                        initialValue:true
                                    })(
                                      <Checkbox
                                      checked={true}
                                      >我已阅读过<a href="#">慕课协议</a></Checkbox>
                                        )   
                                }
                          </Form.Item> 
                          <Form.Item {...offsetLayout}>
                                {
                                    getFieldDecorator('userImg')(
                                        <Button type="primary"
                                          onClick={this.handleSubmit}
                                        >注册</Button>
                                        )   
                                }
                          </Form.Item> 
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Regisiters)