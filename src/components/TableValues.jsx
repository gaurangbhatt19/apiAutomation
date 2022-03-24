import React from 'react'
import {DataGrid}  from "@material-ui/data-grid";


const TableValues = () => {
    const rows= [
        { id: 1,API_Name:"API 1",Dev_Name:"Gaurang Bhatt",Result:"Pass",ResCode:"200"},
        { id: 1,API_Name:"API 1",Dev_Name:"Gaurang Bhatt",Result:"Pass",ResCode:"200"},
        { id: 1,API_Name:"API 1",Dev_Name:"Gaurang Bhatt",Result:"Pass",ResCode:"200"},
        { id: 1,API_Name:"API 1",Dev_Name:"Gaurang Bhatt",Result:"Pass",ResCode:"200"}
      ];
      
      console.log(rows)
      const columns= [
        { field: "id", hide: true },
        { field: "API_Name", headerName: "API Name", width: 150 },
        { field: "Dev_Name", headerName: "Dev Name", width: 150 },
        { field: "Result", headerName: "Result", width: 120 },
        { field: "ResCode", headerName: "ResCode", width: 150 },
        { field: "Response", headerName: "Response", width: 150 },
        { field: "Elapsed_Time", headerName: "Elapsed Time", width: 200 }
      ];
      

  return (
    <DataGrid rows={rows} columns={columns} />
  )
}

export default TableValues