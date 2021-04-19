import React,{ Component } from 'react'
import { Card,Button,Spin,Icon, Alert } from 'antd'
import { render } from '@testing-library/react'
import './ui.less'
class Loadings extends Component{
    render(){
        const icon = <Icon type="scissor" style={{fontSize:24}} />
        const icon1 = <Icon type="loading"/>
        return (
            <div>
              <Card title="Spin的用法" className="card-wrape">
                  <Spin size="small" />
                  <Spin style={{margin:" 0 10px"}}></Spin >
                  <Spin size="large"></Spin>
                  <Spin indicator={icon}  style={{marginLeft:10}} />
              </Card>
              <Card title="内容遮罩">
                  <Spin >
                  <Alert
                         message="Alert message title"
                         description="学习react高级课程"
                         type="info"
                      />
                    </Spin>
                    <Spin > 
                      <Alert
                         message="Alert message title"
                         description="学习react高级课程"
                         type="warning"
                      />
                    </Spin>  
                    <Spin tip="加载中... " >
                      <Alert
                         message="Alert message title"
                         description="学习react高级课程"
                         type="warning"
                      />
                    </Spin>
                    <Spin  indicator={icon1}  >
                      <Alert
                         message="Alert message title"
                         description="学习react高级课程"
                         type="warning"
                      />
                    </Spin>
              </Card>
            </div>
        )
    }
}
export default Loadings