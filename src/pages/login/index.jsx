import React from 'react';
import { Form, Input, Button, } from 'antd';
import {
  withRouter
} from "react-router-dom";
import './index.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
class Login extends React.Component {
  state = {

  };
  onFinish = (values) => {
    //console.log(values)
    const { history} = this.props;
		history.push({
			pathname: '/laborPersonnel/list'
    })
  }
  onFinishFailed = (values) => {
    //console.log('onFinishFailed',values)
  }
  render() {
    return (
      <Form
        {...layout}
        className="login-box"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: '用户名不能为空！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
export default withRouter(Login);