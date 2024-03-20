"use server"

import { getAdminByEmail, getAdminById } from "@/lib/admin";
import { editUserSchema, loginSchema, userSchema } from "@/schemas";
import * as z from "zod"
import db from "@/lib/db";

import bcrypt from "bcryptjs"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const addAdmin=async(values: z.infer<typeof userSchema>,id:any)=>{
    try {
        const validateFeilds=userSchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        };

        const {fullName,email,role,password}=validateFeilds.data
        
        const existigAdmin=await getAdminByEmail(email);
        if(existigAdmin){
            return {error:"Admin already exists"}
        }
        const hashedPassword=await bcrypt.hash(password,10)
        if(role=="SUPERADMIN"){
            await db.user.create({
                data:{
                    email,
                    fullName,
                    role,
                    password:hashedPassword,
                }
            });

            return {success:"Successfully created superadmin"}
        }else if(role=="ADMIN") {
            if(id!==undefined){

                await db.user.create({
                    data:{
                        email,
                        fullName,
                        role,
                        password:hashedPassword,
                        projects:{
                            connect:{
                                id
                            }
                        }
                    }
                });
            }else{
                await db.user.create({
                    data:{
                        email,
                        fullName,
                        role,
                        password:hashedPassword,
                       
                    }
                });
            }
            

            return {success:"Successfully created admin"}
        }else if(role=="SUBADMIN"){
            if(id!==undefined){

                await db.user.create({
                    data:{
                        email,
                        fullName,
                        role,
                        password:hashedPassword,
                        projects:{
                            connect:{
                                id
                            }
                        }
                    }
                });
            }else{
                await db.user.create({
                    data:{
                        email,
                        fullName,
                        role,
                        password:hashedPassword,
                       
                    }
                });
            }
          


            return {success:"Successfully created subadmin"}
        }

        return {error:"You cannot create other for now"}
        
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}
    }

}


export const editUser=async(values: z.infer<typeof editUserSchema>,id:string)=>{
   try {
    const validateFeilds=editUserSchema.safeParse(values);
    if(!validateFeilds.success){
        return {error:"Invalid feilds"}
    };

    const {fullName,email,role}=validateFeilds.data;

    const user=await getAdminById(id);
    if(!user){
        return {error:"No user found"}
    };

   if(role=="ADMIN"){
    await db.user.update({
        where:{
            id
        },
        data:{
            fullName,
            email,
            role:"ADMIN"
        }
    })
   }

   if(role=="SUBADMIN"){
    await db.user.update({
        where:{
            id
        },
        data:{
            fullName,
            email,
            role:"SUBADMIN"
        }
    })
   }

   return {success:"Successfully updated user"}
    
   } catch (error) {
    return {error:"Something went wrong"}
   }


}

export const login=async(values: z.infer<typeof loginSchema>,callbackUrl?:string|null)=>{
    const validateFeilds=loginSchema.safeParse(values);
    
    if(!validateFeilds.success) return {error:"Invalid feilds"}
    
    const {email,password}=validateFeilds.data;
    const user=await getAdminByEmail(email);
    if(!user){
        return {error:"Invalid credentials"}
    }
    
    const comparePassword=await bcrypt.compare(password,user.password);
    
    if(!comparePassword){
        return {error:"Invalid credentials"}
    
    }
    
    try {
     await signIn("credentials",{email,password,
        redirectTo: callbackUrl||DEFAULT_LOGIN_REDIRECT
        })

    
        
       } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {
                        error:"Invalid credentials!"
                    }
                    default:
                        return {
                            error:"Invalid credentials!"
                        }
                }
            }
            throw error
        }
       }
    