import PropTypes from "prop-types";
// @mui
import { Grid } from "@mui/material";
import OrderCard, { OrderProps } from "./OrderCard";

// ----------------------------------------------------------------------

type OrderListProps = {
  orders: OrderProps[];
};

export default function OrderList({ orders }: OrderListProps) {
  return (
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid key={order.id} item xs={12} sm={6} md={4}>
          <OrderCard order={order} />
        </Grid>
      ))}
    </Grid>
  );
}
