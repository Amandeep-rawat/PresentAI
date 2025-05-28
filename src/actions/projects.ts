
"use server"

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user"
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export const getAllProjects=async()=>{
try{
    const checkUser=await onAuthenticateUser();
    if(checkUser.status!==200 && !checkUser.status){

        return {status:403,error:"user not authenticated"}
    }
    const projects=await client.project.findMany({
        where:{
            userId:checkUser.user?.id,
            isDeleted:false
        },
        orderBy:{
            updatedAt:"desc",
        }
    })
    if(projects.length===0){
        return {status:404,error:"no projects found"}
    }

    return {status:200,data:projects}
}
catch(error){
console.log("error",error);
return {status:500,error:"something went wrong"}
}
}

// export const getRecentProjects=async()=>{
//     try {
//         const checkuser=await onAuthenticateUser();
//         if(checkuser.status!==200 && !checkuser.user){
//             return {status:403,error:"user not authenticated"}
//         }
//         const projects=await client.project.findMany({
//             where:{
//                 userId:checkuser.user?.id,
//                 isDeleted:false,
// },
// orderBy:{
//     updatedAt:"desc",
// },
// take:5
//         })

//         if(projects.length===0){
//             return {status:404,error:"no recent projects found"}
//         }
//         return {status:200,data:projects}
//     } catch (error) {
//         console.log("error",error);
//         return {status:500,error:"something went wrong"}
        
//     }
// }

export const getRecentProjects = async () => {
  try {
    const checkuser = await onAuthenticateUser();

    const userId = checkuser.user?.id;

    if (checkuser.status !== 200 || !userId) {
      return { status: 403, error: 'User not authenticated' };
    }

    const projects = await client.project.findMany({
      where: {
        userId: userId,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });

    if (projects.length === 0) {
      return { status: 404, error: 'No recent projects found' };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.log('error in getRecentProjects:', error);
    return { status: 500, error: 'Something went wrong' };
  }
};

export const recoverProject=async(projectId:string)=>{
    try {
        const checkUser=await onAuthenticateUser();
        if(checkUser.status!==200 && !checkUser.user){
            return {status:403,error:"user not authenticated"}
        }
        const updatedProject=await client.project.update({
            where:{id:projectId},
            data:{
                isDeleted:false,
            }
        })
        if(!updatedProject){
            return {status:500,error:"something went wrong"}
        }
        return {status:200,data:updatedProject}
    } catch (error) {
        console.log("error",error);
        return {status:500,error:"something went wrong"}
        
    }
}

export const deleteProject=async(projectId:string)=>{
try {
    const checkUser=await onAuthenticateUser()

    if(checkUser.status!==200 ||!checkUser.user){
        return {status:403,error:"user not authenticated"}
    }
    const updatedProject=await client.project.update({
        where:{id:projectId},
        data:{
            isDeleted:true,
        }
    })
    if(!updatedProject){
        return {status:500,error:"something went wrong"}
    }
    return {status:200,data:updatedProject}
    
} catch (error) {
    return {status:500,error:"something went wrong"}
}
}


export const createProject=async(title:string,outlines:OutlineCard[])=>{
        try{
            if(!title || !outlines || outlines.length===0){
                return {
                    status:400,error:"Title and outlines are required"
                }

            }
            const allOutlines=outlines.map((outline)=>{
                return outline.title
            })
            const checkUser=await onAuthenticateUser();
            if(checkUser.status!==200 && !checkUser.user){
                return {status:403,error:"user not authenticated"}
            }
            const project=await client.project.create({
                data:{
                    title,
                    createdAt:new Date(),
                    updatedAt:new Date(),
                    userId:checkUser.user!.id,
                    outlines:allOutlines,
    
                },
            })
            if(!project){
                return {status:500,error:"Failed to create project"}
            }
            return {status:200,data:project}
        }catch(error)
{

    return {status:500,error:"something went wrong"}
}}

export const getProjectById=async(projectId:string)=>{
    try {
        const checkUser=await onAuthenticateUser();
        if(checkUser.status!==200 && !checkUser.user){
            return {status:403,error:"user not authenticated"}
        }
        const project=await client.project.findUnique({
            where:{id:projectId},
        })
        if(!project){
            return {status:404,error:"project not found"}
        }
        return {status:200,data:project}
    } catch (error) {
        console.log("error",error);
        return {status:500,error:"something went wrong"}
        
    }
}

export const updateSlides=async(projectId:string,slides:JsonValue)=>{
    try {
        if(!projectId && !slides){
            return {status:400,error:"project id and slides are required"}
        }
        const updatedProject=await client.project.update({
            where:{id:projectId},
            data:{
                slides:slides as Prisma.InputJsonValue
                // updatedAt:new Date()
            }
        }
    )
    if(!updatedProject){
        return {status:500,error:"Failded to update Slide"}
    }
    return {status:200,data:updatedProject}

    } catch (error) {
            return {status:500,error:"something went wrong"}
    }
}

export const updateTheme=async(projectId:string,theme:string)=>{
    try {
        if(!projectId || !theme){
            return {status:400,error:"project id and theme are required"}
        }
        const updatedProject=await client.project.update({
            where:{id:projectId},
            data:{
              themeName:  theme
            },
        })
        if(!updatedProject){
            return {status:500,error:"Failed to update theme"}
        }
        return {status:200,data:updatedProject}
    } catch (error) {
        return {status:500,error:"something went wrong"}
    }
}

export const deleteAllProjects=async(projectIds:string[])=>{
    try {
        if(!Array.isArray(projectIds) || projectIds.length===0)
        {
            return {status:400,error:'No project Ids provided'}
        }

        const checkUser=await onAuthenticateUser()
        if(checkUser.status!==200 && !checkUser.user){
            return {status:403,error:"user not authenticated"}
        }

        const userId=checkUser.user?.id;
        const ProjectsToDelete=await client.project.findMany({
            where:{
                id:{in:projectIds},
                userId:userId,
            },
        
        })
        if(ProjectsToDelete.length===0){
            return {status:404,error:"No projects found"}
        }
        const deletedProjects=await client.project.deleteMany({
            where:{
                id:{in:ProjectsToDelete.map((project)=>project.id)},
                userId:userId,
            }
        })
        if(!deletedProjects){
            return {status:500,error:"Failed to delete projects"}
        }


        return {status:200,message:`${deletedProjects.count} Projects successfully deleted`}
    } catch (error) {
        return {status:500,error:"something went wrong"}
    }
}

export const getDeletedProjects=async()=>{
    try {
        const checkuser=await onAuthenticateUser();
        if(checkuser.status!==200 && !checkuser.user){
            return {status:403,error:"user not authenticated"}
        }
        const projects=await client.project.findMany({
            where:{
                userId:checkuser.user?.id,
                isDeleted:true
            },
            orderBy:{
                updatedAt:"desc",
            }
        })
        if(projects.length===0){
            return {status:404,message:"no deleted projects found"}
        }
        return {status:200,data:projects}
    } catch (error) {
        return {status:500,error:"something went wrong"}
        
    }
}