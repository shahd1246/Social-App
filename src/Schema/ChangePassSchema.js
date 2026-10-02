import * as zod from "zod"

export let ChangePassSchema = zod.object({
  password: zod
    .string()
    .nonempty("Current Password is Required")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  newPassword: zod
    .string()
    .nonempty("New Password is Required")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});