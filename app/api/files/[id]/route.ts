import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs"; // Import fs for synchronous file operations
import db from "@/lib/db";
import { exec } from "child_process";


export async function POST(req: NextRequest, params: any) {
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
        let projectName: string | undefined;
        const promises = [];

        for await (const [name, file] of data.entries()) {
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

            if (file && typeof file === "object") {
                const fileName = file.name;
                const filePath = path.join(process.cwd(), "public", projectName, folderName, fileName);

                // Read file content
                const fileContent = await file.arrayBuffer();
                
                // Write file to disk asynchronously
                promises.push(
                    new Promise<void>((resolve, reject) => {
                        fs.writeFile(filePath, Buffer.from(fileContent), (error) => {
                            if (error) {
                                reject(error);
                            } else {
                                const fileNameWithPath = `${projectName}/${folderName}/${fileName}`;
                                db.files.create({
                                    data: {
                                        name: fileNameWithPath,
                                        slug: fileNameWithPath,
                                        subFolderId: folder.id
                                    }
                                }).then(() => resolve()).catch(reject);
                            }
                        });
                    })
                );
            }
        }

        // Wait for all file saving operations to complete
        await Promise.all(promises);
        restartServer();
        return NextResponse.json({ message: "Files saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

async function restartServer() {
    // Use PM2 to restart the Node.js process
    exec("pm2 restart myapp", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error restarting server: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr while restarting server: ${stderr}`);
            return;
        }
        console.log(`Server restarted successfully: ${stdout}`);
    });
}