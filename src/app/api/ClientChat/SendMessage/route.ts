


export async function POST(request:Request) {
  try {

    const requestBody=await request.json();
    const {senderId,roomId,text}=requestBody
    const response = await fetch(`http://13.233.248.208:3001/api/v1/message/addMessageToRoom`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body:JSON.stringify({
        senderId:senderId,
        receiverId:0,
        roomId:roomId,
        text:text
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