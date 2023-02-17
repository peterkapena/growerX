import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridColumnVisibilityModel,
  GridRowsProp,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export type DataTableProps<R extends GridValidRowModel> = {
  rows: GridRowsProp<R>;
  columns: GridColDef[];
  checkboxSelection?: boolean;
  columnVisibilityModel?: GridColumnVisibilityModel;
  disableColumnMenu?: boolean;
};

export default function DataTable<R extends GridValidRowModel>(
  props: DataTableProps<R>
) {
  const {
    rows,
    columns,
    checkboxSelection,
    columnVisibilityModel,
    disableColumnMenu,
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <DataGrid
        sx={{
          "& .super-app-theme--rows": {
            cursor: "pointer",
          },
        }}
        disableSelectionOnClick
        disableColumnMenu={disableColumnMenu}
        autoHeight
        rows={rows}
        columns={columns.map((c) => ({
          ...c,
          align: "left",
          headerAlign: "left",
          flex: c.flex || 1,
          renderHeader: (params: GridColumnHeaderParams) => (
            <Paper color="primary">
              <strong>{params.colDef.headerName}</strong>
            </Paper>
          ),
        }))}
        getRowHeight={() => "auto"}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={checkboxSelection}
        columnVisibilityModel={columnVisibilityModel}
        autoPageSize
        density="compact"
        isRowSelectable={(_) => false}
        getRowClassName={() => `super-app-theme--rows`}
      />
    </div>
  );
}
