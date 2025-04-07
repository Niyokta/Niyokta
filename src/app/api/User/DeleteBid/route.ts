import { cookies } from "next/headers";
export async function POST(request: Request) {
    try {
        const requestBody = await request.json();
        const cookiestore = cookies();
        const accessToken = cookiestore.get('accessToken')?.value;
        if (!accessToken) {
            return Response.json({ status: "400", message: "You are not logged in" });
        }
        const { bidId } = requestBody;

        const response = await fetch('http://3.6.34.255:3000/api/v1/bid/deleteBid', {
            method: 'POST',
            headers: {
                'authorization': accessToken,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                bidId:bidId
            })
        })
        const res = await response.json();
        return Response.json(res);
    }
    catch (err) {
        if (err instanceof Error) {
            return Response.json({ status: "400", message: err.message })
        }
        else return Response.json({ status: "400", message: "Unexpected Server Error" })
    }
}