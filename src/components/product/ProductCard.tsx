import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Avatar,
  CardActions,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { fCurrency } from "../../utils/formatNumber";
import { ColorPreview } from "../../components/color-utils";
import DeleteIcon from "@mui/icons-material/Delete";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { useState } from "react";
import { AlertDialog } from "../other/Dialogs";
import { gql, useMutation } from "@apollo/client";
import { EditProduct } from "../../pages/product/ProductEditForm";
import { AddProductSchemaInput } from "../../__generated__/graphql";
import { GetProducts } from "../../pages/product/Products";
import { GetProductsByOrganisation } from "../../pages/other/Store";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../common";
import SubmitOrder from "./SubmitOrder";

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "40%",
  objectFit: "cover",
  position: "absolute",
});

type ProductType = {
  product: ProductProps;
  deletable: boolean;
};

export type ProductProps = {
  id: string;
  name: string;
  // cover: string;
  unitPrice: number;
  organisationName: string;
  quantity: number;
  // colors: string[];
  // status: string | undefined;
  // priceSale: number | null;
};

const ToggleArchived = gql(`
mutation ToggleArchived($archived: Boolean!, $id: String!) {
  toggleArchived(archived: $archived, id: $id)
}
`);
export default function ProductCard({ product, deletable }: ProductType) {
  const [showDelete, setShowDelete] = useState(false);
  const [buying, setBuying] = useState(false);
  const { name, unitPrice, organisationName, id, quantity } = product;
  const navigate = useNavigate();

  const [toggleArchived] = useMutation(ToggleArchived, {
    refetchQueries: [GetProducts, GetProductsByOrganisation],
  });

  async function deleProduct() {
    await toggleArchived({
      variables: { archived: true, id: id },
    });
  }

  return (
    <Card elevation={4}>
      {/* <Box sx={{ pt: "100%", position: "relative" }}>
        <StyledProductImg alt={name} src={cover} />
      </Box> */}
      <Button
        onClick={() => navigate(PAGES.PRODUCT + "/" + id)}
        variant="contained"
        sx={{ m: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        fullWidth
      >
        <Typography variant="subtitle1" noWrap>
          {name}
        </Typography>
      </Button>
      <Stack alignItems="start" spacing={2} sx={{ p: 1 }}>
        {organisationName && (
          <Button startIcon={<StoreIcon />}>
            <Typography variant="caption" noWrap>
              {organisationName}
            </Typography>
          </Button>
        )}
        <Typography component={Button} variant="caption" noWrap>
          {quantity} Available in store
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
            </Typography>
            &nbsp;
            {fCurrency(unitPrice)}
          </Typography>
        </Stack>
      </Stack>
      <CardActions sx={{ p: 0 }} disableSpacing>
        {deletable ? (
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
        )}
      </CardActions>
      {showDelete && (
        <AlertDialog
          message="Are you sure you want to delete?"
          onConfirm={deleProduct}
          onClose={() => setShowDelete(false)}
        ></AlertDialog>
      )}
    </Card>
  );
}
