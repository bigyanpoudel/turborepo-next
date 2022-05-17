import React from "react";
import { Button, Input, ModalButtonWrapper } from "ui";

export const Register = () => {
  return (
    <div className="w-[500px] relative pb-16">
      <div className="p-5 col-flex">
        <div className="font-semibold">Register</div>
        <div className="col-flex gap-5">
          <Input
            autoFocus
            label="Name"
            placeholder="Enter name"
            name="name"
            bordered
            fullWidth
            inputClassName="input-md"
          />
          <Input
            label="Email"
            placeholder="Enter email"
            name="email"
            type="email"
            bordered
            fullWidth
            inputClassName="input-md"
          />
          <Input
            label="Password"
            placeholder="Enter password"
            name="password"
            bordered
            fullWidth
            type="password"
            inputClassName="input-md"
          />
          <Input
            label="Confirm Password"
            placeholder="Enter confirm password"
            name="confirmPassword"
            bordered
            type="password"
            fullWidth
            inputClassName="input-md"
          />
          <Input
            label="Address"
            placeholder="Enter address"
            name="address"
            bordered
            fullWidth
            inputClassName="input-md"
          />
        </div>
      </div>
      <ModalButtonWrapper>
        <Button block size="md" appearance="primary">
          Register
        </Button>
      </ModalButtonWrapper>
    </div>
  );
};
