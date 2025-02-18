// src/components/ProductTable.tsx
import React from 'react';
import { Column, Product } from '../../types/product';

type ProductTableProps = {
    products: Product[];
    columns: Column<Product>[];
    editingProduct: Product | null;
    setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
    handleUpdateProduct: (updatedProduct: Product) => void;
    handleDeleteProduct: (id: number) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({
    products,
    columns,
    editingProduct,
    setEditingProduct,
    handleUpdateProduct,
    handleDeleteProduct,
}) => {
    return (
        <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-slate-700">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="px-4 py-2 text-left font-semibold uppercase text-sm border-b">
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y">
                {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-800 rounded">
                        <td>{product.id}</td>
                        {editingProduct?.id === product.id ? (
                            <>
                                <td>
                                    <input
                                        className="border bg-slate-600 p-2 mr-2 rounded"
                                        type="text"
                                        value={editingProduct.title}
                                        onChange={(e) =>
                                            setEditingProduct((prev) => (prev ? { ...prev, title: e.target.value } : null))
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        className="border bg-slate-600 p-2 mr-2 rounded"
                                        type="text"
                                        value={editingProduct.image}
                                        onChange={(e) =>
                                            setEditingProduct((prev) => (prev ? { ...prev, image: e.target.value } : null))
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        className="m-4 p-2 border-2 hover:bg-slate-700 rounded"
                                        onClick={() => {
                                            console.log('Save button clicked');
                                            if (!editingProduct) {
                                                console.error('No product selected for editing');
                                                return;
                                            }
                                            handleUpdateProduct(editingProduct);
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="m-4 p-2 border-2 hover:bg-slate-700 rounded"
                                        onClick={() => setEditingProduct(null)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{product.title}</td>
                                <td>
                                    <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
                                </td>
                                <td>
                                    <button
                                        className="border-2 px-3 py-2 rounded hover:bg-cyan-800"
                                        onClick={() => {
                                            console.log('setting editing product:', product);
                                            setEditingProduct(product);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="mx-5 border-2 hover:bg-red-900 px-3 py-2 rounded"
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;