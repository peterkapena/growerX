import PropTypes from "prop-types";
// @mui
import { Grid } from "@mui/material";
import ProductCard, { ProductProps } from "./ProductCard";

// ----------------------------------------------------------------------

type ProductListProps = {
  products: ProductProps[];
  deletable: boolean;
};

export default function ProductList({ products, deletable }: ProductListProps) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ProductCard deletable={deletable} product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
