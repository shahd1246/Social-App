import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../../Schema/RegisterSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "../../Context/AuthContext";
import { Eye, EyeSlash } from "@gravity-ui/icons";

export default function Register() {
  let { setUserToken, setUserData } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordComfirm, setShowPasswordComfirm] = useState(false);
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const password = watch("password");
  const userName = watch("username");
  const userNameRequirements = [
    {
      label: "At least 5 characters",
      valid: userName.length >= 5,
    },
    {
      label: "One letter",
      valid: /[A-Z]/.test(userName) || /[a-z]/.test(userName),
    },
    {
      label: "One number (0-9)",
      valid: /[0-9]/.test(userName),
    },
  ];
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
    setIsLoading(true);
    console.log(userData);
    axios
      .post("https://route-posts.routemisr.com/users/signup", userData)
      .then((response) => {
        console.log(response);
        if (response.data.message === "account created") {
          setApiSucess(response?.data.message);
          setUserToken(response?.data.data.token);
          setUserData(response.data.data.user);
          localStorage.setItem("token", response.data.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response?.data.message);
        setApiError(error.response?.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <div className="bg-gray-200 py-9 flex justify-center min-h-screen ">
        <div className="lg:w-1/2 w-full bg-white h-fit rounded-lg lg:mx-auto mx-9 py-5">
          <h2 className="text-sky-600 font-bold text-2xl text-center">
            Register Now
          </h2>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col gap-6 p-5"
          >
            <div>
              <Input
                {...register("name")}
                aria-label="Name"
                className="w-full"
                placeholder="Enter your Name"
              />
              {formState.errors.name && formState.touchedFields.name ? (
                <p className="text-sm pt-2 pl-2 text-red-500">
                  {formState.errors.name?.message}
                </p>
              ) : null}
            </div>
            <div>
              <Input
                {...register("username")}
                aria-label="userName"
                className="w-full"
                placeholder="Enter your User Name"
              />
              {userName.length > 0 &&
                formState.touchedFields.username &&
                formState.errors.username && (
                  <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                    <p className="mb-2 text-sm font-semibold text-neutral-700">
                      User Name requirements
                    </p>

                    <ul className="space-y-2">
                      {userNameRequirements.map((item, index) => (
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
                  type={showPasswordComfirm ? "text" : "password"}
                  aria-label="Password"
                  className="w-full"
                  placeholder="Enter your Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPasswordComfirm((prev) => !prev)}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPasswordComfirm ? (
                    <Eye size={20} />
                  ) : (
                    <EyeSlash size={20} />
                  )}
                </button>
              </div>

              {password.length > 0 &&
                formState.touchedFields.password &&
                formState.errors.password && (
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
            <div>
              <div className="relative w-full">
                <Input
                  {...register("rePassword")}
                  type={showPassword ? "text" : "password"}
                  aria-label="rePassword"
                  className="w-full"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                </button>
              </div>

              {formState.errors.rePassword &&
              formState.touchedFields.rePassword ? (
                <p className="text-sm pt-2 pl-2 text-red-500">
                  {formState.errors.rePassword?.message}
                </p>
              ) : null}
            </div>
            <div className="grid lg:grid-cols-2 items-center grid-cols-1 gap-5">
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>

                <input
                  {...register("dateOfBirth")}
                  id="dateOfBirth"
                  type="date"
                  lang="en"
                  aria-label="Date of Birth"
                  className="block w-full rounded-xl border border-gray-300
      bg-white px-3 py-3 text-gray-900 shadow-sm
      focus:border-sky-600 focus:outline-none
      focus:ring-2 focus:ring-sky-600"
                />

                {formState.errors.dateOfBirth &&
                  formState.touchedFields.dateOfBirth && (
                    <p className="text-sm pt-2 pl-2 text-red-500">
                      {formState.errors.dateOfBirth.message}
                    </p>
                  )}
              </div>
              <div>
                <select
                  {...register("gender")}
                  defaultValue=""
                  className="block w-full px-3 py-2 bg-neutral-secondary-medium text-black rounded-xl  text-heading text-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 shadow-sm placeholder:text-body"
                >
                  <option value="" disabled>
                    Choose Gender
                  </option>

                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {formState.errors.gender && formState.touchedFields.gender ? (
                  <p className="text-sm pt-2 pl-2 text-red-500">
                    {formState.errors.gender?.message}
                  </p>
                ) : null}
              </div>
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
