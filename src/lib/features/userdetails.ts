import { createSlice } from '@reduxjs/toolkit'
import { DummyProject } from '../types/ProjectType'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading:true,
    userid:0,
    userName:"",
    email:"",
    phoneNumber:"",
    country:"",
    birth_date:"",
    working_hours:"",
    freelancer_rating:0,
    linkedin:"",
    github:"",
    x:"",
    education:[{id:0,courseName:"",yearFrom:"",yearTo:"",institute:"",userId:0}],
    projects:[DummyProject],
    bids:[{bid_id:0,freelancer_id:0,project_id:0,bidding_price:"",freelancer_name:"",proposal:"",completion_time:"",status:"",submitted_at:"",client_rating:"",is_active:"",project_title:"",client_name:"",client_country:"",freelancer_rating:"",user:{username:"",email:"",country:""},}],
    experience:[{id:0,title:"",yearFrom:"",yearTo:"",company:"",userId:0,description:""}]
  },
  reducers: {
    updateUser:(state,action)=>{
        const user=action.payload
        state.loading=false
        state.userid=user.id
        state.email=user.email
        state.userName=user.username
        state.phoneNumber=user.phone
        state.education=user.education
        state.experience=user.experience
        state.projects=user.projects
        state.bids=user.bids
        state.working_hours=user.working_hours
        state.freelancer_rating=user.freelancer_rating
        state.birth_date=user.birth_date
        state.linkedin=user.linkedin
        state.github=user.github
        state.x=user.x
        state.country=user.country
    },
    addeducation:(state,action)=>{
        const newedu=action.payload
        const education={
            id:0,
            userId:newedu.userid,
            courseName:newedu.coursename,
            yearFrom:newedu.yearfrom,
            yearTo:newedu.yearto,
            institute:newedu.institute
        }
        state.education.push(education)
    },
    removeeducation:(state,action)=>{
        const eduId=action.payload
        state.education=state.education.filter(s=>s.id!=eduId)
    },
    addexperience:(state,action)=>{
        const newexp=action.payload
        const experience={
            id:0,
            userId:newexp.userid,
            company:newexp.company,
            title:newexp.title,
            yearFrom:newexp.yearfrom,
            yearTo:newexp.yearto,
            description:newexp.description
        }
        state.experience.push(experience)
    },
    removeexperience:(state,action)=>{
        const expId=action.payload
        state.experience=state.experience.filter(s=>s.id!=expId)
    },
    loadingstate:(state,action)=>{
        const temp=action.payload
        state.loading=temp;

    }
  }
})

export const { updateUser, addeducation,removeeducation,addexperience,removeexperience,loadingstate } = userSlice.actions;

export default userSlice.reducer;