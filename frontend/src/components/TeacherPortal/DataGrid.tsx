import CustomToolbar from "./CustomToolbar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface props {
  Data: any;
  headings: GridColDef[];
}
const Datagrid = (Props: props) => {
  return (
    <>
    
      <DataGrid
        sx={{
          "& .MuiDataGrid-cellContent": {
            fontWeight: 600,
            color: "black",
            // add more css for customization
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgb(0,0,0,.08)",
            // color: "red"
          },
          "& .MuiDataGrid-column": {
            border: "1px solid rgb(0,0,0,.16)",

            fontSize: "14px ",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "#7d7d7d",
          },
          "& .css-1dd5xmd-MuiDataGrid-root": {
            color: "#eaeaea",
            fontWeight: "bolder",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bolder",
          },
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        style={{ backgroundColor: "white" }}
        rows={Props?.Data?.map((e: any, i: number) => {
          return {
            ...e,
            id: i + 1,
          };
        })}
        columns={Props.headings}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </>
  );
};

export default Datagrid;
