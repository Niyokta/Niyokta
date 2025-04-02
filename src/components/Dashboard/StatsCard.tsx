import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { div_color } from "@/resource/theme";


export default function StatsCard({title,description,content}:{title:String,description:String,content:String}) {
    return (
        <Card className="md:w-[300px] h-[110px] md:h-[200px] my-[10px]" style={{ backgroundColor: div_color }}>
            <CardContent className="py-[10px] px-[15px] md:p-[20px]">
                <p className="text-[12px] md:text-[15px] font-medium">{title}</p>
                <p className="text-[30px] md:text-[40px] font-bold">{content}</p>
                <p className="text-[12px] md:text-[15px] font-light py-[5px] md:py-[20px]">{description}</p>
            </CardContent>
        </Card>
    )
}