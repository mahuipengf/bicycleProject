import React,{Component} from 'react'
import  {Card,Button,Input,Table,Form,Select,Modal ,message,DatePicker} from 'antd'
import axios from 'axios'
import Utils from './../../utils/utils'
import "../../style/common.less"
import './mock/data1'
import './mock/cancel'
import BaseForm from '../../components/BaseForm'
import ETable from './../../components/ETable'
export default class Order extends Component{
    state = {
        orderInfo:{},
        orderConfirmVisble:false,
    }
    params={
        page:1
    }
    formList = [{
        type:'SELECT',
        label:'城市',
        field:'city',
        placeholder:'全部',
        initialValue:1,
        width:100,
        list:[
            {
                id:0,
                name:'全部'
            },{
                id:1,
                name:'北京'
            },{
                id:2,
                name:'天津'
            },{
                id:3,
                name:'上海'
            }
        ]
    },
    {
       type:"时间查询"
    },
    // {
    //     type:'INPUT',
    //     label:'模式',
    //     field:'mode',
    //     placeholder:'请输入模式',
    //     width:'100'
    // },
    {
        type:'SELECT',
        label:'订单状态',
        field:'order_status',
        placeholder:'全部',
        initialValue:1,
        width:100,
        list:[
            {
                id:0,
                name:'全部'
            },{
                id:1,
                name:'进行中'
            },{
                id:2,
                name:'进行中(....)'
            },{
                id:3,
                name:'结束行程'
            }
        ]
    }]
    componentDidMount(){
        this.requestList()
    }
    handleFilter = (params) =>{
        this.params = params
        this.requestList()
    }
    requestList = () =>{
        let _this = this
        axios({
            method:"post",
            url:"order.php",
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res.status==200){
                this.setState({
                    dataSource1:res.data.result.item_list,
                    pagination:Utils.pagination(res.data,current =>{
                        _this.params.page=current
                        this.requestList()
                    })
                })
            }
        })
    }
   
    handleOrderFinish = () =>{
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title:"信息",
                content:"请选择一条信息"
            })
            return ;
        }
        axios({
            method:"post",
            url:"cancel.php",
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            if(res.status==200){
                this.setState({
                   orderInfo:res.data.result
                })
            }
        })
        this.setState({
            orderConfirmVisble:true
        })

    }
    //结束订单
    handleFinishOrder = () =>{
        
        axios({
            method:"post",
            url:"cancel.php",
            data:{
                params:this.params.page
            }
        }).then((res)=>{
            if(res.status==200){
                message.success("订单结束成功")
                this.setState({
                    orderConfirmVisble:false
                    
                })
                this.requestList( )
            }
        })
       
    }
    onRowClick = (record,index) =>{
        let selectKey = [index];
       
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    //订单详情
    openOrderDetail = () =>{
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title:"信息",
                content:"请先选择一条订单"
            })
            return ;
        }
        window.open( `/common/order/detail/${item.id}`,'_blank')
    }
    render (){
        const columns = [
            {
                title:"订单编号",
                dataIndex:"order_sn"
            },
            {
                title:"车辆编号",
                dataIndex:"bike_sn"
            },
            {
                title:"手机号",
                dataIndex:"mobile"
            },
            {
                title:"里程",
                dataIndex:"distance",
                render(distance){
                    return Math.ceil(distance/1000)+"km"
                }
            },
            {
                title:"行驶时长",
                dataIndex:"total_time"
            },
            {
                title:"状态",
                dataIndex:"status"
            },
            {
                title:"开始时间",
                dataIndex:"start_time"
            },
            {
                title:"结束时间",
                dataIndex:"end_time"
            },
            {
                title:"订单金额",
                dataIndex:"total_fee"
            },
            {
                title:"实付金额",
                dataIndex:"user_pay"
            }
        ]
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        const {selectedRowKeys} = this.state
        const rowSelection={
            type:"radio",
            selectedRowKeys
        }
        return (
            <div>
                <Card>
                   <BaseForm formList = { this.formList}
                   filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:10}} 
                      onClick={this.handleOrderFinish}
                    >结束订单</Button>
                </Card>
                <div className="content-wrap">
                                 
                                <ETable
                                   updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                                   columns = {columns}
                                   dataSource = {this.state.dataSource1}
                                    pagination = {this.state.pagination}
                                    selectedIds = {this.state.selectedIds}
                                    selectedItem = {this.state.selectedItem}
                                    selectedRowKeys = {this.state.selectedRowKeys} 
                                    rowSelection='checkbox'
                                    />
                                
                               {/* <Table
                               
                                  bordered
                                  columns = {columns}
                                  dataSource = {this.state.dataSource1} 
                                  pagination = {this.state.pagination}
                                  rowSelection={rowSelection}
                                  onRow={(record,index) => {
                                    return {
                                      onClick: event => {
                                          this.onRowClick(record,index)
                                      }, // 点击行
                                    }
                                  }
                                }
                               /> */}
                               
                </div>
                <Modal
                   title="结束订单"
                   visible={this.state.orderConfirmVisble}
                   onCancel={()=>{
                       this.setState({
                           orderConfirmVisble:false
                       })
                   }}
                   onOk={this.handleFinishOrder}
                   width={600}
                   >
                                <Form layout="horizontal" {...formItemLayout}>
                                   <Form.Item label="车辆编号">
                                       {this.state.orderInfo.bike_sn}
                                   </Form.Item>
                                   <Form.Item label="剩余电量" {...formItemLayout}>
                                        {this.state.orderInfo.battery + '%'}
                                   </Form.Item>
                                   <Form.Item label="行程开始时间" {...formItemLayout}>
                                       {this.state.orderInfo.start_time }
                                   </Form.Item>
                                   <Form.Item label="行程开始时间" {...formItemLayout}>
                                       {this.state.orderInfo.location }
                                   </Form.Item>
                               </Form>
                </Modal>
            </div>
        )
    }
}
// class FilterForm extends Component{
//     render(){
//         const { getFieldDecorator } = this.props.form
//         return (
//             <Form layout="inline">
//                  <Form.Item label="城市">
//                      {
//                          getFieldDecorator("city_id")(
//                              <Select placeholder="全部"
//                              style={{width:100}}>
//                                  <Select.Option value=" ">全部</Select.Option>
//                                  <Select.Option value="1">北京市</Select.Option>
//                                  <Select.Option value="2">天津市</Select.Option>
//                                  <Select.Option value="3">深圳市</Select.Option>

