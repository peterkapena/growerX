// import { useState } from "react";
import { Typography } from "@mui/material";
import {
  // ProductSort,
  ProductList,
  // ProductCartWidget,
  // ProductFilterSidebar,
} from "../../sections/@dashboard/products";
import PRODUCTS from "../../_mock/products";

export default function ProductsPage() {
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
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

      <ProductList products={PRODUCTS} />
      {/* <ProductCartWidget /> */}
    </>
  );
}
