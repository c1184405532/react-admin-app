import React from 'react';
import { Form, Input, Button, Select, DatePicker ,Spin } from 'antd';
import moment from 'moment';
import './index.less';
/**
 * loading 是否处于加载中 当筛选项有下拉列表需要指定默认值，或者其他数据项需要请求后端指定默认值可使用此字段提示用户正在加载。
 * columns 当前筛选列 type Array[object,object,...]
 * object  = {
 *  type,当前筛选项类型，默认 'input'  可选值有 (select下拉选择，) string
 *  className,当前form.item表单额外类名 string
 *  label,表单前文字提示 string
 *  name,点击查询时返回的key字段，如name="age" ，查询时会返回对象集合{age:选择或输入的值} string
 *  rules,表单校验规则，格式同antd form 表单校验一致 array
 *  placeHolder,没有值的情况下占位符 string
 *  initialValue, 当前项默认值 any
 *  component: type ReactDom react组件，自定义传入筛选项，注意如果传入antd时间组件，默认值需要设置对应的moment类型，且获取到的也是
 *  moment类型，需要手动转换一次 value.format("YYYY-MM-DD HH:mm")
 *  示例 {
 *         label:'离职日期5',name:'custom',initialValue:moment("2021-11-10 20:30","YYYY-MM-DD HH:mm"),
 *          component:<DatePicker showTime/>
 *      } 
 * 
 * 
 *  selectOptions Array[object,object,...] 如果type是select状态时，需要传递的下拉菜单数据
 *    object = {
 *      label,展示的文字 string,
 *      value,选中之后提交的实际值 string||number
 *    }
 * 
 * }
 */
const setInitialValue = (value, type) => {
  const valueType = {
    "input": value,
    "select": value ? value : undefined,//select下如果默认值不存在的话，不能赋值为''，否则不显示placeHolder
    "datePicker": value ? moment(value, 'YYYY-MM-DD') : '',
    "datePickerMonth": value ? moment(value, 'YYYY-MM') : '',
    "datePickerYear": value ? moment(value,'YYYY') : '',
    "datePickerWeek": value ? moment(value,'YYYY-W') : '',
    "datePickerQuarter": value ? moment(value,"YYYY-[Q]Q") : '',
  }
  return valueType[type]
}
const setFinishValue = (value, type) => {
  //moment格式化参数文档详见： http://momentjs.cn/docs/#/displaying/format/
  const valueType = {
    "datePicker": value ? value.format('YYYY-MM-DD'): '',
    "datePickerMonth": value ? value.format('YYYY-MM') : '',
    "datePickerYear": value ? value.format('YYYY') : '',
    "datePickerWeek": value ? value.format('YYYY-wo') : '',
    "datePickerQuarter": value ? value.format("YYYY-[Q]Q") : '',
  }
  return valueType[type]
}
class TableFilter extends React.Component {
  static defaultProps = {
    columns: [],
    loading:false,
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
        //只要类型前10位 === datePicker都会进入此判断 比如datePicker||datePickerMonth
        if (obj === col['name'] && col.type && col.type.slice(0,10) === 'datePicker') {
          values[obj] = setFinishValue(values[obj],col.type) 
        }
      })
    }
    console.log(values)
  }
  onSearch = () => {
    this.formRef.submit();
  }
  onReset = () => {
    const { columns } = this.props;
    const fieldsData = columns.map((col) => {
      return {
        name: col.name,
        value: col.type ? setInitialValue(col.initialValue, col.type) : col.initialValue 
      }
    })
    console.log(fieldsData)
    this.formRef.setFields([...fieldsData]);
  }
  renderCol = (col) => {
    const {
      className = '', label, name, rules = [{ required: false }],
      placeHolder, initialValue = '', type = 'input', selectOptions = [],
      component
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
    delete itemOption.component
    let resultCol;
    if (type === 'input' && !component) {
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
        <DatePicker/>
      </Form.Item>
    }
    if (type === 'datePickerWeek') {
      resultCol = <Form.Item
        {...itemOption}
      >
        <DatePicker picker="week" />
      </Form.Item>
    }

    if (type === 'datePickerYear') {
      resultCol = <Form.Item
        {...itemOption}
      >
        <DatePicker picker="year" />
      </Form.Item>
    }
    if (type === 'datePickerMonth') {
      resultCol = <Form.Item
        {...itemOption}
      >
        <DatePicker picker="month" />
      </Form.Item>
    }
    if (type === 'datePickerQuarter') {
      resultCol = <Form.Item
        {...itemOption}
      >
        <DatePicker picker="quarter" />
      </Form.Item>
    }
    if(component){
      resultCol = <Form.Item
        {...itemOption}
      >
       {component}
      </Form.Item>
    }
    return resultCol
  }
  render() {
    const { columns,loading } = this.props;
    return (
      <div className="table-filter-box">
        <Spin spinning={loading}>
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
          </Form>
          <div className="btn-box">
            <Button type="primary" onClick={this.onSearch}>查询</Button>
            <Button className="reset" onClick={this.onReset}>重置</Button>
          </div>
        </Spin>
      </div>
    )
  }
}
export default TableFilter;