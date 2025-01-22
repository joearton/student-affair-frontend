import type { Department } from "./scholarship_university";

export interface Achievement {
    id: number;
    student: Student;
    activity_name: string;
    activity_date: Date;
    scope: string;
    scope_display: string;
    award: string;
    organizer_name: string;
    position: PositionChoices;
    description?: string;
    attachment?: string;
    photos?: Photo[];
}

export interface Photo {
    id: number;
    caption: string;
    image: string;
}


export interface Student {
    name: string;
    id: string;
    department_name: string;
}

export enum PositionChoices {
    FIRST = '1',
    SECOND = '2',
    THIRD = '3',
    FOURTH = '4',
    FIFTH = '5'
}
