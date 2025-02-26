export interface Product {
    id: number;
    title: string;
    image: string;
    likes: number;
    description: string | null;
    price: number;
    features: Feature[];
    feature_ids: number[];
  }
export type Feature = {
    id: number;
    name: string,
    description: string,
    price: number,
    created_at: Date,
    updated_at: Date,
    is_active: boolean
};
export type Id = {
    id: number;
};


export type Column<T> = {
    header: string; // The column header text
    accessor: keyof T; // The key in the data object that corresponds to this column
    render?: (row: T) => React.ReactNode; // Optional custom rendering function
};