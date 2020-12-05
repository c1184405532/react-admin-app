import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  DownOutlined
} from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import './index.less';
const { Header,  } = Layout;
class AgainHeader extends React.Component {
  onGoPage = () => {
    const { history, } = this.props;
		history.push({
			pathname: '/user/login'
    })
  }
  
  renderDropMenu = () => {
    return <Menu>
        <Menu.Item>菜单1</Menu.Item>
        <Menu.Item>菜单2</Menu.Item>
        <Menu.Item>菜单3</Menu.Item>
        <Menu.Item onClick={this.onGoPage}>退出登录</Menu.Item>
      </Menu>
    
  }
  
  render(){
    const { isMobile,onCollapse } = this.props;
    return (
      <Header 
        className="site-layout-background" 
        style={{ padding: 0,background:'#fff' }} 
      >
        <span style={{display:'inline-block',paddingLeft:20}}>
          { isMobile ? <MenuUnfoldOutlined onClick={onCollapse} style={{ fontSize: '16px', }}/> : null }
        </span>
        <Dropdown overlay={this.renderDropMenu()}> 
          <span style={{display:'inline-block',float:'right',marginRight:20}}>
            个人中心 <DownOutlined /> 
          </span>
        </Dropdown>
      </Header>
    )
  }
}
export default withRouter(AgainHeader)