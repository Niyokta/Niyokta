
export async function POST(request:Request){
    try{
        const req=await request.json();
        const {username}=req;
        const user=await fetch(`http://13.233.248.208:3000/api/v1/user/getUserByUsername`,{
            method:"POST",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                username:username
            })
        })
        const res=await user.json();
        return Response.json(res);
    }
    catch(err){
        return Response.json({status:"400",message:err instanceof Error?err.message:"Internal Server Error"})
    }
}