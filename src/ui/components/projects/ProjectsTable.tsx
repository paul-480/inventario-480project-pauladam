import { useEffect, useState } from "react";
import type { Project } from "@/domain/project/project.entity";
import type { User } from "@/domain/user/user.entity";
import { GetAllProjectsUseCase } from "@/application/project/use-cases/get-all-projects.use-case";
import { GetUserProjectsUseCase } from "@/application/project/use-cases/get-user-projects.use-case";
import { ProjectApiRepository } from "@/infrastructure/api/project/project.api.repository";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

interface ProjectsTableProps {
  user?: User;
}

const repository = ProjectApiRepository;

export function ProjectsTable({ user }: ProjectsTableProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (user) {
      GetUserProjectsUseCase(repository, user.id.toString())
        .then((userProjects) => {
          setProjects(userProjects);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user projects:", err);
          setProjects([]);
          setLoading(false);
        });
    } else {
      GetAllProjectsUseCase(repository)
        .then((allProjects) => {
          setProjects(allProjects);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching all projects:", err);
          setProjects([]);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <DataTable columns={columns} data={projects} />
    </div>
  );
}
