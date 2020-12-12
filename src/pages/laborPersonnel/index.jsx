import React from 'react';
import TableFilter from 'components/tableFilter';
import './index.less';


class LaborPersonnel extends React.Component {
  state = {
    
  };
  
  
  render(){
    const filterColumns = [
      {label:'劳务人员姓名',name:'laborName',type:'input'},
      {label:'劳务人员编号',name:'laborCode',type:'input',},
      {
        label:'劳务人员班组',name:'laborGroups',type:'select',initialValue:'id123456',
        selectOptions:[{label:'一组',value:'id12345'},{label:'二组',value:'id123456'},]
      },
      //{label:'劳务人员编号',name:'laborCodes',type:'input',placeHolder:'请输入'},
      //{label:'劳务人员编号',name:'laborCodess',type:'input',placeHolder:'请输入'},
      //{label:'劳务人员编号',name:'laborCodesss',type:'input',placeHolder:'请输入'},
    ]
    return (
      <div className="labor-list-box">
        <TableFilter
          columns={filterColumns}
        />
      </div>
    )
  }
}
export default LaborPersonnel;