import React from 'react';
import TableFilter from 'components/tableFilter';
import { DatePicker } from 'antd';
import moment from 'moment';
import './index.less';

class LaborPersonnel extends React.Component {
  state = {
    selectOptions:[],
    tableFilterLoading:true,
  };
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        selectOptions:[{label:'一组',value:'id1'}]
      })
    },2000)
    setTimeout(()=>{
      const oldList = this.state.selectOptions.map(item => item)
      this.setState({
        selectOptions:[...oldList,{label:'二组',value:'id2'},],
        tableFilterLoading:false,
      })
    },4000)
    setTimeout(()=>{
      const oldList = this.state.selectOptions.map(item => item)
      this.setState({
        selectOptions:[...oldList,{label:'三组',value:'id3'},]
      })
    },6000)
  };
  render(){
    const { selectOptions ,tableFilterLoading } = this.state;
    const filterColumns = [
      {label:'姓名',name:'laborName',type:'input'},
      {label:'劳务人员编号',name:'laborCode',type:'input',},
      {
        label:'劳务人员班组',name:'laborGroups',type:'select',initialValue:'id2',
        selectOptions:selectOptions
      },
      {label:'入职日期',name:'entryDate',type:'datePicker',initialValue:'2020-12-11'},
      {label:'离职日期',name:'lizhiDate',type:'datePickerMonth',initialValue:'2021-11'},
      {label:'离职日期2',name:'lizhiDate2',type:'datePickerWeek',initialValue:'2020-50周'},
      {label:'离职日期3',name:'lizhiDate3',type:'datePickerYear',initialValue:'2024'},
      {label:'离职日期4',name:'lizhiDate4',type:'datePickerQuarter',initialValue:'2020-Q3'},
      {
        label:'离职日期5',name:'custom',initialValue:moment("2021-11-10 20:30","YYYY-MM-DD HH:mm"),
        component:<DatePicker showTime/>
      },
      //{label:'劳务人员编号',name:'laborCodes',type:'input',placeHolder:'请输入'},
      //{label:'劳务人员编号',name:'laborCodess',type:'input',placeHolder:'请输入'},
      //{label:'劳务人员编号',name:'laborCodesss',type:'input',placeHolder:'请输入'},
    ]
    return (
      <div className="labor-list-box">
        <TableFilter
          columns={filterColumns}
          loading={tableFilterLoading}
        />
      </div>
    )
  }
}
export default LaborPersonnel;