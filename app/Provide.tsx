"use client";
import { UserDetailsContext } from '@/contex/UserDetailsContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { create } from 'domain';
import React, { createContext, use, useEffect, useState } from 'react'
import { log } from 'util';



function Provide({ children }: any) {
     const {user}=useUser();
    const createUser = useMutation(api.user.createUser);
    const [userCreated, setUserCreated] = useState<any>();

    useEffect(() => {
       user && createNewUser();
    }, [user]);

    const createNewUser = async () => {
        if (user) {
            const result = await createUser({
                email: user.primaryEmailAddress?.emailAddress ?? '',
                imageUrl: user.imageUrl ?? '',
                name: user.fullName ?? ''
            });
            console.log(result);
            setUserCreated(result);
        }
    }
  const userDetail = userCreated;
  return (
    <UserDetailsContext.Provider value={{userDetail, setUserCreated}} >
      <div> {children}</div>
    </UserDetailsContext.Provider>
  )
}

export default Provide


export const useUserDetailsContext = () => {
  return createContext(UserDetailsContext);
}