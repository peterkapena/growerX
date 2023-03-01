// import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Loading from "../../components/other/Loading";
import {
  // ProductSort,
  ProductList,
  // ProductCartWidget,
  // ProductFilterSidebar,
} from "../../components/product";
import { ProductProps } from "../../components/product/ProductCard";
// import PRODUCTS from "../../_mock/products";
import { gql } from "../../__generated__";

export const GetProducts = gql(`
query GetProducts {
  getProducts {
    unitPrice
    type
    quantity
    organisationName
    name
    _id
    organisationId
  }
}

  `);
export default function ProductsPage() {
  const { data, loading } = useQuery(GetProducts);

  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  if (loading) return <Loading></Loading>;

  const PRODUCTS: ProductProps[] | undefined = data?.getProducts.map((p) => ({
    id: p._id,
    name: p.name,
    unitPrice: p.unitPrice,
    organisationName: p.organisationName,
    quantity: p.quantity,
    organisationId: p.organisationId,
  }));

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products in the market
      </Typography>

      {/* <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilterSidebar
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Stack>
      </Stack> */}

      {PRODUCTS && <ProductList deletable={false} products={PRODUCTS} />}
      {/* <ProductCartWidget /> */}
    </>
  );
}
