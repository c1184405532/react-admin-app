import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useLocation,
  useHistory,
  withRouter
} from "react-router-dom";
import routerData from 'router/index'
import Sider from './sider'
import admin_logo from 'assets/admin_logo.jpg';
import './index.less';
const { Header, Content, Footer,  } = Layout;
const { SubMenu } = Menu;
class baseLayout extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  // onGoPage = ({ item, key, keyPath, domEvent }) => {
  //   console.log('item',item)
  //   console.log('key',key)
  //   console.log('keyPath',keyPath)
  //   console.log('domEvent',domEvent)
  // }
  onGoPage = (route) => {
    const { history } = this.props;
		history.push({
			path: route.path
		})
  }
  render(){
    const { collapsed } = this.state;
    console.log('routerData',routerData)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Router>
        <Sider/>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
          
            <Switch >
              { routerData.map(route => (
                <Route  path={route.path} component={route.components} />
              )) }
             
              <Route exact path="*" render={() => ( <div>未匹配任何</div> )} />
            </Switch>
          
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </Router>
      </Layout>
    )
  }
}
export default baseLayout;