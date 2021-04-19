import React,{Component} from 'react'
import {Card} from 'antd'
//导入echarts主题
import echartTheme from '../echartTheme'
// import echarts from 'echarts'
//按需加载
import echarts from 'echarts/lib/echarts'
//导入饼图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

import ReactEcharts from 'echarts-for-react'
export default class Line extends Component{
    componentWillMount(){
        //注册主题
        echarts.registerTheme('Imooc', echartTheme)
    }
    getOption = () =>{
        let option = {
            title:{
                text:"用户骑行订单",
                x:"center",
                top:20
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
               type:'value'
            },
            tooltip:{
                trigger:'item',
            },
            series:[
                {
                    name:"订单数量",
                    type:'line',
                    data:[
                        {
                            value:1000,
                            name:"周一"
                        },
                        {
                            value:1500,
                            name:"周二"
                        },{
                            value:3000,
                            name:"周三"
                        },{
                            value:4000,
                            name:"周四"
                        },{
                            value:500,
                            name:"周五"
                        },{
                            value:60,
                            name:"周六"
                        },{
                            value:1500,
                            name:"周日"
                        }
                    ]
                       
                }
            ]
        }
        return option
    }
    getOption2 = () =>{
        let option = {
            title:{
                text:"用户骑行订单",
                x:"center",
                top:20
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
               type:'value'
            },
            legend:{
               data:['OFO订单数量','MO拜订单数量','视频广告']
            },
            tooltip:{
                trigger:'item',
            },
            series:[
                {
                    name:'OFO订单数量',
                    type:'line',
                    data: [220, 182, 191, 234, 290, 330, 310]
                       
                },
                {
                    name:'MO拜订单数量',
                    type:'line',
                    data: [120, 132, 101, 134, 90, 230, 210]
                       
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
            ]
        }
        return option
    }
    getOption3 = () =>{
        let option = {
            title:{
                text:"用户骑行订单",
                x:"center",
                top:20
            },
            xAxis:{
                type: 'category',
                boundaryGap: false,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
               type:'value'
            },
            tooltip:{
                trigger:'item',
            },
            series:[
                
                {   
                    
                    name:"订单数量",
                    type:'line',
                    data:[
                        500,1000,2000,3500,2100,1465,300
                    ],
                    areaStyle: {}
                    
                       
                }
            ]
        }
        return option
    }
    render(){
            return (
                <div>
                    <Card title="折线图表之一">
                         <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}} />
                    </Card>
                    <Card title="折线图表之二" style={{marginTop:10}}>
                        <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}} />
                    </Card>
                    <Card title="折线图表之三" style={{marginTop:10}}>
                        <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height:500}} />
                    </Card>
                </div>
            )
    }
}