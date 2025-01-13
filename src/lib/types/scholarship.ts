

export interface Scholarship  {
    id: string;
    name: string;
    status: string;
    status_display: string;
    start_date: string;
    sch_start_date: string;
    end_date: string;
    sch_end_date: string;
    description: string;
    sch_excerpt: string;
    level_display: string;
    source: string;
    source_display: string;
    destination: string;
    destination_display: string;
    targets: string;
    target_names: string[];
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
