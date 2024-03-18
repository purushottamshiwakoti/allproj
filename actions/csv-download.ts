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
  

    // Fetch questions from the database
    const data = await db.question.findMany({
        where: {
            projectId: id
        }
    });

    // Check if any questions were found
    if (data.length === 0) {
        throw new Error("No files found");
    }
    console.log(data)
    const filteredData=data.map((item,index)=>(
        {
            SN:index+1,
            typeOfQuestionId:item.typeOfQuestionId,
            categoryId:item.categoryId,
            subCategoryId:item.subCategoryId,
            correctOption:item.correctOption,
            question:item.question,
            questionImage:item.questionImage,
            questionAudio:item.questionAudio,
            questionVideo:item.questionVideo,
            option:item.option,
            optionImage:item.optionImage,
            optionAudio:item.optionAudio,
            optionVideo:item.optionVideo,
            option1:item.option1,
            option1Image:item.option1Image,
            option1Audio:item.option1Audio,
            option1Video:item.option1Video,
            option2:item.option2,
            option2Image:item.option2Image,
            option2Audio:item.option2Audio,
            option2Video:item.option2Video,
            option3:item.option3,
            option3Image:item.option3Image,
            option3Audio:item.option3Audio,
            option3Video:item.option3Video
            
        }
    ))


const csv = [
    Object.keys(filteredData[0]).join(","),
    ...filteredData.map((obj) => Object.values(obj).join(",")),
  ].join("\n");
  const csvContent = csv;
  return csvContent
 
}