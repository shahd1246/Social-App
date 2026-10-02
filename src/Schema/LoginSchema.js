import * as zod from "zod";

export let loginSchema = zod.object({
  email: zod.string().nonempty("Email is Required").email("Invalid Email"),
  password: zod
    .string()
    .nonempty("Password is Required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});
