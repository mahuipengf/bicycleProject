import React,{Component} from 'react'
import { Table } from 'antd'

export default class ETable extends Component{

    onRowClick = (record, index) =>{
        let rowSelection = this.props.rowSelection
        if(rowSelection=='checkbox'){
            let selectedRowKeys = this.props.selectedRowKeys
            let selectedItem = this.props.selectedItem
            let selectedIds  = this.props.selectedIds
            console.log(record.id)
            if(selectedIds){
                const i = selectedIds.indexOf(record.id)
                //如果没被选中就把他添加进去
                if(i==-1){
                    selectedIds.push(record.id)
                    selectedRowKeys.push(index)
                    selectedItem.push(record)
                }else{ //他有选择就会进行取反
                    //slice会改变当前数组
                    selectedIds.slice(record.id)
                    selectedRowKeys.slice(index)
                    selectedItem.slice(record)
                }
            }else{
                selectedIds = [record.id]
                selectedRowKeys = [index]
                selectedItem = [record]
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds)
        }else{
            let selectedRowKeys = [index]  
            let selectedItem = record
            this.props.updateSelectedItem(selectedRowKeys,selectedItem)
        }
    }
    tableInit = () =>{
        let row_selection = this.props.rowSelection
        let selectedRowKeys = this.props.selectedRowKeys
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            onChange:this.onSelectChange
        }
        if(row_selection === false || row_selection ===null){
            row_selection = false
        }else if(row_selection =='checkbox'){
        console.log("都来瞅瞅看一看瞧一瞧",row_selection)
            
            rowSelection.type='checkbox'
        }else{
            row_selection = 'radio'
        }
        return (
            <Table
            bordered
            {...this.props}

            rowSelection={row_selection?rowSelection:null}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        if(!row_selection){
                            return 
                        }
                        this.onRowClick(record, index)
                    }, // 点击行
                }
            }
            }
        
        />
        )
    }
    render(){
        return(
            <div>
                  {this.tableInit()}
            </div>
        )
    }
}