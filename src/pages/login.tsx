// pages/Login.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import { loginRequest } from "../features/auth/authSlice";
import TextInput from "../components/form-components/TextInput";
import Button from "../components/form-components/SubmitButton";
import z from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { getTokenPayload } from "../utils/getTokenPayload";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/rootReducer";

// Infer TypeScript type from schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const methods = useForm<LoginFormData>({
    // resolver: zodResolver(loginSchema),
  });
  const token = localStorage.getItem("token");
  const { handleSubmit } = methods;

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    dispatch(loginRequest(data));
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon (backend pending)");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login coming soon (backend pending)");
  };

  useEffect(() => {
    if (token) {
      const tokenPayload = getTokenPayload();
      if (tokenPayload?.role === "FREELANCER") {
        navigate("/freelancer/dashboard/" + tokenPayload.id);
      } else if (tokenPayload?.role === "CLIENT") {
        navigate("/client/dashboard/" + tokenPayload.id);
      }
    }
  }, [user, token]);

  return (
    <div className="max-w-md mx-auto mt-[13rem] p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <div className="space-y-3 mb-6">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <button
          onClick={handleFacebookLogin}
          className="flex items-center justify-center gap-3 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          <FaFacebook className="text-blue-600 text-xl" />
          <span>Continue with Facebook</span>
        </button>
      </div>

      <div className="text-center text-sm text-gray-400 mb-4">or login with email</div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput label="Email" name="email" type="email" />
          <TextInput label="Password" name="password" type="password" />

          <Button
            type="submit"
            label="Login"
            variant="primary"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg w-full"
          />
        </form>
      </FormProvider>
    </div>
  );
}
