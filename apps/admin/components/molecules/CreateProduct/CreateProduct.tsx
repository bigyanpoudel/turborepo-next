import React from "react";
import { Button, Input, ModalButtonWrapper, Upload } from "ui";
import { useFormik } from "formik";
import * as yup from "yup";
export const CreateProduct = () => {
  const onSubmit = () => {};

  const validationSchema = yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null,
      price: "",
      url: "",
    },
    onSubmit,
    validationSchema,
  });
  console.log("values", formik.values);
  return (
    <div className="pb-16 w-[300px] sm:w-[600px]">
      <div className="font-semibold text-lg p-5">Create Product</div>
      <div className="col-flex gap-3 p-3">
        <Input
          label="Product Name"
          placeholder="Enter product name"
          name="title"
          bordered
          fullWidth
          inputClassName="input-md"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          errorMessage={formik.errors.title}
        />
        <Input
          label="Product description"
          placeholder="Enter product description"
          name="description"
          bordered
          type="textarea"
          rows={5}
          fullWidth
          inputClassName="input-md"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          errorMessage={formik.errors.description}
        />
        <Upload
          title={formik.values.url}
          onFileUpload={(file) => {
            formik.setFieldValue("image", file);
            formik.setFieldValue("url", URL.createObjectURL(file));
          }}
        />
      </div>
      <ModalButtonWrapper className="row-flex justify-end gap-5">
        <Button appearance="error">Cancel</Button>
        <Button appearance="primary" className="w-[150px]">
          Create
        </Button>
      </ModalButtonWrapper>
    </div>
  );
};
