import { headers } from "next/headers";
export async function GET() {
    const headerlist = headers();
    const username = headerlist.get('Username');
    const password = headerlist.get('Password');

    if (!username || !password) return Response.json({
        status: "400",
        message: "invalid credentials"
    })

    try {
        const response = await fetch('http://13.233.248.208:3000/api/v1/getProjects', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cleintID: username,
      
            })
        })
        const res = await response.json();
  
        return Response.json({
            status: res.status,
            message: res.message
        })
    }
    catch(err){
        if(err instanceof Error){
            return Response.json({status:"400",message:err.message})
        }
        else return Response.json({status:"400",message:"Unexpected Server Error"})
    }

}