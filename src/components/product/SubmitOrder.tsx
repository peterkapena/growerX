import { TextField, InputAdornment, Button } from "@mui/material";
import {
  submitOrderFormModel,
  submitOrderormInitialValues,
  submitOrderormValidationSchema,
  SubmitOrderormValueModel,
} from "./submitOrderFormModel";
import { FormikHelpers, useFormik } from "formik";
import { IS_DEVELOPER } from "../../common";
import { useState } from "react";
import { FormSubmitting } from "../other/Submitting";
import { gql, useMutation } from "@apollo/client";
import { AddOrUpdateOrder } from "../../__generated__/graphql";
import { useUser } from "../../redux/userSlice";
import { AlertDialog } from "../other/Dialogs";

const AddOrUpdateOrderQuery = gql(`
mutation AddOrUpdateOrder($input: AddOrUpdateOrder!) {
  addOrUpdateOrder(input: $input)
}
`);

type SubmitOrderProps = {
  productId: string;
  organisationId: string;
};
export default function SubmitOrder(props: SubmitOrderProps) {
  const { productId, organisationId } = props;
  const { formFields, formId } = submitOrderFormModel;
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(false);
  const formik = useFormik<SubmitOrderormValueModel>({
    initialValues: submitOrderormInitialValues,
    validationSchema: submitOrderormValidationSchema,
    onSubmit: _handleSubmit,
  });
  const [addOrUpdateOrder] = useMutation(AddOrUpdateOrderQuery);
  const user = useUser();

  async function _handleSubmit(
    values: SubmitOrderormValueModel,
    actions: FormikHelpers<any>
  ) {
    if (IS_DEVELOPER) console.log(values);
    actions.setSubmitting(true);

    try {
      if (formik.isValid) {
        // alert(JSON.stringify(values));
        const input: AddOrUpdateOrder = {
          organisationId: user.organisationId,
          productId: productId,
          quantity: +values.quantity,
        };
        const rtn = (await addOrUpdateOrder({ variables: { input } })).data
          ?.addOrUpdateOrder;
        if (IS_DEVELOPER) console.log(rtn);
        setOk(rtn);
      }
    } catch (e) {
      setError(true);
      if (IS_DEVELOPER) console.log(JSON.stringify(e));
    }
    actions.setSubmitting(false);
  }
  return (
    <>
      {" "}
      <form id={formId} onSubmit={formik.handleSubmit}>
        <TextField
          id={formFields.quantity.name}
          variant="outlined"
          placeholder="Quantity"
          size="medium"
          type="number"
          margin="normal"
          fullWidth
          disabled={user.organisationId === organisationId}
          sx={{ p: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          {...formik.getFieldProps(formFields.quantity.name)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{ m: 0 }}
                  fullWidth
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <FormSubmitting></FormSubmitting>
                  ) : (
                    "Purchase"
                  )}
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </form>
      {ok && (
        <AlertDialog
          message="Order submitted"
          onClose={() => setOk(false)}
        ></AlertDialog>
      )}
    </>
  );
}
