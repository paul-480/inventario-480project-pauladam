import { GetAllProjectsUseCase } from "@/application/project/use-cases/get-all-projects.use-case";
import type { Project } from "@/domain/project/project.entity";
import { ProjectApiRepository } from "@/infrastructure/api/project/project.api.repository";
import { useCallback, useEffect, useState } from "react";
import { GetUserProjectsUseCase } from "@/application/project/use-cases/get-user-projects.use-case"
import { useMe } from "../user/useMe";
import type { User } from "@/domain/user/user.entity";

const repository = ProjectApiRepository

export const useProjects = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [myProjects, setMyProjects] = useState<Project[]>([]);
    const {me} = useMe();

    const projectsByUser= (user:User)=>{
        useCallback(async ()=>{
                 let newProjects:Project[] = []
                 try {
                    newProjects = await GetUserProjectsUseCase(repository, user.id.value)
                 } catch (error) {
                    console.log(error)
                 } finally{
                    setProjects(newProjects)
                 }
                
            
        },[user])
    }

    useEffect(() => {
    GetAllProjectsUseCase(repository)
        .then((projects) => {
            setProjects(projects);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching all projects:", err);
            setProjects([]);
            setLoading(false);
        });
}, []);


useEffect(() => {
    if(!me) return;
    GetUserProjectsUseCase(repository, me.id.toString())
        .then((myProjects) => {
            setMyProjects(myProjects);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching my projects:", err);
            setMyProjects([]);
            setLoading(false);
        });
}, [me]);

    return { projects, loading, myProjects, projectsByUser };
};
