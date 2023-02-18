import { gql, useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/other/DataTable";
import Loading from "../../components/other/Loading";
import { useUser } from "../../redux/userSlice";
import { GetProductsByOrganisationQuery } from "../../__generated__/graphql";

const products = [
  {
    _id: 111,
    name: "Maize",
    quantity: 1212,
    unitPrice: 0.44,
  },
  {
    _id: 22,
    name: "Beanse",
    quantity: 1212,
    unitPrice: 0.44,
  },
  {
    _id: 33,
    name: "Spinnach",
    quantity: 1212,
    unitPrice: 0.44,
  },
  {
    id: 44,
    name: "Bananas",
    quantity: 1212,
    unitPrice: 0.44,
  },
  {
    _id: 55,
    name: "Oranges",
    quantity: 1212,
    unitPrice: 0.44,
  },
  {
    _id: 66,
    name: "Potatoes",
    quantity: 1212,
    unitPrice: 0.44,
  },
  {
    _id: 1411,
    name: "Apples",
    quantity: 1212,
    unitPrice: 0.44,
  },
  {
    _id: 222,
    name: "Lemon",
    quantity: 1212,
    unitPrice: 0.44,
  },
];

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
        onRowClick={(param)=>console.log(param)}
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
