import React from 'react';
import { Layout, Menu,Tooltip, Drawer } from 'antd';
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  withRouter
} from "react-router-dom";
import routerData from 'router/index'
import admin_logo from 'assets/admin_logo.jpg';
import './index.less';
const { Sider } = Layout;
const { SubMenu } = Menu;
class AgainSider extends React.Component {
  
  // onGoPage = ({ item, key, keyPath, domEvent }) => {
  //   console.log('item',item)
  //   console.log('key',key)
  //   console.log('keyPath',keyPath)
  //   console.log('domEvent',domEvent)
  // }
  onGoPage = (route) => {
    const { history,isMobile,onCollapse } = this.props;
		history.push({
			pathname: route.path
    })
    if(isMobile){
      onCollapse(false)
    }
  }
  renderSider = (routerData) => {
    return routerData.map( route => {
      const { children = [] } = route;
      if(children.length > 0){
        return <SubMenu key={route.name} icon={<UserOutlined />} title="User">
                {this.renderSider(children)}
              </SubMenu> 
      }
      const { isTooltip = false,title } = route.meta
      return <Menu.Item 
              onClick={()=>{this.onGoPage(route)}} 
              key={route.name} 
              icon={<PieChartOutlined />}
            >
              { isTooltip ? 
                <Tooltip title={title} children={ <span>{title}</span> }/> 
                :
                <span>{title}</span>
              }
          </Menu.Item>
    })
  }
  render(){
    const { isMobile,collapsed,onCollapse } = this.props
    return (
          isMobile ? 
            <Drawer
              title={
                <div className={'logo'}>
                  <img className="logo_img" src={admin_logo} alt=""/>
                  <div className="text" >My Antd </div>
                </div>
              }
              headerStyle={{padding:0}}
              bodyStyle={{padding:0}}
              width={200}
              placement="left"
              closable={false}
              onClose={()=>{onCollapse(!collapsed)}}
              visible={collapsed}
              key="left"
            >
              <Sider 
                collapsible 
                className="base-layout-sider-box"
                theme="light"
                collapsed={!collapsed} 
                trigger={null}
              >
                <Menu 
                  theme="light" 
                  defaultSelectedKeys={['1']} 
                  mode="inline"
                  //onClick={this.onGoPage}
                >
                  {this.renderSider(routerData.content)}        
                </Menu>
              </Sider>
            </Drawer>
            :
            <Sider 
              className="base-layout-sider-box"
              collapsible 
              theme="light"
              collapsed={!collapsed} 
              onCollapse={()=>{onCollapse(!collapsed)}}
            >
              <div className={!collapsed ? 'logo logo_collapsed' : 'logo'}>
                <img className="logo_img" src={admin_logo} alt=""/>
                {collapsed ? <div className="text" >My Antd </div> : null}
              </div>
              <Menu 
                theme="light" 
                defaultSelectedKeys={['1']} 
                mode="inline"
                //onClick={this.onGoPage}
              >
                {this.renderSider(routerData.content)}        
              </Menu>
            </Sider>
    )
  }
}
export default withRouter(AgainSider);