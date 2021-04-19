import React,{ Component  } from 'react'
import { BrowserRouter as Router ,Route} from 'react-router-dom'
import Main from '../route1/Main'
import About from '../route1/about'
import Topic from '../route1/topic'
import Home from './Home'
export default class IRouter extends Component{
    render(){
        return (
           <Router>
               <div>
               <Home>
                </Home>

               <Route path='/' exact  >asdasd</Route>
               <Route path="/a" component={Main} ></Route>
                    <Route path="/about" component={About} ></Route>
                    <Route path='/topic' component={Topic}></Route>
               </div>
           </Router>
        )
    }
}