import React,{ Component } from 'react'
import { Input,Select,Form,Button,Checkbox,Radio,DatePicker} from 'antd'
import utils from '../../utils/utils'

class FilterForm extends Component{
    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue()
        this.props.filterSubmit(fieldsValue)
    }
    reset = () =>{
        //resetFields  重置组件
        this.props.form.resetFields()
    }
    initFormList = () =>{
        const { getFieldDecorator } = this.props.form
        const formList = this.props.formList
        const formItemList = []
         if(formList && formList.length>0){
            formList.forEach((item,index)=>{
                let label = item.label
                let field = item.field
                let initialValue = item.initialValue ||''
                let placeholder = item.placeholder
                let width = item.width
                let list = item.list

                if(item.type == '城市'){
                    const city = <Form.Item label="城市" key={field}>
                    {
                        
                        getFieldDecorator('city',{
                            initialValue:0 
                         })(
                             <Select placeholder={placeholder}
                             style={{width: 80}}
                             >
                                { utils.getOptionList([{id:0,name:'全部'},{id:1,name:'北京'},{id:2,name:'上海'},{id:3,name:'天津'},{id:4,name:'杭州'}])}

                             </Select>
                         )  
                        
                    }
                   </Form.Item>
                   formItemList.push(city)
               
                 }else if(item.type == '时间查询'){
                    const begin_time = <Form.Item label="订单时间" key={field}>
                    {
                        getFieldDecorator('begin_time',{
                            initialValue:initialValue
                        })(
                            <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" type="text" placeholder="请选择开始时间" />
                        )
                    }
                   </Form.Item>
                   formItemList.push(begin_time)
                   const ent_time = <Form.Item label="~" colon={false} key={field}>
                    {
                        getFieldDecorator('ent_time',{
                            initialValue:initialValue
                        })(
                            <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" type="text" placeholder="请选择结束时间按" />
                        )
                    }
                   </Form.Item>
                   formItemList.push(ent_time)
               
                 }else if(item.type =='INPUT'){
                    const INPUT = <Form.Item label={  label } key={field}>
                     {
                         getFieldDecorator([field],{
                             initialValue:initialValue
                         })(
                             <Input type="text" placeholder={placeholder} />
                         )
                     }
                    </Form.Item>
                    formItemList.push(INPUT)
                }else if(item.type =='SELECT'){
                    const SELECT = <Form.Item label={  label } key={field}>
                     {
                         getFieldDecorator([field],{
                            initialValue:initialValue
                         })(
                             <Select placeholder={placeholder}
                             style={{width: width}}>
                                { utils.getOptionList(list)}

                             </Select>
                         )
                     }
                    </Form.Item>
                    formItemList.push(SELECT)
                }else if(item.type =='CHECKBOX'){
                    const CHECKBOX = <Form.Item label={  label } key={field}>
                     {
                         getFieldDecorator([field],{
                             valuePropsName:'checked',
                             initialValue:initialValue  //这里必须是true false
                         })(
                            <Checkbox>
                                {label}
                            </Checkbox>
                         )
                     }
                    </Form.Item>
                    formItemList.push(CHECKBOX)
                }else if(item.type =='DATE'){
                    const data = <Form.Item label={  label } key={field}>
                     {
                        getFieldDecorator([field],{
                            initialValue:initialValue
                        })(
                            <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" type="text" placeholder="请选择结束时间按" />
                        )
                    }
                    </Form.Item>
                    formItemList.push(data)
                }
            })
        }
        return formItemList
    }
    render(){
        return (
            <Form layout="inline">
                {this.initFormList()}
                <Form.Item>
                     <Button type="primary" style={{margin:"0 20px"}} onClick={this.handleFilterSubmit}>查询 </Button>
                     <Button onClick={this.reset}>重置</Button>
                 </Form.Item>
            </Form>
        )
    }
}
export default FilterForm = Form.create({})(FilterForm)