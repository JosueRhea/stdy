"use client";
import { createUser } from "@stdy/api";
import { signIn } from "next-auth/react";

function Page() {
  const handleOnSubmit = async (formData: FormData) => {
    const data = await createUser(formData);
    console.log(data);
  };

  const login = async (formData: FormData) => {
    const { email, password } = Object.fromEntries(formData.entries());
    console.log({ email, password });
    await signIn("credentials", {
      email,
      password,
      callbackUrl: window.location.origin,
    })
      .then((resp) => {
        console.log({ resp });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div>
      <form action={handleOnSubmit}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">signIn</button>
      </form>
      <form action={login}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Page;
