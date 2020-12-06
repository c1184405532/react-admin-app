import React from 'react';
import { Layout,} from 'antd';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import routerData from 'router/index'
import Sider from './sider'
import Header from './header'
import './index.less';
const {  Content, Footer,  } = Layout;
let timeOut;


class BaseLayout extends React.Component {
  state = {
    collapsed: true,
    isMobile:false,
  };
  listennerResize = () => {
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      const clientWidth =  document.body.clientWidth;
      if(clientWidth <= 768){
        this.setState({isMobile:true})
      }else{
        this.setState({isMobile:false,collapsed:true})
      }
    }, 100);
  }
  componentDidMount(){
    window.addEventListener('resize',this.listennerResize)
  }
  componentWillUnmount(){
    window.removeEventListener('resize',this.listennerResize)
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  renderRoute = (routerData) => {
    return routerData.map(route => {
      const { children = [] } = route;
      if(children.length > 0){
        return this.renderRoute(children)
      }
      return <Route exact path={route.path} key={route.path} component={route.components} />
    })
  }
  
  render(){
    const { collapsed,isMobile } = this.state;
    const { other } = routerData;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Router>
          <Switch >
            { other.map(route => ( <Route path={route.path} key={route.path} component={route.components} /> ))}
            <Route path="/">
              <Sider 
                isMobile={isMobile}
                collapsed={collapsed}
                onCollapse={this.onCollapse}
              />
              <Layout className="site-layout">
                <Header isMobile={isMobile} onCollapse={this.onCollapse}/>
                <Content style={{ margin: '16px' }}>
                  <Switch >
                    {this.renderRoute(routerData.content)}
                    <Route exact path="*" render={() => ( <div>未匹配任何</div> )} />
                  </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>antd 2020</Footer>
              </Layout>
            </Route>
          </Switch>
        </Router>
      </Layout>
    )
  }
}
export default BaseLayout