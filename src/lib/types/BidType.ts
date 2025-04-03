import { UserModel } from "./userType"

export type BidType={
    bid_id:number,
    freelancer_id:number,
    project_id:number,
    project_title:string,
    client_name:string,
    freelancer_rating:string,
    client_country:string,
    bidding_price:string,
    freelancer_name:string,
    proposal:string,
    completion_time:string|null,
    status:string,
    submitted_at:string,
    client_rating:string|null,
    is_active:string,
    user:UserModel
}
export type MyBidType={
    bid_id:number,
    freelancer_id:number,
    project_id:number,
    project_title:string,
    client_name:string,
    freelancer_rating:string,
    client_country:string,
    bidding_price:string,
    freelancer_name:string,
    proposal:string,
    completion_time:string|null,
    status:string,
    submitted_at:string,
    client_rating:string|null,
    is_active:string,
}

