

import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookiestore = cookies();
    const accessToken = cookiestore.get('accessToken')?.value
    if (!accessToken) {
      return Response.json({
        status: "400",
        message: "No token found"
      })
    }
    const response = await fetch('http://13.233.248.208:3000/api/v1/project/getProjects', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'authorization': accessToken

      }, body: JSON.stringify({
        cleintID:'12'   
        
    })
    })
    const res = await response.json();
    return Response.json(res);
  } 
  catch(err){
    if(err instanceof Error){
        return Response.json({status:"400",message:err.message})
    }
    else return Response.json({status:"400",message:"Unexpected Server Error"})
}
}