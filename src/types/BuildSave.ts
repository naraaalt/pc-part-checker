import type { Build } from "./Build";

export interface BuildSave {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    build: Build;
}
