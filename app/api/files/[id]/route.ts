import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"; // Import fs promises for async file operations
import db from "@/lib/db";

export async function POST(req: NextRequest, params:     any) {
    try {
        const folder = await db.subFolder.findUnique({
            where: {
                id: params.params.id
            }
        });

        if (!folder) {
            return NextResponse.json({ message: "No folder found" }, { status: 404 });
        }

        const folderName = folder.slug;

        const data: any = await req.formData();
        console.log(data);

        let projectName: string | undefined;

        for (const [name, file] of data.entries()) {
            if (name === "projectId") {
                const project = await db.project.findUnique({
                    where: {
                        id: file
                    }
                });

                projectName = project?.slug;
            }

            if (!projectName) {
                return NextResponse.json({ message: "Project name not found" }, { status: 400 });
            }
            console.log(projectName)

            if (file && typeof file === "object") {
                console.log(file)
                const byteData = await file.arrayBuffer();
                const buffer = Buffer.from(byteData);
                console.log(buffer) 
                const filePath = path.join(process.cwd(), "public", projectName, folderName, file.name);
                console.log(filePath);

                try {
                    await fs.writeFile(filePath, buffer);
                    
   const fileName=`${projectName}/${folderName}/${file.name}`

   await db.files.create({
                    data:{
                        name:fileName,
                        slug:fileName,
                        subFolderId:folder.id
                    }
                })


                } catch (error) {
                    console.error("Error writing file:", error);
                    return NextResponse.json({ message: "Error writing file", error }, { status: 500 });
                }
            }
        }

        return NextResponse.json({ message: "Files saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("error is", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
