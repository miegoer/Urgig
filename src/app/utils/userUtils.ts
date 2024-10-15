import { User } from "@/types/user";

export const getUser = async (userId: string) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};
