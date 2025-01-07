
export interface Scholarship  {
    id: string;
    name: string;
    status: string;
    start_date: string;
    end_date: string;
    description: string;
    source: string;
    destination: string;
    target_audience: string;
    quota: string;
    thumbnail: string;
    unit_names: string[];
};


export interface Filters {
    status: string[];
    unit_names: string[];
    sumber: string[];
    tujuan: string[];
    target: string[];
    quota: string[];
};


export const filterOptions = {
    status: ['on-going', 'coming-soon', 'closed'],
    unit_names: ['unit1', 'unit2', 'unit3'],
    sumber: ['source1', 'source2'],
    tujuan: ['destination1', 'destination2'],
    target: ['target1', 'target2'],
    quota: ['below-50', '50-100', 'above-100']
};
