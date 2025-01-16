import { cookies } from "next/headers";

export async function POST(request:Request){
    try{
        const cookiestore=cookies();
        const requestBody=await request.json();
        const {educationId}= requestBody;
        const accessToken=cookiestore.get('accessToken')?.value;
        if(!accessToken){
            return Response.json({status:"400",message:"You are not Logged In"})
        }
        const response=await fetch('http://3.6.34.255:3000/api/v1/user/deleteEducation',{
            method:'POST',
            headers:{
                'authorization':accessToken,
                'content-type':'application/json',
                'X-Client-Type':'mobile',
            },
            body:JSON.stringify({
                educationId:educationId
            })

        })
        const res=await response.json();
        return Response.json(res)
    }
    catch(err){
        if(err instanceof Error){
            return Response.json({status:"400",message:err.message})
        }
        else return Response.json({status:"400",message:"Unexpected Server Error"})
    }
}