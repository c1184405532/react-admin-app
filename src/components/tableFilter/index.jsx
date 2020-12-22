import React from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import './index.less';
/**
 * columns type Array[object,object,...]
 * object  = {
 *  type,当前筛选项类型，默认 'input'  可选值有 (select下拉选择，) string
 *  className,当前form.item表单额外类名 string
 *  label,表单前文字提示 string
 *  name,点击查询时返回的key字段，如name="age" ，查询时会返回对象集合{age:选择或输入的值} string
 *  rules,表单校验规则，格式同antd form 表单校验一致 array
 *  placeHolder,没有值的情况下占位符 string
 *  initialValue, 当前项默认值 string
 *  selectOptions Array[object,object,...] 如果type是select状态时，需要传递的下拉菜单数据
 *  object = {
 *   label,展示的文字 string,
 *   value,选中之后提交的实际值 string||number
 *  }
 * }
 */
const setInitialValue = (value, type) => {
  const valueType = {
    "input": value,
    "select": value ? value : undefined,//select下如果默认值不存在的话，不能赋值为''，否则不显示placeHolder
    "datePicker": value ? moment(value, 'YYYY-MM-DD') : '',
    "datePickerMonth": value ? moment(value, 'YYYY-MM') : '',
  }
  return valueType[type]
}
class TableFilter extends React.Component {
  static defaultProps = {
    columns: []
  }
  state = {

  };
  formRef = null;
  componentDidMount() {
    //console.log('formRef', this.formRef)
    //this.formRef.submit();
  }
  onFinish = (values) => {
    const { columns } = this.props
    for (let obj in values) {
      values[obj] = values[obj] ? values[obj] : '';
      columns.forEach(col => {
        if (obj === col['name'] && col.type === 'datePicker') {
          values[obj] = values[obj] ? values[obj].format('YYYY-MM-DD') : ''
        }
        if (obj === col['name'] && col.type === 'datePickerMonth') {
          values[obj] = values[obj] ? values[obj].format('YYYY-MM') : ''
        }
      })
    }
    console.log(values, moment)
  }
  onSearch = () => {
    this.formRef.submit();
  }
  onReset = () => {
    const { columns } = this.props;
    const fieldsData = columns.map((col) => {
      return {
        name: col.name,
        value: col.initialValue
      }
    })
    console.log(fieldsData)
    return
    this.formRef.setFields([...fieldsData]);
  }
  renderCol = (col) => {
    const {
      className = '', label, name, rules = [{ required: false }],
      placeHolder, initialValue = '', type = 'input', selectOptions = [],
      
    } = col;

    const itemOption = {
      ...col,
      rules,
      className: className + ' row-list',
      key: name,
      initialValue: setInitialValue(initialValue, type),
    }

    //这里删除的属性都是Form.Item不需要的或者不识别的属性
    delete itemOption.placeHolder
    delete itemOption.selectOptions
    delete itemOption.pickerType
    let resultCol;
    if (type === 'input') {
      resultCol = <Form.Item
        {...itemOption}
      >
        <Input placeholder={placeHolder || "请输入" + label} />
      </Form.Item>
    }
    if (type === 'select') {
      resultCol = <Form.Item
        {...itemOption}
      >
        <Select placeholder={placeHolder || "请选择" + label} >
          {selectOptions.map(selectItem => {
            return <Select.Option value={selectItem.value} key={selectItem.value}>{selectItem.label}</Select.Option>
          })}
        </Select>
      </Form.Item>
    }
    if (type === 'datePicker') {
      resultCol = <Form.Item
        {...itemOption}
      >
        <DatePicker  />
      </Form.Item>
    }
    if (type === 'datePickerMonth') {
      resultCol = <Form.Item
        {...itemOption}
      >
        <DatePicker picker="month" />
      </Form.Item>
    }
    
    return resultCol
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
            columns.map((col) => this.renderCol(col))
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