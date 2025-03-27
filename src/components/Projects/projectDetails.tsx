"use client"; 
import { cn } from "@/lib/utils";
import React from "react";

type ProjectProps = {
  project: {
    title: string;
    description: string;
    client_name: string;
    client_country: string;
    category: string[];
    skills_required: string[];
    max_budget: string;
    min_budget: string;
    status: string;
    created_at: string;
    updated_at: string;
    assigned_to: number | null;
    closing_price: number | null;
    proposal_count: number;
    completed_at: string | null;
    payment_status: boolean;
  };
};

const ProjectDetail: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-teal-600">{project.title}</h2>
        <p className="text-gray-700 mt-2">{project.description}</p>
      </div> 

      <div className="flex flex-wrap space-x-4 mb-4">
        <span className={cn("px-4 py-2 text-sm rounded-lg", project.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-black")}>
          {project.status}
        </span>
        <span className={cn("px-4 py-2 text-sm rounded-lg", project.payment_status ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
          {project.payment_status ? "Paid" : "Pending Payment"}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg">Details</h3>
        <ul className="space-y-4 mt-2">
          <li>
            <strong>Client:</strong> {project.client_name} from {project.client_country}
          </li>
          <li>
            <strong>Categories:</strong> {project.category.join(", ")}
          </li>
          <li>
            <strong>Skills Required:</strong> {project.skills_required.join(", ")}
          </li>
          <li>
            <strong>Budget:</strong> {project.min_budget} - {project.max_budget}
          </li>
          <li>
            <strong>Assigned To:</strong> {project.assigned_to ? `User ${project.assigned_to}` : "Not assigned"}
          </li>
          <li>
            <strong>Proposal Count:</strong> {project.proposal_count}
          </li>
          <li>
            <strong>Closing Price:</strong> {project.closing_price ? project.closing_price : "Not finalized"}
          </li>
          <li>
            <strong>Created At:</strong> {(project.created_at)}
          </li>
          <li>
            <strong>Updated At:</strong> {(project.updated_at)}
          </li>
          {project.completed_at && (
            <li>
              <strong>Completed At:</strong> {new Date(project.completed_at).toLocaleDateString()}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetail;
