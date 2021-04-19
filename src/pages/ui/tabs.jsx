import React, { Component } from 'react'
import { Card, Button, message, Tabs ,Icon} from 'antd'
import './ui.less'
class Tabss extends Component {
    newTabIndex=0
    handleCallBack = (key) =>{
        message.success("恭喜你react高级课程学习成功"+key) 
    }
    componentWillMount(){
        const panes = [
            {
                title:' Tab 1',
                content: ' 好好做好共享单车的项目',
                key:'1'
            },
            {
                title:' Tab 2',
                content: ' 好好做好共享单车的项目',
                key:'2'
            },
            {
                title:' Tab 3',
                content: ' 好好做好共享单车的项目',
                key:'3'
            }
        ]
        this.setState({
            activeKey:panes[0].key,
            panes
        })
    }
    onChange = (activeKey) =>{
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey,action) =>{
        this[action](targetKey)
    }
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      };
     
      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };
    render() {
        const { TabPane } = Tabs
        return (
            <div>
                <Card title="Tabs标签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={()=>this.handleCallBack()}>
                           <TabPane tab="Tab 1" key="1">
                              欢迎学习高级react课程
                            </TabPane>
                           <TabPane tab="Tab 2" disabled key="2">
                               在react课程中你能获得你想要的只是
                           </TabPane>
                           <TabPane tab="Tab 3" key="3">
                              遨游在知识的海洋中，你会学习校new的know React是MVC框架
                           </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tabs带图标 " className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={()=>this.handleCallBack()}>
                           <TabPane tab={<span> <Icon type="plus"  />"Tab 1"</span>} key="1">
                              欢迎学习高级react课程
                            </TabPane>
                           <TabPane tab={<span> <Icon type="edit" />"Tab 2"</span>} key="2">
                               在react课程中你能获得你想要的只是
                           </TabPane>
                           <TabPane tab={<span> <Icon type="delete" />"Tab 3"</span>} key="3">
                              遨游在知识的海洋中，你会学习校new的know React是MVC框架
                           </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tabs可删除的表格" className="card-wrap">
                    <Tabs 
                            onChange={this.onChange}
                            type="editable-card"
                            activeKey={this.state.activeKey}
                            onChange={this.handleCallBack}
                            onEdit={this.onEdit}
                            >
                        {
                            this.state.panes.map((panel)=>{
                                return <TabPane 
                                     tab={panel.title} 
                                     key={panel.key}
                                   >{ panel.content }</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
export default Tabss