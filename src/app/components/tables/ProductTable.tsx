import React from 'react';

type Product = {
    id: number;
    title: string;
    image: string;
};

type Column<T> = {
    header: string;
    accessor: keyof T;
    render?: (row: T) => React.ReactNode;
};

type ProductTableProps = {
    products: Product[];
    columns: Column<Product>[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({ products, columns, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>
                                {column.render ? column.render(product) : product[column.accessor]}
                            </td>
                        ))}
                        <td>
                            <button onClick={() => onEdit(product)}>Edit</button>
                            <button onClick={() => onDelete(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;