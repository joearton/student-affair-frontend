import type { Scholarship } from "./scholarship";

export interface ScholarshipApplication {
    student: number;
    scholarship: Scholarship;
    application_date: string; 
    note?: string;
    status: ApplicationStatus;
    self_description?: string;
    parent_income?: number;
    parent_occupation?: ParentOccupation;
    motivation?: string;
}

export enum ApplicationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
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