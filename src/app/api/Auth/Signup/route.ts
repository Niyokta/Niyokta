

export async function POST(request: Request) {
    try {
        const requestbody = await request.json();
        const { Username, Email, Password,phone,country,working_hours,birth_date,linkedin,github,x } = requestbody
        
        const response=await fetch('http://13.233.248.208:3000/api/v1/auth/create-account',{
            method:'POST',
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                username:Username,
                password:Password,
                email:Email,
                phoneNumber:phone,
                birthDate:birth_date,
                workingHours:working_hours,
                country:country,
                linkedin:linkedin,
                github:github,
                x:x
            })
        })

        const res=await response.json();

        return Response.json({
            status:res.status,
            message:res.message
        })
    }
    catch(err){
        if(err instanceof Error){
            return Response.json({status:"400",message:err.message})
        }
        else return Response.json({status:"400",message:"Unexpected Server Error"})
    }
}