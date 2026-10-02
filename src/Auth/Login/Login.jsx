import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { loginSchema } from "../../Schema/LoginSchema";
import { AuthContext } from "../../Context/AuthContext";
import { Eye, EyeSlash } from "@gravity-ui/icons";

export default function Login() {
  let { setUserToken ,setUserData } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });
  const password = watch("password");

  const requirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number (0-9)",
      valid: /[0-9]/.test(password),
    },
    {
      label: "One special character (#?!@$%^&*-)",
      valid: /[#?!@$%^&*-]/.test(password),
    },
  ];
  const [apiError, setApiError] = useState(null);
  const [apiSucess, setApiSucess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  function submitForm(userData) {
     setApiError(null);
     setApiSucess(null);
    setIsLoading(true);
    console.log(userData);
    axios
      .post("https://route-posts.routemisr.com/users/signin", userData)
      .then((response) => {
        console.log(response);
        if (response.data.message === "signed in successfully") {
          setApiSucess(response.data.message);
          setUserToken(response.data.data.token);
          setUserData(response.data.data.user);

          localStorage.setItem("token", response.data.data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setApiError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <div className="bg-gray-200 min-h-screen py-9 flex justify-center  ">
        <div className="lg:w-1/2 w-full bg-white h-fit rounded-lg lg:mx-auto mx-9 py-5">
          <h2 className="text-sky-600 font-bold text-2xl text-center">
            Login Now
          </h2>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col gap-6 p-5"
          >
            <div>
              <Input
                {...register("email")}
                aria-label="Email"
                className="w-full"
                placeholder="Enter your Email"
              />

              {formState.errors.email && formState.touchedFields.email ? (
                <p className="text-sm pt-2 pl-2 text-red-500">
                  {formState.errors.email?.message}
                </p>
              ) : null}
            </div>
            <div>
              <div className="relative w-full">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  aria-label="Password"
                  className="w-full"
                  placeholder="Enter your Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                </button>
              </div>

              {password.length > 0 && formState.touchedFields.password && formState.errors.password && (
                  <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                    <p className="mb-2 text-sm font-semibold text-neutral-700">
                      Password requirements
                    </p>

                    <ul className="space-y-2">
                      {requirements.map((item, index) => (
                        <li
                          key={index}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            item.valid ? "text-green-600" : "text-neutral-500"
                          }`}
                        >
                          {item.valid ? (
                            <span className="font-bold">✓</span>
                          ) : (
                            <span className="text-neutral-400">○</span>
                          )}
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {apiError ? (
              <div className="bg-red-600 text-white font-bold rounded-md py-3  text-center">
                {apiError}
              </div>
            ) : null}
            {apiSucess ? (
              <div className="bg-green-600 text-white font-bold rounded-md py-3  text-center">
                {apiSucess}
              </div>
            ) : null}
            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full my-1 text-lg "
            >
              {isLoading ? (
                <Bars
                  height="80"
                  width="80"
                  color="white"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
