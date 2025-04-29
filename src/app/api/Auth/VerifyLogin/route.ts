import { cookies } from "next/headers";

export async function GET() {
    const cookiestore = cookies();
    const accessToken = cookiestore.get('accessToken')?.value
    const refreshToken = cookiestore.get('refreshToken')?.value
    if (!accessToken || !refreshToken) return Response.json({
        status: '400',
        message: "Tokens not found"
    })
    try {
        const response = await fetch('http://13.233.248.208:3000/api/v1/auth/verifyToken', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'authorization': accessToken
            }
        })
        const res = await response.json();
        if (res.status == "200") return Response.json({ status: res.status, message: res.message })
        const response2 = await fetch('http://13.233.248.208:3000/api/v1/auth/refreshToken', {
            method: 'GET',
            credentials: 'include',
            headers:{
                'authorization':refreshToken
            }
        })
        const res2=await response2.json();
        if(res2.status=="200"){
            cookiestore.set('accessToken',res2.accessToken)
        }
        return Response.json({status:res2.status,message:res2.message})
    }
    catch(err){
        if(err instanceof Error){
            return Response.json({status:"400",message:err.message})
        }
        else return Response.json({status:"400",message:"Unexpected Server Error"})
    }
}