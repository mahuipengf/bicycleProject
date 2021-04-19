import React,{  Component } from 'react'
import { Card,Table,Modal,Button,message,Badge } from 'antd'
import axios from 'axios'
import "../tabel/mock/mock"
import '../tabel/mock/mock1'
import Utils from '../../utils/utils'
class HightTabel extends Component {
    state={
        isFlag:false
    }
    request =  () =>{
        axios.get("/mock.js").then(res=>{
            //生成mock数据
            // let  dataSource1 = JSON.stringify(res.data)
            // console.log("看一看"+ dataSource1)
            res.data.result.map((item,key)=> item.key=key)
            if(res.data.code=="0" && res.status=="200"){
                this.setState({
                    dataSource1:res.data.result
                })
            }

        })
    }
    handleClick = (pagination, filters, sorter) =>{
        console.log("::" + sorter.order)
        this.setState({
            isFlag:!sorter.order
        })
    } 
    handleDelete = (item) => {
        let id = item.id
        Modal.confirm({
            title:"确认",
            content:"您确认要删除词条数据吗？",
            onOk:()=>{
                message.success("删除成功")
                this.request()
            }
        })
    }
    componentDidMount(){
        const dataSource = [
            {
                id:'0',
                userName:'tom',
                userPwd:'123',
                sex:'nan',
                state:'success',
                address:'粉龙天国男团',
                birthday:'2012-05-12'
            },
            {
                id:'1',
                userName:'Runii',
                userPwd:'321',
                sex:'女',
                state:'success',
                address:'看你不爽',
                birthday:'2012-05-12'
            },
            {
                id:'2',
                userName:'Susy',
                userPwd:'sdaijdi',
                sex:'女',
                state:'success',
                address:'我的家乡在美丽的海',
                birthday:'2012-05-12'
            }
        ]
        dataSource.map((item,key)=>{
            return item.key=key
        })
        this.setState({
            dataSource
        })
        // console.log(dataSource)
        this.request()
    }
     render(){
        const columns1  = [
            {
                title:"id",
                width:80,
                fixed:"left",
                dataIndex:"id"
            },{
                title:"用户名",
                width:80,
                dataIndex:"userName"
            },{
                title:"密码",
                width:120,
                dataIndex:"userPwd"
            },{
                title:"性别",
                width:80,
                dataIndex:"sex",
                render(sex){
                    return sex ==1 ?"男":"女"
                }
            },{
                title:"状态",
                dataIndex:"state",
                width:80,
                render(state){
                    let config = {
                        "1":"游泳",
                        "2":"跑步",
                        "3":"健身",
                        "4":"摄影",
                        "5":"唱歌",
                        "6":"跳舞",
                        "7":"自由搏击",
                        "8":"厨艺"
                    }
                    return config[state]
                }
            },{
                title:"地址",
                width:80,

                dataIndex:"address"
            },{
                title:"生日",
                width:80, 
                dataIndex:"birthday"
            },
            {
                title:"id",
                width:80,
                dataIndex:"id"
            },{
                title:"用户名",
                width:80,
                dataIndex:"userName"
            },{
                title:"密码",
                width:120,
                dataIndex:"userPwd"
            },{
                title:"性别",
                width:80,
                dataIndex:"sex",
                render(sex){
                    return sex ==1 ?"男":"女"
                }
            },{
                title:"状态",
                dataIndex:"state",
                width:80,
                render(state){
                    let config = {
                        "1":"游泳",
                        "2":"跑步",
                        "3":"健身",
                        "4":"摄影",
                        "5":"唱歌",
                        "6":"跳舞",
                        "7":"自由搏击",
                        "8":"厨艺"
                    }
                    return config[state]
                }
            },{
                title:"地址",
                width:80,
                dataIndex:"address"
            },{
                title:"生日",
                width:80, 
                dataIndex:"birthday"
            },
            {
                title:"id",
                width:80,
                dataIndex:"id"
            },{
                title:"用户名",
                width:80,
                dataIndex:"userName"
            },{
                title:"密码",
                width:120,
                dataIndex:"userPwd"
            },{
                title:"性别",
                width:80,
                dataIndex:"sex",
                render(sex){
                    return sex ==1 ?"男":"女"
                }
            },{
                title:"状态",
                dataIndex:"state",
                width:80,
                render(state){
                    let config = {
                        "1":"游泳",
                        "2":"跑步",
                        "3":"健身",
                        "4":"摄影",
                        "5":"唱歌",
                        "6":"跳舞",
                        "7":"自由搏击",
                        "8":"厨艺"
                    }
                    return config[state]
                }
            },{
                title:"地址",
                width:80,
                dataIndex:"address"
            },{
                title:"生日",
                width:80, 
                dataIndex:"birthday"
            },
            {
                title:"id",
                width:80,
                dataIndex:"id"
            },{
                title:"用户名",
                width:80,
                dataIndex:"userName"
            },{
                title:"密码",
                width:120,
                dataIndex:"userPwd"
            },{
                title:"性别",
                width:80,
                dataIndex:"sex",
                render(sex){
                    return sex ==1 ?"男":"女"
                }
            },{
                title:"状态",
                dataIndex:"state",
                width:80,
                render(state){
                    let config = {
                        "1":"游泳",
                        "2":"跑步",
                        "3":"健身",
                        "4":"摄影",
                        "5":"唱歌",
                        "6":"跳舞",
                        "7":"自由搏击",
                        "8":"厨艺"
                    }
                    return config[state]
                }
            },{
                title:"地址",
                width:80,
                dataIndex:"address"
            },{
                title:"生日",
                width:80, 
                dataIndex:"birthday"
            }
        ]
        const columns  = [
            {
                title:"id",
                width:80,
                dataIndex:"id"
            },{
                title:"用户名",
                width:80,
                dataIndex:"userName"
            },{
                title:"密码",
                width:120,
                dataIndex:"userPwd"
            },{
                title:"性别",
                width:80,
                dataIndex:"sex",
                render(sex){
                    return sex ==1 ?"男":"女"
                }
            },{
                title:"状态",
                dataIndex:"state",
                width:80,
                render(state){
                    let config = {
                        "1":"游泳",
                        "2":"跑步",
                        "3":"健身",
                        "4":"摄影",
                        "5":"唱歌",
                        "6":"跳舞",
                        "7":"自由搏击",
                        "8":"厨艺"
                    }
                    return config[state]
                }
            },{
                title:"地址",
                width:80,
                dataIndex:"address"
            },{
                title:"生日",
                width:80, 
                dataIndex:"birthday"
            },
        ]
        const columns2  = [
            {
                title:"id",
                width:80,
                dataIndex:"id"
            },{
                title:"年龄",
                width:80,
                dataIndex:"age",
                sorter:(a,b)=>{
                    return a.age-b.age
                },
                sortOrder:this.state.isFlag?'ascend':'descend'
                
            }, {
                title:"用户名",
                width:80,
                dataIndex:"userName"
            },{
                title:"密码",
                width:120,
                dataIndex:"userPwd"
            },{
                title:"性别",
                width:80,
                dataIndex:"sex",
                render(sex){
                    return sex ==1 ?"男":"女"
                }
            },
            {
                title:"状态",
                dataIndex:"state",
                width:80,
                render(state){
                    let config = {
                        "1":"游泳",
                        "2":"跑步",
                        "3":"健身",
                        "4":"摄影",
                        "5":"唱歌",
                        "6":"跳舞",
                        "7":"自由搏击",
                        "8":"厨艺"
                    }
                    return config[state]
                }
            },{
                title:"地址",
                width:80,
                dataIndex:"address"
            },{
                title:"生日",
                width:80, 
                dataIndex:"birthday"
            },
        ]
        const columns3  = [
            {
                title:"id",
                width:80,
                dataIndex:"id"
            },{
                title:"年龄",
                width:80,
                dataIndex:"age",
               
                
            }, {
                title:"用户名",
                width:80,
                dataIndex:"userName"
            },{
                title:"密码",
                width:120,
                dataIndex:"userPwd"
            },{
                title:"性别",
                width:80,
                dataIndex:"sex",
                render(sex){
                    return sex ==1 ?"男":"女"
                }
            },
            {
                title:"状态",
                dataIndex:"state",
                width:80,
                render(state){
                    let config = {
                        "1":<Badge status="success" text="游泳" />,
                        "2":<Badge status="error" text="跑步" />,
                        "3":<Badge status="default" text="健身" />,
                        "4":<Badge status="processing" text="摄影" />,
                        "5":<Badge status="suProcessingccess" text="唱歌" />,
                        "6":<Badge status="warning" text="跳舞" />,
                        "7":<Badge status="default" text="自由搏击" />,
                        "8":<Badge status="error" text="厨艺"/>
                    }
                    return config[state]
                }
            },{
                title:"地址",
                width:80,
                dataIndex:"address"
            },{
                title:"生日",
                width:80, 
                dataIndex:"birthday"
            },{
                title:"操作",
                width:80,
                render:(text,item)=>{
                    return (<Button  onClick={(item)=>{this.handleDelete(item)}}>删除</Button>)
                }

            }
        ]
           return (
               <div>
                   <Card title="头部固定">
                    <Table
                    bordered//是否添加border
                       columns = {columns} //获取表头
                       dataSource={this.state.dataSource1}//表头里面的数据
                       pagination={false}//取消分页
                       scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定">
                    <Table
                       style={{margin:'10px 0px' }}
                       bordered//是否添加border
                       columns = {columns1} //获取表头
                       dataSource={this.state.dataSource1}
                       pagination={false}//取消分页
                       scroll={{x:4210}}
                    />
                   
                </Card>
                <Card title="左侧固定">
                    <Table
                       style={{margin:'10px 0px' }}
                       bordered//是否添加border
                       columns = {columns2} //获取表头
                       dataSource={this.state.dataSource1}
                       pagination={false}//取消分页
                       onChange={this.handleClick}
                    />
                   
                </Card>
                <Card title="删除按钮">
                    <Table
                       style={{margin:'10px 0px' }}
                       bordered//是否添加border
                       columns = {columns3} //获取表头
                       dataSource={this.state.dataSource1}
                       pagination={false}//取消分页
                    />
                   
                </Card>
               </div>
           )
      } 
       
}
 
export default HightTabel;