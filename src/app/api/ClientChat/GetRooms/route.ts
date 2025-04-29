

import { cookies, headers } from 'next/headers';

export async function POST(request:Request) {
  try {

    const requestBody=await request.json();
    const {userId}=requestBody
    const response = await fetch(`http://13.233.248.208:3001/api/v1/room/getRoomForUser?userId=${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      }
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