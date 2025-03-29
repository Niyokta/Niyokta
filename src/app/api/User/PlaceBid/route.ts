import { cookies } from "next/headers";
import { newBid } from "@/lib/types";
export async function POST(request: Request) {
    try {
        const requestBody = await request.json();
        const cookiestore = cookies();
        const accessToken = cookiestore.get('accessToken')?.value;
        if (!accessToken) {
            return Response.json({ status: "400", message: "You are not logged in" });
        }
        const { freelancer_id,
            project_id,
            bidding_price,
            freelancer_name,
            proposal,
            project_title,
            client_country,
            client_name,
            freelancer_rating } = requestBody;

        const bidDetails: newBid = {
            freelancer_id: freelancer_id,
            project_id: project_id,
            bidding_price: bidding_price,
            freelancer_name: freelancer_name,
            proposal: proposal,
            project_title: project_title,
            client_country: client_country,
            client_name: client_name,
            freelancer_rating: freelancer_rating
        }
        const response = await fetch('http://3.6.34.255:3000/api/v1/bid/placeBid', {
            method: 'POST',
            headers: {
                'authorization': accessToken,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                freelancerID:freelancer_id,
                projectID:project_id,
                bidingPrice:bidding_price,
                freelancerName:freelancer_name,
                proposal:proposal,
                projectTitle:project_title,
                clientCountry:client_country,
                clientName:client_name,
                freelancerRating:freelancer_rating
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