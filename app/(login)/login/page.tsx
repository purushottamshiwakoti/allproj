import { LoginForm } from "@/components/forms/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <div>
        <h2 className="capitalize text-primary text-2xl font-medium">
          Login to your account
        </h2>
        <div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
