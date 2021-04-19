import React,{Component} from 'react'
import {Card} from 'antd'
//导入echarts主题
import echartTheme from '../echartTheme'
// import echarts from 'echarts'
//按需加载
import echarts from 'echarts/lib/echarts'
//导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component{
    componentWillMount(){
        //注册主题
        echarts.registerTheme('Imooc', echartTheme)
    }
    getOption = () =>{
        let option = {
            title :{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'直接访问',
                    type:'bar',
                    data:[1000,2000,3000,2100,500,1500,1000]
                }
            ]
        }
        return option
    }
    getOption2 = () =>{
        let option = {
            title :{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data:['OFO','膜拜','小蓝']
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO',
                    type:'bar',
                    data:[8000,15000,24000,20100,500,15000,10000]
                },
                {
                    name:'膜拜',
                    type:'bar',
                    data:[10000,20000,30000,21000,2000,29000,5000]
                },
                {
                    name:'小蓝',
                    type:'bar',
                    data:[6000,19000,25000,10800,5000,9000,8000]
                }
            ]
        }
        return option
    }
    render(){
            return (
                <div>
                    <Card title="柱形图表之一">
                         <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}} />
                    </Card>
                    <Card title="柱形图表之二" style={{marginTop:10}}>
                        <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}} />
                    </Card>
                </div>
            )
    }
}