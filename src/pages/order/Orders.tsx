import { useQuery } from "@apollo/client";
import { Chip, Typography } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridColumns } from "@mui/x-data-grid";
import PageLabel from "../../components/labels/PageLabel";
import Order from "../../components/order/";
import DataTable from "../../components/other/DataTable";
import Loading from "../../components/other/Loading";
import CustomTabs, { CustomTabPanelProps } from "../../components/Tab/Tabs";
import { gql } from "../../__generated__";
import { GetOrdersQuery } from "../../__generated__/graphql";
import AddIcon from "@mui/icons-material/Add";
import { OrderProps } from "../../components/order/OrderCard";
import OrderList from "../../components/order/OrderList";

export const GetOrders = gql(`
query GetOrders {
  getOrders {
    submittedBy
    productName
    flgStatus
    dateSubmitted
    _id
    quantity
    unitPrice
  }
}
`);

export default function Orders() {
  const getOrdersQuery = useQuery(GetOrders);

  if (getOrdersQuery.loading) return <Loading></Loading>;

  const ORDERS: OrderProps[] | undefined = getOrdersQuery.data?.getOrders.map(
    (o) => ({
      dateSubmitted: o.dateSubmitted,
      flgStatus: o.flgStatus,
      productName: o.productName,
      submittedBy: o.submittedBy,
      id: o._id,
      quantity: o.quantity,
      unitPrice: o.unitPrice,
    })
  );
  return (
    <div>
      <PageLabel>Orders</PageLabel>
      {ORDERS && <OrderList orders={ORDERS} />}
      {/* <DataTable
        disableColumnMenu
        rows={rows(getOrdersQuery.data)}
        columns={columns}
      ></DataTable> */}
    </div>
  );
}

// const columns: GridColumns<OrderProps> = [
//   {
//     field: "productName",
//     headerName: "Product ",
//   },
//   {
//     field: "flgStatus",
//     headerName: "Status",
//   },
//   {
//     field: "submittedBy",
//     headerName: "By",
//   },
// ];

// function rows(data: GetOrdersQuery | undefined): OrderProps[] {
//   if (!data) return [];

//   const { getOrders } = data;

//   return getOrders.map((o) => ({
//     dateSubmitted: o.dateSubmitted,
//     flgStatus: o.flgStatus,
//     productName: o.productName,
//     submittedBy: o.submittedBy,
//     id: o._id,
//   }));
// }
