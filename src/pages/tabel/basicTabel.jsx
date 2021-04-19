import React,{  Component } from 'react'
import { Card,Table,Modal,Button,message } from 'antd'
import axios from 'axios'
import "../tabel/mock/mock"
import '../tabel/mock/mock1'
import Utils from '../../utils/utils'
class BasicTabel extends Component {
    state={
        dataSource1:[]
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
        this.request1()
    }
    
    ///动态生成数据
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
   
    request1 =  () =>{
        let params= 1
        axios.get("/mock1.js").then(res=>{
            params=res.data.result.page
            //生成mock数据
            // console.log("看一看"+ dataSource1)
            // res.data.result.map((item,key)=> item.key=key)
            if(res.data.code=="0" && res.status=="200"){
                this.setState({
                    dataSource2:res.data.result.list,
                    pagination:Utils.pagination(res.data,(current)=>{
                        //to-do
                        
                    })
                })
            }

        })
    }
    //点击行进行选中
    onRowClick = (record,index) =>{
        let selectKey = [index];
        Modal.info({
            title:"显示点击行",
            content:`这一条行的用户名:${record.userName} ++++${selectKey}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    handleDelete = (()=>{
        let rows = this.state.selectedRows
        let idss = []
        rows.map(item=> idss.push(item.id))
        Modal.confirm({
            title:"删除提示",
            content:`您确定要删除嘛？${idss.join(',')}`,
            onOk:()=>{
                message.success('删除成功')
                this.request()
            }
        })
    })

    render() { 
        const columns  = [
            {
                title:"id",
                dataIndex:"id"
            },{
                title:"用户名",
                dataIndex:"userName"
            },{
                title:"密码",
                dataIndex:"userPwd"
            },{
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex ==1 ?"男":"女"
                }
            },{
                title:"状态",
                dataIndex:"state",
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
                dataIndex:"address"
            },{
                title:"生日",
                dataIndex:"birthday"
            }
        ]
        const {selectedRowKeys} = this.state
        const rowSelection={
            type:"radio",
            selectedRowKeys
        }
        const rowCheckedSelection={
            type:"Checkbox",
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                // let ids = []
                // selectedRows.map(item=> ids.push(item.id))
                this.setState({
                    selectedRowKeys,
                    selectedRows    
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                    bordered//是否添加border
                       columns = {columns} //获取表头
                       dataSource={this.state.dataSource}//表头里面的数据
                       pagination={false}//取消分页
                    />
                </Card>
                 <Card title="动态表格表格-Mock">
                    <Table
                       style={{margin:'10px 0px' }}
                       bordered//是否添加border
                       columns = {columns} //获取表头
                       dataSource={this.state.dataSource1}
                       pagination={false}//取消分页
                    />
                   
                </Card>
                <Card title="Mock-Radio 单选">
                    <Table
                      
                       style={{margin:'10px 0px' }}
                       bordered//是否添加border
                       rowSelection={rowSelection}
                       onRow={(record,index) => {
                        return {
                          onClick: event => {
                              this.onRowClick(record,index)
                          }, // 点击行
                          onDoubleClick: event => {},
                          onContextMenu: event => {},
                          onMouseEnter: event => {}, // 鼠标移入行
                          onMouseLeave: event => {},
                        };
                      }}
                       columns = {columns} //获取表头
                       dataSource={this.state.dataSource1}
                       pagination={false}//取消分页
                    />
                   
                </Card>
                <Card title="Mock-Checked 单选">
                    <div>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                      
                       style={{margin:'10px 0px' }}
                       bordered//是否添加border
                       rowSelection={rowCheckedSelection}
                       columns = {columns} //获取表头
                       dataSource={this.state.dataSource1}
                       pagination={false}//取消分页
                    />
                   
                </Card>
                <Card title="分页">
                    
                    <Table
                       style={{margin:'10px 0px' }}
                       bordered//是否添加border
                       columns = {columns} //获取表头
                       dataSource={this.state.dataSource2}
                       pagination={this.state.pagination}//取消分页
                    />
                   
                </Card>
            </div>
        );
    }
}
 
export default BasicTabel;