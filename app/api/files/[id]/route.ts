import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"; // Import fs promises for async file operations
import db from "@/lib/db";
import { exec } from 'child_process'; // Import exec for executing shell commands

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

            if (file && typeof file === "object") {
                const byteData = await file.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const filePath = path.join(process.cwd(), "public", projectName, folderName, file.name);

                // Write file to disk asynchronously
                promises.push(
                    fs.writeFile(filePath, buffer)
                        .then(async () => {
                            const fileName = `${projectName}/${folderName}/${file.name}`;
                            await db.files.create({
                                data: {
                                    name: fileName,
                                    slug: fileName,
                                    subFolderId: folder.id
                                }
                            });
                        })
                        .catch(error => {
                            console.error("Error writing file:", error);
                            throw error;
                        })
                );
            }
        }

        // Wait for all file saving operations to complete
        await Promise.all(promises);

        // Execute pm2 restart command
        exec("pm2 restart myapp", (error, stdout, stderr) => {
            if (error || stderr) {
                const errorMessage = error ? error.message : '';
                const stderrMessage = stderr ? stderr.toString() : '';
                console.error(`Error executing pm2 restart myapp: ${errorMessage}\n${stderrMessage}`);
            } else {
                console.log(`pm2 restart myapp output: ${stdout}`);
            }
        });

        return NextResponse.json({ message: "Files saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
