import * as zod from "zod";

export let schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is Required")
      .min(3, "altleast 3 characters")
      .max(20, "maximum 20 characters"),
    username: zod
      .string()
      .nonempty("User Name is Required")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{5,}$/),

    email: zod.string().nonempty("Email is Required").email("Invalid Email"),
    password: zod
      .string()
      .nonempty("Password is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character",
      ),
    gender: zod.string().nonempty("Gender is Required"),
    dateOfBirth: zod.coerce
      .date("Date of Birth is Required")
      .refine((userDate) => {
        const currentYear = new Date().getFullYear();
        const userYear = userDate.getFullYear();
        const age = currentYear - userYear;
        return age >= 18;
      }, "You must be 18 or older"),
    rePassword: zod.string().nonempty("Confirm Password is Required"),
  })
  .refine(
    (obj) => {
      if (obj.rePassword === obj.password) {
        return true;
      } else {
        return false;
      }
    },
    {
      path: ["rePassword"],
      message: "It Doesn't match the previuse password",
    },
  );
