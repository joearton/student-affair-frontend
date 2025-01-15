

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
    code: string;
};
