import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Card,
  Button,
  Stack,
  CardActions,
  ListItemText,
  Alert,
  ListItem,
  ListItemIcon,
  Chip,
  IconButton,
} from "@mui/material";
import { id } from "date-fns/locale";
import { PAGES } from "../../common";
import { fCurrency } from "../../utils/formatNumber";
import { AlertDialog } from "../other/Dialogs";
import SubmitOrder from "../product/SubmitOrder";
import { useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import { title } from "process";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GetOrders } from "../../pages/order/Orders";

export type OrderProps = {
  submittedBy: string;
  productName: string;
  flgStatus: string;
  dateSubmitted: any;
  id?: string | null;
  quantity: number;
  unitPrice: number;
};

export type OrderType = {
  order: OrderProps;
};

const StyledOrder = styled(Box)({
  cursor: "pointer",
});

const ToggleOrderArchived = gql(`
mutation ToggleOrderArchived($archived: Boolean!, $toggleOrderArchivedId: String!) {
  toggleOrderArchived(archived: $archived, id: $toggleOrderArchivedId)
}
`);

export default function OrderCard(props: OrderType) {
  const {
    dateSubmitted,
    flgStatus,
    productName,
    submittedBy,
    quantity,
    unitPrice,
    id
  } = props.order;
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const [toggleArchived] = useMutation(ToggleOrderArchived, {
    refetchQueries: [GetOrders],
  });

  async function deleteOrder() {
    await toggleArchived({
      variables: { archived: true, toggleOrderArchivedId: id },
    });
  }

  return (
    <Card elevation={4}>
      <CardHeader
        title={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">{productName}</Typography>
          </Box>
        }
        subheader={<Chip sx={{ mt: 1 }} label={flgStatus} color="primary" />}
      ></CardHeader>
      <ListItem>
        <ListItemText secondary={fCurrency(unitPrice)} primary={"Unit price"} />
        <ListItemText secondary={quantity} primary={"Quanity"} />
      </ListItem>
      <ListItem>
        <ListItemText
          secondary={new Date(dateSubmitted).toLocaleString()}
          primary={submittedBy}
        />
      </ListItem>
      <CardActions sx={{ p: 0 }} disableSpacing>
        <IconButton onClick={() => setShowDelete(true)} color="primary">
          <Delete />
        </IconButton>
        {/* {deletable ? (
          <Button
            color="error"
            variant="contained"
            sx={{ m: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            fullWidth
            onClick={() => setShowDelete(true)}
            startIcon={<DeleteIcon />}
          ></Button>
        ) : (
          <SubmitOrder productId={id}></SubmitOrder>
          // <Button
          //   color="secondary"
          //   variant="contained"
          //   sx={{ m: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          //   fullWidth
          //   startIcon={<AddShoppingCartIcon />}
          // >
          //   Buy
          // </Button>
        )} */}
      </CardActions>
      {showDelete && (
        <AlertDialog
          message="Are you sure you want to delete?"
          onConfirm={deleteOrder}
          onClose={() => setShowDelete(false)}
        ></AlertDialog>
      )}
    </Card>
  );
}
