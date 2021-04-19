import React , { Component } from 'react'
import {Card , Carousel} from 'antd'
import './ui.less'
class Carousels extends Component{
    render(){
        const contentStyle = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
          };
          const imgStyle = {
              height: '260px',
              lineHeight: '260px',
          }
        return (
            
            <div>
               <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay easing> 
                        <div>
                            <h3 style={contentStyle}>Ant Motion Banner - React</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>Ant Motion Banner - Vue</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>Ant Motion Banner - Angular</h3>
                        </div>
                        
                    </Carousel>,
               </Card>
               <Card title="图片背景轮播" className="card-wrap">
                    <Carousel autoplay  > 
                        <div height="260px">
                            <img width="100%" src={'/carousel-img/carousel-1.jpg'} style={imgStyle} alt="" />
                        </div >
                            
                        <div height="260px">
                             <img width="100%" src={'/carousel-img/carousel-2.jpg'} style={imgStyle} alt="" />
                             </div>
                        <div height="260px">
                            <img src={'/carousel-img/carousel-3.jpg'} style={imgStyle} alt="" />
                        </div>
                       
                    </Carousel>,
               </Card>
            </div>
        )
    }
}
export default Carousels