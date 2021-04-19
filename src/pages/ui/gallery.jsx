import React, { Component } from 'react';
 import { Card,Row,Col ,Modal} from 'antd'
class Gallerys extends Component {
    state={
        visible:false,
    }
    openGallery = (imgSrc) =>{
        this.setState({
            visible:true,
            currentImg:imgSrc
        })
    }
    onCancel = () => {
        this.setState({
            visible:false
        })
    }
    render() { 
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png'],
        ]
        const imgList = imgs.map((list)=>list.map((item)=>{
            return (
                <Card
                  style={{ width: 240 }}
                  hoverable
                  onClick={()=>this.openGallery(item)}
                  cover={<img src={'/gallery/'+item}/>}
                 >
                     <Card.Meta
                       title="学习react"
                        description="Look as noMatch  "
                     />
                </Card>
            )
        }))
        return (
            <div className="card-wrap" >
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col><Col md={5}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                width="300px"
                    visible={this.state.visible}
                    onCancel={()=>this.onCancel()}
                    onOk = {()=> this.onCancel()}
                    footer={null}
                    title="图片画廊"
                >
                    <img src={'/gallery/'+this.state.currentImg} style={{width:"100% "}}alt=""/>
                </Modal>
            </div>
        );
    }
}
 
export default Gallerys;