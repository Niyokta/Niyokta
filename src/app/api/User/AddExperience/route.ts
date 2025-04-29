import { cookies } from "next/headers";

export async function POST(request:Request){
    try{
        const cookiestore=cookies();
        const requestbody = await request.json();

        const {user, title, company, from, to, description } = requestbody;
        const accessToken=cookiestore.get('accessToken')?.value
        if(!accessToken){
            return Response.json({
                status:"400",
                message:"No token found"
            })
        }
        const response=await fetch('http://13.233.248.208:3000/api/v1/user/addExperience',{
            method:'POST',
            credentials:'include',
            headers:{
                'content-type':'application/json',
                'X-Client-Type':'mobile',
                'authorization':accessToken
            },
            body:JSON.stringify({
                user:user,
                title:title,
                company:company,
                from:from,
                to:to,
                description:description
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