import React from "react";
import Link from "next/link";
import { border_color, box_shadow, div_color, primary_accent_text, primary_background_color, secondary_accent_text } from "@/resource/theme";
const ProjectCard = ({ filter,project_id, title, client_name,category, client_country, min_budget, skills }: { filter: string[],project_id:number,category:string[], title: string, client_country: string, client_name: string, min_budget: string, skills: string[] }) => {
  let display = "none";
  if(title!=='asdf'){
    if (filter.length === 0) {
      display = "block"
    }
    else {
      filter.map((filter) => {
        if (category.includes(filter) || skills.includes(filter)) {
          display = "block";
          return;
        }
      })
    }
  }
  
  return (
    <div className="p-[20px] max-h-[180px] font-light text-[12px] md:text-[15px] hover:bg-[#f7f7f7] rounded-md border-[1px] " style={{ borderColor:border_color,display:display,backgroundColor:div_color }}>
      <p className="text-[10px] md:text-[12px]" style={{color:primary_accent_text}}>{`${client_name} ( ${client_country} )`}</p>
      <p className="pt-[5px] font-medium">{title}</p>
      <p className="text-[10px] md:text-[12px] pb-[10px] md:pb-[20px] underline-offset-2 underline">{`Min-Bid Price : ₹ ${min_budget}`}  </p>

      
      <span className="flex">
        {
          skills.length > 0 ? skills.map((skill, index) => {
            if (index > 6 || skill === "") return;
            return (
              <p className="text-[10px] px-[3px] py-[1px] font-medium rounded-sm mr-[5px] cursor-default border-[1px]" key={index} style={{ borderColor:border_color}}>{skill}</p>
            )
          }) : (
            <p></p>
          )
        }
      </span>
      <Link href={`/project/${project_id}`}><p className="text-[11px] pt-[10px] md:pt-[20px] cursor-pointer font-medium" style={{color:secondary_accent_text}}>Read More</p></Link>
    </div>
  );
};

export default ProjectCard;
