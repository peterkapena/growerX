import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { FormikHelpers, useFormik } from "formik";
import { IS_DEVELOPER, PAGES } from "../../common";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import { FormSubmitting } from "../../components/other/Submitting";
import { AlertDialog } from "../../components/other/Dialogs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addProductFormInitialValues,
  addProductFormValidationSchema,
  AddProductFormValueModel,
  addProductFormModel,
} from "./addProductFormModel";
import Loading from "../../components/other/Loading";
import { MenuItem } from "@mui/material";
import {
  AddProductSchemaInput,
  GetProductsByOrganisationQuery,
} from "../../__generated__/graphql";
import PageLabel from "../../components/labels/PageLabel";
import { GetProductsByOrganisation } from "../other/Store";
import { useUser } from "../../redux/userSlice";

const GET_FLAGS_PRODUCTS_TYPE = gql(`
query GetFlagsByType($input: Float!) {
    getFlagsByType(input: $input) {
      description
      _id
    }
  }
`);
const ADD_PRODUCT = gql(`
mutation AddProduct($input: AddProductSchemaInput!) {
    addProduct(input: $input) {
      quantity
      organisationId
      flgProductType
      _id
    }
  }
`);

export default function Product() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { formFields, formId } = addProductFormModel;

  const formik = useFormik<AddProductFormValueModel>({
    initialValues: addProductFormInitialValues,
    validationSchema: addProductFormValidationSchema,
    onSubmit: _handleSubmit,
  });
  const user = useUser();

  const organisationStoreQuery = useQuery<GetProductsByOrganisationQuery>(
    GetProductsByOrganisation,
    {
      variables: { input: user.organisationId },
    }
  );

  const GetFlagsProductType = useQuery(GET_FLAGS_PRODUCTS_TYPE, {
    variables: { input: 3 },
  });

  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: ["GetProductsByOrganisation", "GetProducts"],
  });

  const navigate = useNavigate();

  async function _handleSubmit(
    values: AddProductFormValueModel,
    actions: FormikHelpers<any>
  ) {
    actions.setSubmitting(true);

    try {
      if (formik.isValid) {
        const input: AddProductSchemaInput = {
          flgProductType: values.flgProductType,
          quantity: +values.quantity,
          unitPrice: +values.unitPrice,
        };

        const rtn = (await addProduct({ variables: { input } })).data
          ?.addProduct;

        if (IS_DEVELOPER) console.log(rtn);
        setSuccess(Boolean(rtn?._id));
      }
    } catch (e) {
      setError(true);
      if (IS_DEVELOPER) console.log(JSON.stringify(e));
    }
    actions.setSubmitting(false);
  }

  if (GetFlagsProductType.loading || organisationStoreQuery.loading)
    return <Loading></Loading>;

  const filteredProdductTypes = GetFlagsProductType.data?.getFlagsByType.filter(
    (num) =>
      !organisationStoreQuery.data?.getProductsByOrganisation
        .map((p) => p.type)
        .includes(num._id)
  );

  if (IS_DEVELOPER) {
    console.log(filteredProdductTypes);
  }

  return (
    <>
      <PageLabel>Add a product to your store</PageLabel>
      {filteredProdductTypes?.length === 0 ? (
        <PageLabel>
          Your store already contains all the product types. Please contact
          admin to add more product types for your use case
        </PageLabel>
      ) : (
        <Grid width={500} container component="main" sx={{ height: "100vh" }}>
          <Grid item>
            <form id={formId} onSubmit={formik.handleSubmit}>
              <TextField
                label={formFields.flgProductType.label}
                fullWidth
                margin="normal"
                size="small"
                select
                id={formFields.flgProductType.name}
                error={
                  formik.touched.flgProductType &&
                  Boolean(formik.errors.flgProductType)
                }
                helperText={
                  formik.touched.flgProductType && formik.errors.flgProductType
                }
                {...formik.getFieldProps(formFields.flgProductType.name)}
              >
                {filteredProdductTypes?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.description}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id={formFields.quantity.name}
                type="number"
                fullWidth
                label={formFields.quantity.label}
                size="small"
                margin="normal"
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
                {...formik.getFieldProps(formFields.quantity.name)}
              />

              <TextField
                id={formFields.unitPrice.name}
                type="number"
                fullWidth
                label={formFields.unitPrice.label}
                size="small"
                margin="normal"
                error={
                  formik.touched.unitPrice && Boolean(formik.errors.unitPrice)
                }
                helperText={formik.touched.unitPrice && formik.errors.unitPrice}
                {...formik.getFieldProps(formFields.unitPrice.name)}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={formik.isSubmitting}
                size="small"
              >
                {formik.isSubmitting ? (
                  <FormSubmitting></FormSubmitting>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Grid>
        </Grid>
      )}
      {error && (
        <AlertDialog
          title={"Please note"}
          message={"An error happened. Please try again later."}
          onClose={() => setError(false)}
        ></AlertDialog>
      )}
      {success && (
        <AlertDialog
          title={"Please note"}
          message={"The product has been added."}
          onClose={() => navigate(PAGES.STORE)}
        ></AlertDialog>
      )}
    </>
  );
}

export function AddProductMenus() {
  return <></>;
}
