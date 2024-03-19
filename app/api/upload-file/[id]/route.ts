// Import required modules
import fs from 'fs';
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { exec } from 'child_process'; // Import exec for executing shell commands

export async function POST(req: NextRequest, params: any) {
  try {
    const data: any = await req.formData();
    const project = await db.project.findUnique({
      where: {
        id: params.params.id
      }
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    const projectFolder = project.slug;
    const commandsToExecute = [];

    for (const [name, file] of data.entries()) {
      if (file && typeof file === "object") {
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);
        let fileName = file.name;
        let fileNumber = 1;
        let filePath = path.join(process.cwd(), "public", projectFolder, fileName);

        while (fs.existsSync(filePath)) {
          const extensionIndex = fileName.lastIndexOf(".");
          const extension = fileName.substring(extensionIndex);
          const baseName = fileName.substring(0, extensionIndex);
          fileName = `${baseName}_${fileNumber}${extension}`;
          fileNumber++;
          filePath = path.join(process.cwd(), "public", projectFolder, fileName);
        }

        const relativePath = path.relative(path.join(process.cwd(), "public"), filePath);
        fs.writeFileSync(filePath, buffer);
        commandsToExecute.push(`pm2 restart myapp`);
      }
    }

    // Execute the PM2 restart command once all files have been processed
    exec(commandsToExecute.join(" && "), (error, stdout, stderr) => {
      if (error || stderr) {
        const errorMessage = error ? error.message : '';
        const stderrMessage = stderr ? stderr.toString() : '';
        console.log(`Error executing pm2 restart myapp: ${errorMessage}\n${stderrMessage}`);
      }
      console.log(`pm2 restart myapp output: ${stdout}`);
    });

    return NextResponse.json({ message: "Files uploaded successfully" }, { status: 200 });

  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: "Something went wrong while uploading files" }, { status: 500 });
  }
}
