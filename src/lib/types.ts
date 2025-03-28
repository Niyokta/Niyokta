export type newproject = {
    user: number,
    title: string,
    description: string,
    maxprice: string,
    skills: string[],
    categories: string[],
    cleint_name: string,
    minprice: string,
    client_country: string
}


export type newBid = {
    freelancer_id:number,
    project_id:number,
    bidding_price:number,
    freelancer_name:string,
    proposal:string,
    project_title:string,
    client_country:string,
    client_name:string,
    freelancer_rating:number
}
