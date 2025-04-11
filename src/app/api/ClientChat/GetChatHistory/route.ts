
export async function POST(request:Request) {
  try {

    const requestBody=await request.json();
    const {roomId}=requestBody
    const response = await fetch(`http://3.6.34.255:3001/api/v1/message/getChatHistory?roomId=${roomId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
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