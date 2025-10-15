"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserDetailsContext } from "@/contex/UserDetailsContext";

function Provide({ children }: any) {
  const { user } = useUser();
  const createOrGetUser = useMutation(api.user.createUser);
  const [userCreated, setUserCreated] = useState<any>(null);

  useEffect(() => {
    if (user) createNewUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const createNewUser = async () => {
    if (!user) {
      console.log("No user found in Provide component");
      return;
    }
    try {
      console.log("Creating/getting user for:", {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        imageUrl: user.imageUrl
      });
      
      const result = await createOrGetUser({
        email: user.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user.imageUrl ?? "",
        name: user.fullName ?? "",
      });
      console.log("createOrGetUser result:", result);
      setUserCreated(result); // Set the full user object
    } catch (e) {
      console.error("Error creating/getting user:", e);
    }
  };

  return (
    <UserDetailsContext.Provider value={{ userDetail: userCreated, setUserCreated }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export default Provide;