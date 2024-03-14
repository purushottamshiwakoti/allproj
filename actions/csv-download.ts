"use server"

import db from "@/lib/db";

export const downloadFiles=async(id:any)=>{

    const data=await db.files.findMany({
        where:{
subFolderId:id
        }
    })

        if (data.length === 0) {
            throw new Error("No files found");
        }

   
    const csv = [
        Object.keys(data[0]).join(","),
        ...data.map((obj) => Object.values(obj).join(",")),
      ].join("\n");
      const csvContent = csv;
      return csvContent
}

export const downloadQuestions = async (id: any) => {
    // Default values for headers
    const defaultValues = {
        SN:"",
        question: "",
        questionImage: "",
        questionAudio: "",
        questionVideo: "",
        option: "",
        optionCorrect: false,
        optionImage: "",
        optionAudio: "",
        optionVideo: "",
        option1: "",
        option1Correct: false,
        option1Image: "",
        option1Audio: "",
        option1Video: "",
        option2: "",
        option2Correct: false,
        option2Image: "",
        option2Audio: "",
        option2Video: "",
        option3: "",
        option3Correct: false,
        option3Image: "",
        option3Audio: "",
        option3Video: "",
        categoryId: "",
        subCategoryId: "",
        typeOfQuestionId: "",
        projectId: "",
    };

    // Headers for questions
    const questionHeaders = Object.keys(defaultValues).join(",");

    // Fetch questions from the database
    const data = await db.question.findMany({
        where: {
            projectId: id
        }
    });

    // Check if any questions were found
    if (data.length === 0) {
        throw new Error("No questions found for this project ID");
    }

    // Convert the data to CSV format with headers
    const csvContent = [
        ...data.map((obj) => Object.values(obj).join(","))
    ].join("\n");

    // Return the CSV content
    return csvContent;
}