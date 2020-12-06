import React from 'react';
import { Form, Input, Button } from 'antd';
import './index.less';


class TableFilter extends React.Component {
  static defaultProps = {
    columns:[]
  }
  state = {

  };
  formRef = null;
  componentDidMount() {
    //console.log('formRef', this.formRef)
    //this.formRef.submit();
  }
  onFinish = (values) => {
    console.log(values)
  }
  onSearch = () =>{
    this.formRef.submit();
  }
  onReset = () => {
    const { columns } = this.props;
    const fieldsData = columns.map((col) => {
      return {
        name:col.name,
        value:col.initialValue || ''
      }
    })
    this.formRef.setFields([...fieldsData]);
  }
  renderCol = (col) => {
    const { 
      className = '',label,name,rules =  [{ required: false }],
      placeHolder,initialValue = '' 
    } = col;
    const itemOption = {
      ...col,
      rules,
      className:className + ' row-list',
      key:name,
      initialValue
    }
    delete itemOption.placeHolder
    return <Form.Item
            {...itemOption}
          >
            <Input placeholder={placeHolder || "请输入" + label } />
          </Form.Item>
  }
  render() {
    const { columns } = this.props;
    return (
      <div className="table-filter-box">
        <Form
          ref={(refs) => { this.formRef = refs }}
          className="form-box"
          layout="inline"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={() => { }}
        >
          {
            columns.map( (col) =>  this.renderCol(col))
          }

          {/* <Form.Item
              label="劳务人员名称"
              className="row-list"
              name="username"
              rules={[{ required: false, message: 'Please input your username!' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item> */}



        </Form>
        <div className="btn-box">
          <Button type="primary" onClick={this.onSearch}>查询</Button>
          <Button className="reset" onClick={this.onReset}>重置</Button>
        </div>
      </div>
    )
  }
}
export default TableFilter;