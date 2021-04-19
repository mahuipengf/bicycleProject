import React,{ Component } from 'react'
import { BrowserRouter as Router,Route,Link  } from 'react-router-dom'
import Main from './Main'
import Topic from './topic'
import About from './about'
export default class Home extends Component{
    render(){
        return (
            <Router>
               <div>
                   <ul>
                       <li><Link to='./'>跳转页面</Link></li>
                       <li><Link to='/about'>跳转到A页面</Link></li>
                       <li><Link to='/topic'>跳转到topic</Link></li>
                   </ul>
                    <Route path='/' exact component={Main} ></Route>
                    <Route path="/about" component={Topic} ></Route>
                     <Route path="/topic" component={About}>aasdas</Route>
               </div>
            </Router>
        )
    }
} 