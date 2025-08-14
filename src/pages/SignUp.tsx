import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { signupSchema } from "../schemas/signupSchema";
import TextInput from "../components/form-components/TextInput";
import Button from "../components/form-components/SubmitButton";
import SingleRadioButton from "../components/form-components/RadioGroup";
import { registerRequest, setRole } from "../features/auth/authSlice";
import { RootState } from "../state/rootReducer";
import { RegisterPayload } from "../types/auth.types";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
// import { RootState } from "../store";
// import { signupRequest } from "../features/auth/authSlice";

type FormData = {
  name: string;
  email: string;
  password: string;
  role?: "client" | "freelancer"; // <- optional in type
};

export default function SignUp() {
  const dispatch = useDispatch();
  const selectedRole: any = useSelector((state: RootState) => state.auth.selectedRole);
  const [proceed, setProceed] = useState(false);
  console.log(selectedRole);

  const methods = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      //   role: selectedRole ?? undefined,
    },
  });

  const { handleSubmit, setValue } = methods;

  // Update role in form state when Redux role changes
  useEffect(() => {
    if (selectedRole) {
      setValue("role", selectedRole);
    }
  }, [selectedRole]);

  const handleRoleSelect = (role: "client" | "freelancer") => {
    dispatch(setRole(role));
  };

  const onSubmit = (data: Omit<RegisterPayload, "role">) => {
    if (!selectedRole) {
      console.warn("Role not selected");
      return;
    }

    const finalData: RegisterPayload = {
      ...data,
      role: selectedRole.toUpperCase(),
    };

    console.log("Final Signup Data with Role:", finalData);
    dispatch(registerRequest(finalData));
  };

  if (!proceed) {
    return (
      <div className="max-w-xl mx-auto mt-[13rem] p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">Join as a client or freelancer</h2>

        <FormProvider {...methods}>
          <div className="space-y-6">
            <div className="flex justify-center items-center mb-6 gap-10">
              <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
                {/* Freelancer Card */}
                <label
                  className={`relative flex items-center gap-4 p-[2rem] border rounded-lg cursor-pointer transition-all
      ${selectedRole === "freelancer" ? "border-indigo-600 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="50px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="#4f46e5"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                  </svg>
                  {/* Radio button */}
                  <input
                    type="radio"
                    name="role"
                    value="freelancer"
                    className="absolute top-3 right-3 w-5 h-5 accent-indigo-600"
                    onChange={() => handleRoleSelect("freelancer")}
                    checked={selectedRole === "freelancer"}
                  />

                  {/* Icon */}

                  <h4 className="text-xl font-medium text-gray-700">I’m a freelancer, looking for work</h4>
                </label>

                {/* Client Card */}
                <label
                  className={`relative flex items-center gap-4 p-[2rem] border rounded-lg cursor-pointer transition-all
      ${selectedRole === "client" ? "border-indigo-600 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="50px"
                    viewBox="0 -960 960 960"
                    width="35px"
                    fill="#4f46e5"
                    style={{ position: "absolute", top: 0, left: 3 }}
                  >
                    <path d="M42-120v-112q0-33 17-62t47-44q51-26 115-44t141-18q77 0 141 18t115 44q30 15 47 44t17 62v112H42Zm80-80h480v-32q0-11-5.5-20T582-266q-36-18-92.5-36T362-320q-71 0-127.5 18T142-266q-9 5-14.5 14t-5.5 20v32Zm240-240q-66 0-113-47t-47-113h-10q-9 0-14.5-5.5T172-620q0-9 5.5-14.5T192-640h10q0-45 22-81t58-57v38q0 9 5.5 14.5T302-720q9 0 14.5-5.5T322-740v-54q9-3 19-4.5t21-1.5q11 0 21 1.5t19 4.5v54q0 9 5.5 14.5T422-720q9 0 14.5-5.5T442-740v-38q36 21 58 57t22 81h10q9 0 14.5 5.5T552-620q0 9-5.5 14.5T532-600h-10q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T442-600H282q0 33 23.5 56.5T362-520Zm300 160-6-30q-6-2-11.5-4.5T634-402l-28 10-20-36 22-20v-24l-22-20 20-36 28 10q4-4 10-7t12-5l6-30h40l6 30q6 2 12 5t10 7l28-10 20 36-22 20v24l22 20-20 36-28-10q-5 5-10.5 7.5T708-390l-6 30h-40Zm20-70q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm72-130-8-42q-9-3-16.5-7.5T716-620l-42 14-28-48 34-30q-2-5-2-8v-16q0-3 2-8l-34-30 28-48 42 14q6-6 13.5-10.5T746-798l8-42h56l8 42q9 3 16.5 7.5T848-780l42-14 28 48-34 30q2 5 2 8v16q0 3-2 8l34 30-28 48-42-14q-6 6-13.5 10.5T818-602l-8 42h-56Zm28-90q21 0 35.5-14.5T832-700q0-21-14.5-35.5T782-750q-21 0-35.5 14.5T732-700q0 21 14.5 35.5T782-650ZM362-200Z" />
                  </svg>
                  {/* Radio button */}
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    className="absolute top-3 right-3 w-5 h-5 accent-indigo-600"
                    onChange={() => handleRoleSelect("client")}
                    checked={selectedRole === "client"}
                  />

                  {/* Icon */}

                  <h4 className="text-xl font-medium text-gray-700">I’m a client, hiring for a project</h4>
                </label>
              </div>
            </div>

            <Button
              label={
                selectedRole === "freelancer"
                  ? "Join as a freelancer"
                  : selectedRole === "client"
                  ? "Join as a client"
                  : "Select your role to continue"
              }
              variant="primary"
              onClick={() => setProceed(true)}
              disabled={!selectedRole}
              className={` ${
                selectedRole
                  ? "bg-primary hover:bg-indigo-700 px-4 py-2 rounded text-white font-medium transition-all duration-200"
                  : "bg-gray-200 cursor-not-allowed px-4 py-2 rounded text-gray-400 font-medium transition-all duration-200"
              }`}
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-indigo-600 hover:underline font-medium">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </FormProvider>

        {selectedRole && (
          <div className="mt-6 p-4 bg-light rounded-lg border-l-4 border-primary">
            <p className="text-sm text-gray-600">
              {selectedRole === "freelancer"
                ? "Great! You'll be able to browse projects and submit proposals."
                : "Perfect! You can post projects and hire freelancers."}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-[13rem] p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up as {selectedRole}</h2>

      {/* Social Auth Buttons */}
      <div className="space-y-3 mb-6">
        <button
          //   onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <button
          //   onClick={handleFacebookLogin}
          className="flex items-center justify-center gap-3 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          <FaFacebook className="text-blue-600 text-xl" />
          <span>Continue with Facebook</span>
        </button>
      </div>

      <div className="text-center text-sm text-gray-400 mb-4">or sign up with email</div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput label="Name" name="name" type="text" />
          <TextInput label="Email" name="email" type="email" />
          <TextInput label="Password" name="password" type="password" />
          <input type="hidden" {...methods.register("role")} />

          <Button
            type="submit"
            label="Sign Up"
            variant="primary"
            className="bg-primary hover:bg-indigo-700 px-4 py-2 rounded text-white font-medium transition-all duration-200 w-full"
          />
        </form>
      </FormProvider>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