//                              </Select>
//                          )
//                      }
//                  </Form.Item>
//                  <Form.Item label="订单时间">
                     
//                      {
//                          getFieldDecorator("start_time")(
//                              <DatePicker
//                                showTime
//                                format="YYYY-MM-DD HH:mm:ss"
//                              />
//                          )
//                      }
//                  </Form.Item>
//                  <Form.Item >
//                  {
//                          getFieldDecorator("end_time")(
//                              <DatePicker
//                                showTime
//                                format="YYYY-MM-DD HH:mm:ss"
//                              />
//                          )
//                      }
//                  </Form.Item>
//                  <Form.Item label="订单状态">
//                      {
//                          getFieldDecorator("order_status")(
//                              <Select placeholder="全部"
//                              style={{width:100}}> 
//                                  <Select.Option value="">全部</Select.Option>
//                                  <Select.Option value="1">进行中</Select.Option>
//                                  <Select.Option value="2">进行中（进行锁车）</Select.Option>
//                                  <Select.Option value="3">结束行程</Select.Option>

//                              </Select>
//                          )
//                      }
//                  </Form.Item>
//                  <Form.Item>
//                      <Button type="primary" style={{margin:"0 20px"}} onClick={this.handleFilterSubmit}>查询 </Button>
//                      <Button onClick={this.reset}>重置</Button>
//                  </Form.Item>
//             </Form>
//         )
//     }
// }
// FilterForm=Form.create({})(FilterForm)