import React, { useState } from "react";
import { auth, Button, Input, Toast } from "ui";
import { Modal } from "ui";
import { Register } from "../Register/Register";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { loginUser } from "../../../service";
import * as yup from "yup";

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    Modal.open({
      component: Register,
    });
  };

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: () => {
      handleUserLogin();
    },
    onError: () => {
      Toast({
        message: "Login Fail",
        description: "Login user fail",
        type: "error",
      });
    },
  });

  const handleUserLogin = async () => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(
        formik.values.email,
        formik.values.password
      );
      Toast({
        type: "success",
        message: "Success",
        description: "Signed in successfully",
      });
      //   router.push("/");
    } catch (error: any) {
      const errorCode = error.code;

      if (
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/wrong-password"
      ) {
        Toast({
          type: "error",
          message: "Error occured",
          description:
            "Could not log in. Please check your account information.",
        });
      } else if (errorCode === "auth/too-many-requests") {
        Toast({
          type: "warning",
          message: "Too many request",
          description: error?.message,
        });
      } else {
        Toast({
          type: "error",
          message: "Something went wrong",
          description:
            "Could not log in. Please check your account information.",
        });
      }
    }
    setLoading(false);
  };

  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
  });

  const handleSubmit = () => {
    mutate({
      email: formik.values.email,
      password: formik.values.password,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <div className="w-full h-[80vh] col-flex container  relative justify-center items-center">
      <div className="bg-base-100 shadow-200 rounded-md border-base-100 w-[320px] sm:w-[400px] p-5 col-flex  gap-10 ">
        <div className="font-semibold text-3xl text-center">Login</div>
        <div className="col-flex gap-5">
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
            placeholder="Enter email"
            name="password"
            type="password"
            bordered
            fullWidth
            inputClassName="input-md"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            errorMessage={formik.errors.password}
          />
          <div className="row-flex justify-end font-medium cursor-pointer hover:text-primary">
            Forgot Password?
          </div>
          <Button
            appearance="primary"
            block
            className="my-2"
            onClick={formik.handleSubmit}
            loading={isLoading || loading}
          >
            Login
          </Button>
          <div className="text-center font-semibold">
            Do not have account ?
            <span
              className="text-lg cursor-pointer text-primary"
              onClick={openModal}
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
