import React,{ Component } from 'react'
import { Card,Button,notification } from 'antd'
import './ui.less'
class Notice extends Component{
    openNotification=(type,just)=>{
        let random = ["topLeft","topRight","bottomLeft","bottomRight"]
        let index = Math.ceil(Math.random()*1000)%4
        if(just){
            notification[type]({
                message: 'Notification Title',
                description:
                    'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
                placement:random[index],
                onclose:"close"
            })
        }else{
            notification[type]({
                message: 'Notification Title',
                description:
                    'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
            })
        }
    }
    render(){
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification("success",true)}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification("info")}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification("warning")}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification("error")}>error</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification("success",true)}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification("info",true)}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification("warning",true)}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification("error",true)}>error</Button>
                </Card>
            </div>
        )
    }
}
export default Notice