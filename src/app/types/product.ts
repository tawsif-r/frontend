export type Product = {
    id: number;
    title: string;
    image: string;
};

export type Column<T> = {
    header: string; // The column header text
    accessor: keyof T; // The key in the data object that corresponds to this column
    render?: (row: T) => React.ReactNode; // Optional custom rendering function
};