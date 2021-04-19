import React, { Component } from 'react';
import {  Col, Divider, Row } from 'antd'
import 'antd/dist/antd.css'
import Header from './components/Header'
import './style/common.less'
class Common extends Component {
    render() { 
        return (
            <div>
                <Row className="simple-page">
                   <Header menuType="second"/>
                </Row>
                <Row className="content">
                   {this.props.children}
                </Row>
            </div>
        );
    }
}
 
export default Common;