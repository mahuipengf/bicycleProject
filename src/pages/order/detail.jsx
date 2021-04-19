import React,{Component} from 'react'
import  {Card} from 'antd'
import axios from 'axios'
import Utils from './../../utils/utils'
import "../../style/common.less"
import './mock/data1'
import './mock/cancel'
import './detail.less'
export default class OrderDetail extends Component{
    state = {
        orderInfo:{}
    }
    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        if(orderId){
            this.getDetailInfo(orderId)
        }
        this.renderMap()
    }
    getDetailInfo = (orderId)=>{
        axios({
            method:"get",
            url:"/api/order/detail.json",
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res)=>{
            console.log(res)
            if(res.data.code =="0"){
                this.setState({
                    orderInfo:res.data.result
                })
                this.renderMap(res.data.result.position_list)
                this.drawServeceRoute(res.data.result.area)

                console.log("asdasd",res.data)
            }
        })
    }
    renderMap = (result) =>{
         this.map = new window.BMapGL.Map('orderDetailMap')
        this.map.centerAndZoom(new window.BMapGL.Point(116.404,39.915),11)
        this.map.enableScrollWheelZoom(true);
        this.addMapControl()
        this.drawBikeRoute(result)

    }
    //添加地图控件
    addMapControl = () =>{
        let map = this.map
        map.addControl(new window.BMapGL.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}))
        map.addControl(new window.BMapGL.ZoomControl({anchor:window.BMAP_ANCHOR_TOP_LEFT}))
        map.addControl(new window.BMapGL.CityListControl({anchor:window.BMAP_ANCHOR_BOTTOM_LEFT}))
    }
    //添加形式路线图
     drawBikeRoute = (positionList) =>{
            let startPoint = '';
            let endPoint = ''
            if(positionList){
                let first = positionList[0];
                let last = positionList[11];
                // console.log(positionList[0])
                startPoint = new window.BMapGL.Point(first.lon,first.lat)
                let startIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
                    imageSize:new window.BMapGL.Size(36,42),
                    anchor: new window.BMapGL.Size(36,42)
                })
                let startMarker = new window.BMapGL.Marker(startPoint,{icon:startIcon})
                endPoint = new window.BMapGL.Point(last.lon,last.lat)
                let endIcon = new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
                    imageSize:new window.BMapGL.Size(36,42),
                    anchor: new window.BMapGL.Size(36,42)
                })
                let endMarker = new window.BMapGL.Marker(endPoint,{icon:endIcon})
                this.map.addOverlay(startMarker)
                this.map.addOverlay(endMarker)
                //链接线如图
                let trackPoint = []
                for(let i=0;i<positionList.length;i++){
                    let point = positionList[i]
                    trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
                }
                let polyline = new window.BMapGL.Polyline(trackPoint,{
                    strokeColor:'#1869ad',
                    strokeWeight:3,
                    strokeOpacity:1
                })
                this.map.addOverlay(polyline)
                this.map.centerAndZoom(endPoint,11)
                //设置服务区域
                let polygon = new window.BMapGL.Polygon([
                    new window.BMapGL.Point(116.387112,39.920977),
                    new window.BMapGL.Point(116.385243,39.913063),
                    new window.BMapGL.Point(116.394226,39.917988),
                    new window.BMapGL.Point(116.401772,39.921364),
                    new window.BMapGL.Point(116.41248,39.927893)
                ],{
                    strokeColor:"blue", 
                    strokeWeight:2,
                    strokeOpacity:0.5
                })
                    this.map.addOverlay(polygon)

            }
     }
     //添加服务面积
     drawServeceRoute = (positionList) =>{
         let trackPoint = []
         for(let j=0;j<positionList.length;j++){
             let point = positionList[j]
             trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
         }
         let polygon = new window.BMapGL.Polygon(trackPoint,{
             strokeColor:"#ce0000",
             strokeWeight:3,
             strokeOpacity:1,
             fillColor:"#ff8605",
             fillOpcity:0.5
         })
         this.map.addOverlay(polygon)
     }
    render(){
        const info = this.state.orderInfo
        return (
            <div >
                 <Card>
                 <div id="orderDetailMap" style={{height:500}}></div>
                 <div className="detail-items">
                     <div className="item-title">基础信息</div>
                     <ul className="detail-form">
                         <li>
                             <div className="detail-form-left">用车模式</div>
                             <div className="detail-form-content">{info.mode==1?'服务区':'停车点'}</div>
                         </li>
                         <li>
                             <div className="detail-form-left">订单编号</div>
                             <div className="detail-form-content">{info.order_sn}</div>
                         </li>
                         <li>
                             <div className="detail-form-left"> 车辆编号</div>
                             <div className="detail-form-content">{info.bike_sn}</div>
                         </li>
                         <li>
                             <div className="detail-form-left">用户姓名</div>
                             <div className="detail-form-content">{info.user_name}</div>
                         </li>
                         <li>
                             <div className="detail-form-left">手机号码</div>
                             <div className="detail-form-content">{info.mobile}</div>
                         </li>
                     </ul>
                 </div>
                 <div className="detail-items">
                     <div className="item-title">行驶轨迹</div>
                     <ul className="detail-form">
                         <li>
                             <div className="detail-form-left">行程起点</div>
                             <div className="detail-form-content">{info.start_location}</div>
                         </li>
                         <li>
                             <div className="detail-form-left">行程终点</div>
                             <div className="detail-form-content">{info.end_location}</div>
                         </li>
                         <li>
                             <div className="detail-form-left"> 行程里程</div>
                             <div className="detail-form-content">{info.distance/1000+"km"}</div>
                         </li>
                      </ul>
                 </div>
                 </Card>
            </div>
        )
    }
}