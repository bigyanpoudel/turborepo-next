import React from "react";
import { Button, Input, ModalButtonWrapper, Toast } from "ui";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { register } from "../../../service";
export const Register = ({ callback }: any) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    password: yup.string().required("Password is required"),
    address: yup.string().required("Address is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation(register, {
    onSuccess: () => {
      Toast({
        message: "Registration Success",
        description: "Registration has been successfuly completed!",
        type: "success",
      });
      console.log("succsee");
      callback();
    },
    onError: () => {
      console.log("error");
      Toast({
        message: "Registration Fail",
        description: "Registration could not be done!",
        type: "error",
      });
    },
  });

  const handleSubmit = () => {
    mutate({
      name: formik.values.name,
      email: formik.values.email,
      password: formik.values.password,
      address: formik.values.address,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <div className="w-[500px] relative pb-16">
      <div className="p-5 col-flex">
        <div className="font-semibold">Register</div>
        <div className="col-flex gap-3">
          <Input
            autoFocus
            label="Name"
            placeholder="Enter name"
            name="name"
            bordered
            fullWidth
            inputClassName="input-md"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            errorMessage={formik.errors.name}
          />
          <Input
            label="Email"
            placeholder="Enter email"
            name="email"
            type="email"
            bordered
            fullWidth
            inputClassName="input-md"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            errorMessage={formik.errors.email}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            name="password"
            bordered
            fullWidth
            type="password"
            inputClassName="input-md"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            errorMessage={formik.errors.password}
          />
          <Input
            label="Confirm Password"
            placeholder="Enter confirm password"
            name="confirmPassword"
            bordered
            type="password"
            fullWidth
            inputClassName="input-md"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            errorMessage={formik.errors.confirmPassword}
          />
          <Input
            label="Address"
            placeholder="Enter address"
            name="address"
            bordered
            fullWidth
            inputClassName="input-md"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            errorMessage={formik.errors.address}
          />
        </div>
      </div>
      <ModalButtonWrapper>
        <Button
          block
          size="md"
          appearance="primary"
          loading={isLoading}
          onClick={formik.handleSubmit}
        >
          Register
        </Button>
      </ModalButtonWrapper>
    </div>
  );
};
