import React from 'react';
import { Column, Product } from '../../types/product';
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
                                            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 
                                                transition-colors duration-200"
                                            onClick={() => setEditingProduct(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                                                transition-colors duration-200"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            href={`products/${product.id}`}
                                            className="inline-block px-4 py-2 bg-violet-600 text-white rounded-md 
                                                hover:bg-violet-700 transition-colors duration-200"
                                        >
                                            View
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