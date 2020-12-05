import React from 'react';
import { Form,Input,Button} from 'antd';
import './index.less';


class LaborPersonnel extends React.Component {
  state = {
    
  };
  
  render(){
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    return (
      <div className="labor-list-box">
        <div className="filter">
        <Form
          layout="inline"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={()=>{}}
          onFinishFailed={()=>{}}
        >
         
           
            <Form.Item
              
              
              label="劳务人员名称"
              name="username"
              rules={[{ required: false, message: 'Please input your username!' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              label="劳务人员名称"
             
              name="username"
              rules={[{ required: false, message: 'Please input your username!' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
          
          
          
            <div style={{width:'100%'}}> 
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            </div>
          
        </Form>
        </div>
      </div>
    )
  }
}
export default LaborPersonnel;