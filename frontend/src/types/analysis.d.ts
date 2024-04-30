export interface DemoPieProps {
    data: { type: string; value: number }[];
}

export interface DemoColumnProps {
    data: { type: string; value: number }[];
}

export interface DemoWordCloudProps {
    data: { value: number; text: string }[];
}

export interface MainInfoItemType {
    label: string;
    value: string;
}

export interface AnalysisPosterType {
    user_id: string;
}

export interface DemoAreaProps {
    data: { date: string; category: string; number: number}[];
}