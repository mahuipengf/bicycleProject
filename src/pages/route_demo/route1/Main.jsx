import React, { Component } from 'react';
 import { Link,Redirect } from 'react-router-dom'
class Main extends Component {
    render() { 
        return (
            <div>
                Main组件
                <Link to='/a'>真漂亮</Link>
                <hr/>
            </div>
        );
    }
}
 
export default Main;