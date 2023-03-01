import { FormFieldModel } from "../../types";
import * as yup from "yup";

export type SubmitOrderFormModel = {
  formId: string;
  formFields: SubmitOrderFormFieldsModel;
};

export type SubmitOrderFormFieldsModel = {
  username: FormFieldModel;
  password: FormFieldModel;
  organisationId: FormFieldModel;
};

export const submitOrderFormModel = {
  formId: "submitOrderForm",
  formFields: {
    quantity: {
      label: "Quantity",
      name: "quantity",
    },
  },
};

export const submitOrderormInitialValues = {
  [submitOrderFormModel.formFields.quantity.name]: "",
} as SubmitOrderormValueModel;

export type SubmitOrderormValueModel = {
  quantity: string;
};

export const submitOrderormValidationSchema = yup.object({
  [submitOrderFormModel.formFields.quantity.name]: yup
    .string()
    .required("Supply quantity"),
});
