import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/other/DataTable";
import Loading from "../../components/other/Loading";
import { useUser } from "../../redux/userSlice";
import { GetProductsByOrganisationQuery } from "../../__generated__/graphql";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../common";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Product",
    renderCell: (params: any) => {
      return <Typography variant="subtitle1">{params.row.name}</Typography>;
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
  },
];

const GetProductsByOrganisation = gql(`
query GetProductsByOrganisation($input: String!) {
  getProductsByOrganisation(input: $input) {
    quantity     
    name
    _id
  }
}
`);

export default function Store() {
  const user = useUser();
  const { data, loading } = useQuery(GetProductsByOrganisation, {
    variables: { input: user.organisationId },
  });
  const navigate = useNavigate();

  if (loading) return <Loading></Loading>;

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Store
      </Typography>
      <DataTable
        disableColumnMenu
        rows={rows(data)}
        columns={columns}
        onRowClick={(param) => navigate(PAGES.PRODUCT + "/" + param.row.id)}
      ></DataTable>
    </>
  );
}

type StorePropType = {
  id: string;
  quantity: number;
  name: string;
};

function rows(
  data: GetProductsByOrganisationQuery | undefined
): StorePropType[] {
  if (!data) return [];

  const { getProductsByOrganisation } = data;

  return getProductsByOrganisation.map((u) => ({
    id: u._id,
    quantity: u.quantity,
    name: u.name,
  }));
}
