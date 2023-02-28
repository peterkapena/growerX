import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/other/DataTable";
import Loading from "../../components/other/Loading";
import { useUser } from "../../redux/userSlice";
import { GetProductsByOrganisationQuery } from "../../__generated__/graphql";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../common";
import AddIcon from "@mui/icons-material/Add";
import PageLabel from "../../components/labels/PageLabel";
import { ProductProps } from "../../components/product/ProductCard";
import { ProductList } from "../../components/product";

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
  {
    field: "unitPrice",
    headerName: "Unit price",
  },
];

export const GetProductsByOrganisation = gql(`
query GetProductsByOrganisation($input: String!) {
  getProductsByOrganisation(input: $input) {
    unitPrice
    quantity     
    type
    organisationName
    name
    _id
  }
}
`);

export default function Store() {
  const user = useUser();
  const { data, loading } = useQuery<GetProductsByOrganisationQuery>(
    GetProductsByOrganisation,
    {
      variables: { input: user.organisationId },
    }
  );

  const navigate = useNavigate();

  if (loading) return <Loading></Loading>;

  const PRODUCTS: ProductProps[] | undefined =
    data?.getProductsByOrganisation.map((p: any) => ({
      id: p._id,
      name: p.name,
      unitPrice: p.unitPrice,
      organisationName: p.organisationName,
      quantity: p.quantity,
    }));

  return (
    <>
      <PageLabel>Store</PageLabel>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "start",
          borderRadius: 1,
        }}
      >
        <Button
          endIcon={<AddIcon />}
          variant="outlined"
          onClick={() => navigate(PAGES.PRODUCT)}
        >
          Add a product to the store
        </Button>
      </Box>
      {PRODUCTS && <ProductList deletable={true} products={PRODUCTS} />}

      {/* <Card> */}

      {/* <CardContent> */}
      {/* <DataTable
            disableColumnMenu
            rows={rows(data)}
            columns={columns}
            onRowClick={(param) => navigate(PAGES.PRODUCT + "/" + param.row.id)}
          ></DataTable> */}
      {/* </CardContent> */}
      {/* </Card> */}
    </>
  );
}

type StorePropType = {
  id: string;
  quantity: number;
  name: string;
  unitPrice: number;
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
    unitPrice: u.unitPrice,
  }));
}
