import React,{ Component } from 'react'
import { Link  } from 'react-router-dom'

export default class Home extends Component{
    render(){
        return (
               <div>
                   <ul>
                       <li><Link to='./'>跳转页面</Link></li>
                       <li><Link to='/about'>跳转到A页面</Link></li>
                       <li><Link to='/topic'>跳转到topic</Link></li>
                   </ul>
                   
               </div>
        )
    }
} 