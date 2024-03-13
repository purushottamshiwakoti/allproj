import fs from 'fs';
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest, params: any) {
  try {
    const data: any = await req.formData();
    const project = await db.project.findUnique({
      where: {
        id: params.params.id
      }
    });
    if (!project) {
      return NextResponse.json({
        message: "Project not found"
      }, { status: 404 });
    }
    const projectFolder = project.slug;
    for (const [name, file] of data.entries()) {
      if (file && typeof file === "object") {
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);
        let fileName = file.name;
        let fileNumber = 1;
        let filePath = path.join(process.cwd(), "public", projectFolder, fileName);
        
        // Check if the file path already exists
        while (fs.existsSync(filePath)) {
          const extensionIndex = fileName.lastIndexOf(".");
          const extension = fileName.substring(extensionIndex);
          const baseName = fileName.substring(0, extensionIndex);
          fileName = `${baseName}_${fileNumber}${extension}`;
          fileNumber++;
          filePath = path.join(process.cwd(), "public", projectFolder, fileName);
        }
        
       const relativePath = path.relative(path.join(process.cwd(), "public"), filePath);
        
        // Write the file to disk
        fs.writeFileSync(filePath, buffer);
        return NextResponse.json({ relativePath }, { status: 200 });
      }
    }
  } catch (error) {
    console.log("error is", error);
    return NextResponse.json({ message: "Something went wrong while uploading file" }, { status: 500 });
  }
}
