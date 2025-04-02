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
        <Card className="w-[300px] h-[200px]" style={{ backgroundColor: div_color }}>
            <CardContent className="p-[20px]">
                <p className="text-[15px] font-medium">{title}</p>
                <p className="text-[40px] font-bold">{content}</p>
                <p className="text-[15px] font-light py-[20px]">{description}</p>
            </CardContent>
        </Card>
    )
}