import { headers } from "next/headers";
import { cookies } from "next/headers";
export async function GET() {
    const headerlist = headers();
    const cookiestore = cookies();
    const username = headerlist.get('Username');
    const password = headerlist.get('Password');

    if (!username || !password) return Response.json({
        status: "400",
        message: "invalid credentials"
    })

    try {
        const response = await fetch('http://13.233.248.208:3000/api/v1/auth/signin', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const res = await response.json();
        if (res.status == "200") {
            cookiestore.set('accessToken', res.accessToken,{
                sameSite:"strict",
                maxAge:20*60*1000
            });
            cookiestore.set('refreshToken', res.refreshToken,{
                sameSite:"strict",
                maxAge:7*24*60*60*1000
            });

        }
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