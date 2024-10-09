import { model, models } from "mongoose";
import { UserDoc, UserSchema } from "../schemas/userSchema";

export const UserModel = models.User || model<UserDoc>("User", UserSchema);
