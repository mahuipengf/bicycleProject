import React from 'react'
import { BrowserRouter as Router,Route ,Switch ,Redirect} from 'react-router-dom'
import Login from './pages/login'
import App from './App'
import Admin from './admin'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import NoMatch from './pages/nomatch'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notices'
import Messages from './pages/ui/message'
import Tabss from './pages/ui/tabs'
import Gallerys from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import Forms from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTabel from './pages/tabel/basicTabel'
import  HightTabel from './pages/tabel/hightTabel'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'
import PermissionUser from './pages/premission'
 class IRoute extends React.Component{
    
    render(){
        return (
            <Router>
                <App>
                <Switch>
                    
                    <Route path="/login" component={Login} />
                    <Route path="/common"  render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={ OrderDetail}/>
                        </Common>
                    } />
                    <Route path="/order/detail" component={Login} />
                            {/* <Route path="/" component={Admin} /> */}
                    <Route path="/" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route exact path="/ui/buttons"  component={Buttons} />
                                <Route  path="/ui/modals" component={Modals} />
                                <Route  path="/ui/loadings" component={Loadings} />
                                <Route path="/ui/notification" component={Notice} />
                                <Route path="/ui/messages" component={Messages} />
                                <Route path="/ui/tabs" component={Tabss} />
                                <Route path="/ui/gallery" component={Gallerys} />
                                <Route path="/ui/carousel" component={Carousels} />
                                <Route path="/form/login" component={Forms} />
                                <Route path="/form/reg" component={FormRegister} />
                                <Route path="/table/basic" component={BasicTabel} />
                                <Route path="/table/high" component={HightTabel} />
                                <Route path="/city" component={City} />
                                <Route path="/order" component={Order} />
                                <Route path="/user" component={User} />
                                <Route path="/bikeMap" component={BikeMap} />
                                <Route path="/charts/bar" component={Bar}/>
                                <Route path="/charts/pie" component={Pie}/>
                                <Route path="/charts/line" component={Line}/>
                                <Route path="/rich" component={RichText}/>
                                <Route path="/permission" component={PermissionUser}/>
                                
                                <Redirect to="/home"/>
                                
                                
                                
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                   </Switch> 
                </App>
            </Router>
        )
    }
}
export default IRoute