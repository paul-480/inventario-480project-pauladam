import type { Uuid } from "../shared/uuid.vo";

export interface DevelopmentTechnology {
    id: Uuid;
    name: string;
}

export interface DevelopmentLink {
    id: Uuid;
    environment: "STAGE" | "PREPRODUCTION" | "PRODUCTION";
    url: string;
}

export interface Development {
    id: Uuid;
    name: string;
    description: string;
    technology: DevelopmentTechnology;
    urlRepository: string;
    links: DevelopmentLink[];
}
