"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { validateInsertUser } from "@stdy/db/src/schema";
import { hashPassword } from "../shared/hash";
import { db, eq, schema } from "@stdy/db";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function createUser(formData: FormData) {
  try {
    const data = validateInsertUser(Object.fromEntries(formData.entries()));

    if (!data.success) {
      return { success: data.success, inputs: data.errors };
    }

    const userExists = await db.query.users.findFirst({
      where: eq(schema.users.email, data.output.email),
    });

    if (userExists) {
      return { success: false, error: { message: "User already exists" } };
    }

    data.output.password = await hashPassword(data.output.password);
    const newUser = await db
      .insert(schema.users)
      .values(data.output)
      .returning();

    return { success: true, data: { id: newUser[0].id } };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: { message: "Something went wrong creating the user" },
    };
  }
}
