

import * as zod from "zod";
 export const RegisterSchema = zod.object({

  name: zod
    .string()
    .nonempty("name is required")
    .min(3, "min length is 3 chars")
    .max(15, "max length is 15 chars"),

  email: zod
    .email()
    .nonempty("email is required")
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "invalid email",
    ),

  dateOfBirth: zod
    .string()
    .nonempty("data is required")
    .refine((value) => {
        const birthYear = new Date(value).getFullYear();
        const age = new Date().getFullYear() - birthYear;
        return age >= 10;
      }, "You must be at least 10 years old"),

    gender:zod.enum([ "male" ,"female"]) ,

    password :zod
    .string()
    .nonempty("password is required")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be 8+ characters with uppercase, lowercase, number, and special character"
    ) ,

    rePassword :zod
    .string()
    .nonempty("repassword is required")
 }).refine((obj) => obj.password === obj.rePassword, {
    path: ["rePassword"],
    message: "password and rePassword not match",
  });




 export type RegisterSchemaInterface = zod.infer<typeof RegisterSchema>

 //////////////////////////////////////////////////////////

 export const LoginSchema = zod.object({
  email: zod
    .email()
    .nonempty("email is required")
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "invalid email",
    ),
    password :zod
    .string()
    .nonempty("password is required")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be 8+ characters with uppercase, lowercase, number, and special character"
    ) ,

   
 })




 export type LoginSchemaInterface = zod.infer<typeof LoginSchema>