import { cookies } from "next/headers";
import { newproject } from "@/lib/types";
export async function POST(request:Request){
    try{
        const requestBody=await request.json();
        const cookiestore=cookies();
        const accessToken=cookiestore.get('accessToken')?.value;
        if(!accessToken){
            return Response.json({status:"400",message:"You are not logged in"});
        }
        const {user,title,description,skills,categories,maxprice,minprice,client_name,client_country}=requestBody;
        const projectDetails:newproject={
            user:user,
            title:title,
            description:description,
            skills:skills,
            categories:categories,
            maxprice:maxprice,
            minprice:minprice,
            cleint_name:client_name,
            client_country:client_country
        }
        const response=await fetch('http://13.233.248.208:3000/api/v1/project/createProject',{
            method:'POST',
            headers:{
                'authorization':accessToken,
                'content-type':'application/json',
            },
            body:JSON.stringify({
                title:projectDetails.title,
                description:projectDetails.description,
                client_id:projectDetails.user,
                max_budget:projectDetails.maxprice,
                min_budget:projectDetails.minprice,
                client_name:projectDetails.cleint_name,
                skills:projectDetails.skills,
                categories:projectDetails.categories,
                clientCountry:client_country
            })
        })
        const res=await response.json();
        return Response.json(res);
    }
    catch(err){
        if(err instanceof Error){
            return Response.json({status:"400",message:err.message})
        }
        else return Response.json({status:"400",message:"Unexpected Server Error"})
    }
}