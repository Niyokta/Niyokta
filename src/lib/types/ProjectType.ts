export type ProjectModel={
    project_id:number,
    title:string,
    description:string,
    client_id:number,
    client_name:string,
    category:string[],
    skills_required:string[],
    client_country:string,
    max_budget:string,
    min_budget:string,
    status:string|null,
    created_at:string|null,
    updated_at:string|null,
    assigned_to:number|null,
    closing_price:number|null,
    proposal_count:number|null,
    completed_at:string|null,
    payment_status:string|null,
    bids:any[]
}

export const DummyProject={
    project_id:0,
    title:"",
    description:"",
    client_id:0,
    client_name:"",
    category:[""],
    skills_required:[""],
    client_country:"",
    max_budget:"",
    min_budget:"",
    status:"",
    created_at:"",
    updated_at:"",
    assigned_to:0,
    closing_price:0,
    proposal_count:0,
    completed_at:"",
    payment_status:"",
    bids:[]
}