import { categoryFilter, skillFilter } from "@/helper/ProjectFilters";
import { filterType } from "@/lib/types/FilterTypes";
import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "../ui/checkbox";
import { box_shadow, div_color } from "@/resource/theme";
import { Input } from "../ui/input";
export default function ProjectFilter({ filter, setfilter }: { filter: filterType, setfilter: Dispatch<SetStateAction<filterType>> }) {
    return (
        <div className="w-[30%] text-[15px] p-[20px] rounded-md" style={{backgroundColor:div_color,boxShadow:box_shadow}}>
            <p className="uppercase font-medium pb-[20px]">Project Filter</p>
            <Input placeholder="Search by any keyword"/>
            <p className="pt-[50px] pb-[20px] underline">Category Based</p>
            <div className="grid grid-flow-row grid-cols-2 text-[12px] gap-2">
                {
                    categoryFilter.map((category,index) => {
                        return (
                            <div className="flex items-center" key={index}>
                                <Checkbox className="w-[15px] h-[15px] border-[1px]" onCheckedChange={(e)=>{
                                    if(filter.categoryFilter.includes(category.filterKey)){
                                        setfilter(()=>({...filter,categoryFilter:filter.categoryFilter.filter((ctg)=>ctg!=category.filterKey)}))
                                    }
                                    else{
                                        setfilter(()=>({...filter,categoryFilter:([...filter.categoryFilter,category.filterKey])}))
                                    }
                                }}/>
                                <p className="px-[10px]">{category.filterTitle}</p>
                            </div>
                        )
                    })
                }
            </div>
            <p className="pt-[50px] pb-[20px] underline">Skill Based</p>
            <div className="grid grid-flow-row grid-cols-2 text-[12px] gap-2">
                {
                    skillFilter.map((skill,index) => {
                        return (
                            <div className="flex items-center" key={index}>
                                <Checkbox className="w-[15px] h-[15px] border-[1px]" onCheckedChange={(e)=>{
                                    if(filter.skillFilter.includes(skill.filterKey)){
                                        setfilter(()=>({...filter,skillFilter:filter.skillFilter.filter((skl)=>skl!=skill.filterKey)}))
                                    }
                                    else{
                                        setfilter(()=>({...filter,skillFilter:([...filter.skillFilter,skill.filterKey])}))
                                    }
                                }}/>
                                <p className="px-[10px]">{skill.filterTitle}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}