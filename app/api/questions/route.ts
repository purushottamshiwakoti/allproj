import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = "force-dynamic";
export async function GET(req:NextRequest){
    try {
        const token=await req.headers
        const bearerToken=token.get("Authorization")?.split(" ")[1]
        const verifyToken=await db.token.findUnique({
            where:{
                token:bearerToken
            }
        });

        if(!verifyToken){
            return NextResponse.json({message:"Invalid token"},{status:403})
        }

        const project=await db.project.findUnique({
            where:{
                id:verifyToken.projectId!
            }
        });

        if(!project){
            return NextResponse.json({message:"Invalid project"},{status:403})
        }

        const { searchParams } = new URL(req.url);
        let pgnum = +(searchParams.get("pgnum") ?? 1); // Start pagination from page 1
        const pgsize = +(searchParams.get("pgsize") ?? 20);
        const questions=await db.question.findMany({
            skip: (pgnum - 1) * pgsize, 
            take: pgsize,
            orderBy: {
                updated_at: "desc"
            },
            where:{
                projectId:project.id
            }
        });

        return NextResponse.json({message:"Successfully fetched questions",questions},{status:200})

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
    
}