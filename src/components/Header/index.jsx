import React, { Component } from 'react';
import { Row,Col } from 'antd'
import './index.less'
import {connect} from 'react-redux'
import Util from '../../utils/utils'
// import axios from '../../axios/index'
import axios from 'axios'
// import axios from 'axios'
class Header extends Component {
    state={}
    componentWillMount(){
       
        this.setState({
            userName:'河畔一角'
        })
        setInterval(()=>{
           let sysTime = Util.formateDate(new Date().getTime())
           this.setState({sysTime})
        },1000)
        this.getWeatherAPIData()
    }
    getWeatherAPIData(){
        let city=`北京`
       axios.get('/api/weather.json').then(res=>{
           let data = res.data
           console.log(data)
           if(data.status===200){
               this.setState({
                   type:data.data.forecast[1].type
               })
           }
       })
    }
    render() { 
        const menuType = this.props.menuType
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType? 
                            <Col span='6' className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>IMooc 通用管理系统</span>
                            </Col>  :""
                    }
                <Col span={menuType?"18":"24"}>
                    <span>欢迎，{this.state.userName}</span>
                    <a href="#">退出</a>
                </Col>
                </Row>
                {
                    menuType?"": 
                
                <Row className='breadcrumb'>
                    <Col span='4' className='breadcrumb-title'>

                        {this.props.menuName}
                    </Col>
                    <Col span='20' className='weather' >
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-detail'>{this.state.type}</span>
                    </Col>
                </Row>
                }
            </div>
        );
    }
}
 const  mapStateToProps = (state, ownProps) => {
     console.log(state)
     return {
         menuName: state.menuName
     }
 }
export default connect(mapStateToProps)(Header);