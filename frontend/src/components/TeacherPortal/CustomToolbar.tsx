import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

export default function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        height: "4rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <GridToolbarFilterButton style={{ color: "black" }} />
      </div>
      <div>
        <GridToolbarColumnsButton style={{ color: "black" }} />
        <GridToolbarDensitySelector style={{ color: "black" }} />
        <GridToolbarExport style={{ color: "black" }} />
      </div>
    </GridToolbarContainer>
  );
}
