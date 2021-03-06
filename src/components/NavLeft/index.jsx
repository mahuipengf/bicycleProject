import React, { Component } from 'react';
 import MenuConfig from './../../config/menuConfig'
 import { Menu , Icon } from 'antd'
 import './index.less'
 import { connect } from 'react-redux'
 import {switchMenu} from '../../pages/redux/action'
import { Link } from 'react-router-dom'
 const SubMenu = Menu.SubMenu
class NavLeft extends Component {
    state = {
        currentKey:''
    }
    handleClick = ({item,key}) =>{
        const { dispatch } = this.props
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })
    }
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig)
        let currentKey = ""+window.location.pathname
       this.setState({
           menuTreeNode,
           currentKey
       })
    }
    //菜单渲染
    renderMenu = (data) =>{
        return data.map((item)=>{
             if(item.children){
                return  (
                    <SubMenu title={item.title} key = {item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
             }
             return (
                 <Menu.Item title={item.title} key={item.key} ><Link to={item.key}> {item.title}</Link></Menu.Item>
             )
                  
            
        })
    }
    render() {
       
        
        //菜单渲染
       
        return (
            
            <div >
                <div className='logo'>
                      <img src='/assets/logo-ant.svg' />
                      <h1>Imooc MS</h1>
                </div>
                <Menu 
                   onClick={this.handleClick}
                  selectedKeys={this.state.currentKey}
                  theme='dark'
                >
                   {this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}
 
export default connect()(NavLeft);