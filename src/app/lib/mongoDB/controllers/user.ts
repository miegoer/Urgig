//moved to api/(DB)/user/[id]

// import { User } from "@/types/user";
// import dbConnect from "../dbConnect";
// import { UserModel } from "../models/userModel";
// import { UserZodSchema } from "../../zodSchemas/userSchema";

// export async function addUser(user: User) {
//   try {
//     const validatedUser = UserZodSchema.parse(user);

//     await dbConnect(); // Ensure database connection is established

//     const newUser = await UserModel.create({ ...validatedUser });
//     return newUser;
//   } catch (error) {
//     console.error("Failed to add user:", error);
//     throw new Error("Failed to add user to DB");
//   }
// }

// export async function updateUser(user: User) {
//   try {
//     const validatedUser = UserZodSchema.parse(user);

//     await dbConnect(); // Ensure database connection is established

//     const currentUser = await UserModel.findById({ _id: validatedUser._id });

//     if (!currentUser) {
//       throw new Error("User not found");
//     }

//     // Update the fields of the current user with validated data
//     Object.assign(currentUser, validatedUser);
//     await currentUser.save();

//     return currentUser;
//   } catch (error) {
//     console.error("Failed to update user", error);
//     throw new Error("Failed to update user to DB");
//   }
// }

// // export async function getUserById(userId: string) {
// //   const UserIdZodSchema = UserZodSchema.pick({ _id: true });
// //   try {
// //     const validatedUserId = UserIdZodSchema.parse({ _id: userId });

// //     await dbConnect(); // Ensure database connection is established

// //     const currentUser = await UserModel.findOne({ _id: validatedUserId });

// //     if (!currentUser) {
// //       throw new Error("User not found");
// //     }

// //     return currentUser;
// //   } catch (error) {
// //     console.error("Failed to get user by id:", error);
// //     throw new Error("Failed to get user by id from DB");
// //   }
// // }

// // export async function getUserByEmail(userEmail: string) {
// //   const UserEmailZodSchema = UserZodSchema.pick({ email: true });
// //   try {
// //     const validatedUserEmail = UserEmailZodSchema.parse({ email: userEmail });

// //     await dbConnect(); // Ensure database connection is established

// //     const currentUser = await UserModel.findOne({ email: validatedUserEmail });

// //     if (!currentUser) {
// //       throw new Error("User not found");
// //     }
// //     return currentUser;
// //   } catch (error) {
// //     console.error("Failed to get user by email:", error);
// //     throw new Error("Failed to get user by email from DB");
// //   }
// // }

// export async function deleteUser(userId: string) {
//   const UserIdZodSchema = UserZodSchema.pick({ _id: true });
//   try {
//     const validatedUserId = UserIdZodSchema.parse({ _id: userId });

//     await dbConnect(); // Ensure database connection is established

//     const deletedUser = await UserModel.deleteOne({ _id: validatedUserId });

//     if (!deletedUser) {
//       throw new Error("User not found");
//     }

//     return deletedUser;
//   } catch (error) {
//     console.error("Failed to get user by id:", error);
//     throw new Error("Failed to get user by id from DB");
//   }
// }
