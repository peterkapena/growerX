import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
} from "@mui/material";
import Loading from "../../components/other/Loading";
import { useUser } from "../../redux/userSlice";
import { GetProductsByOrganisationQuery } from "../../__generated__/graphql";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../common";
import AddIcon from "@mui/icons-material/Add";
import PageLabel from "../../components/labels/PageLabel";
import { ProductProps } from "../../components/product/ProductCard";
import { ProductList } from "../../components/product";


export const GetProductsByOrganisation = gql(`
query GetProductsByOrganisation($input: String!) {
  getProductsByOrganisation(input: $input) {
    unitPrice
    quantity     
    type
    organisationName
    name
    _id
    organisationId
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
      organisationId: p.organisationId,
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



