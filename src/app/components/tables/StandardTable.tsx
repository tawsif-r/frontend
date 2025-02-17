import React from 'react';

// Define the type for a single column
export type Column<T> = {
    header: string; // The column header text
    accessor: keyof T; // The key in the data object that corresponds to this column
    render?: (row: T) => React.ReactNode; // Optional custom rendering function
};

// Define the props for the StandardTable component
type StandardTableProps<T> = {
    columns: Column<T>[]; // Array of column definitions
    data: T[]; // Array of data rows
};

const StandardTable = <T extends object>({ columns, data }: StandardTableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-dark border border-gray-300">
                {/* Table Header */}
                <thead className="">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-4 py-2 text-left font-semibold uppercase text-sm border-b"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody className="divide-y">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-700">
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-4 py-2 text-sm whitespace-nowrap"
                                >
                                    {column.render ? column.render(row) : String(row[column.accessor])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StandardTable;