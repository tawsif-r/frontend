import React from 'react';
import { Column, Product } from '../../types/types';
import Link from 'next/link';

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
        <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-lg">
            <table className="min-w-full">
                <thead className="bg-gray-800">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-gray-700"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="hover:bg-gray-800 transition-colors duration-150"
                        >
                            <td className="px-6 py-4 text-gray-300">{product.id}</td>

                            {editingProduct?.id === product.id ? (
                                <>
                                    <td className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={editingProduct.title}
                                            onChange={(e) =>
                                                setEditingProduct((prev) =>
                                                    prev ? { ...prev, title: e.target.value } : null
                                                )
                                            }
                                            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                                                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                            placeholder="Product title"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="url"
                                            value={editingProduct.image}
                                            onChange={(e) =>
                                                setEditingProduct((prev) =>
                                                    prev ? { ...prev, image: e.target.value } : null
                                                )
                                            }
                                            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                                                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                            placeholder="Image URL"
                                        />
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 
                                                transition-colors duration-200"
                                            onClick={() => editingProduct && handleUpdateProduct(editingProduct)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 
                                                transition-colors duration-200"
                                            onClick={() => setEditingProduct(null)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="px-6 py-4 text-gray-300">{product.title}</td>
                                    <td className="px-6 py-4 text-gray-300">
                                        <div className="flex items-center space-x-2">
                                            {/* Uncomment if you want to show image preview */}
                                            {/* <img 
                                                src={product.image} 
                                                alt={product.title} 
                                                className="w-12 h-12 object-cover rounded-md" 
                                            /> */}
                                            <span className="truncate max-w-xs">{product.image}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            className="px-2 py-2 text-white rounded-md hover:scale-150 transition-all duration-300"
                                            onClick={() => setEditingProduct(product)}
                                        >
                                            <svg className="w-5 h-5 flex-shrink-0 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>

                                        </button>
                                        <button
                                            className="px-4 py-2 text-white rounded-md hover:scale-150 transition-all duration-300"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeWidth="2" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                        <Link
                                            href={`products/${product.id}`}
                                            className="inline-block text-white rounded-md 
                                                hover:scale-150 transition-all duration-300"
                                        >
                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                            </svg>

                                        </Link>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;