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

  withRouter
} from "react-router-dom";
import routerData from 'router/index'
import admin_logo from 'assets/admin_logo.jpg';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class AgainSider extends React.Component {
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
			pathname: route.path
		})
  }
  render(){
    const { collapsed } = this.state;
    console.log('routerData',routerData)
    return (

        <Sider 
          collapsible 
          theme="light"
          collapsed={collapsed} 
          onCollapse={this.onCollapse}
        >
          <div className={collapsed ? 'logo logo_collapsed' : 'logo'}>
              <img className="logo_img" src={admin_logo} alt=""/>
              {!collapsed ? <div className="text" >My Antd of Vue</div> : null}
          </div>
          <Menu 
            theme="light" 
            defaultSelectedKeys={['1']} 
            mode="inline"
            //onClick={this.onGoPage}
          >
            { routerData.map( route =>(
              <Menu.Item onClick={()=>{this.onGoPage(route)}} key={route.name} icon={<PieChartOutlined />}>
                {route.meta.title}
              </Menu.Item>
             )) }
            
            {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu> */}
            
          </Menu>
        </Sider>
       
    )
  }
}
export default withRouter(AgainSider);