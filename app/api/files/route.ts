import { NextResponse } from "next/server";

import path from "path";
import fs from "fs"

export async function GET(){
    const publicDir=path.join(process.cwd(), "public");
    const filesAndFolders = fs.readdirSync(publicDir);
    console.log(filesAndFolders);
    try {
return NextResponse.json({message:"yes  "})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}