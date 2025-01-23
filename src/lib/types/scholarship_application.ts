import type { Student } from "./ach_achivement";
import type { Scholarship } from "./scholarship";


export interface ScholarshipApplication {
    id: string;
    student: Student;
    scholarship: Scholarship;
    application_date: string; 
    note?: string;
    status: string;
    self_description?: string;
    parent_income?: number;
    parent_occupation?: ParentOccupation;
    motivation?: string;
    review?: Review;
}

export interface Review {
    expired_date: string;
    status: string;
    score: number;
    comment?: string;
}

export enum ParentOccupation {
    UNEMPLOYED = 'unemployed',
    SELF_EMPLOYED = 'self_employed',
    GOVERNMENT_EMPLOYEE = 'government_employee',
    PRIVATE_SECTOR = 'private_sector',
    RETIRED = 'retired',
    FARMER = 'farmer',
    TEACHER = 'teacher',
    DOCTOR = 'doctor',
    ENGINEER = 'engineer',
    OTHER = 'other'
}