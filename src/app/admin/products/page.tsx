'use client';
import React, { useEffect, useState } from 'react';
import StandardTable, { Column } from '../../components/tables/StandardTable';

type Product = {
    id: number;
    title: string;
    image: string;
};

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({ title: '', image: '' });
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log('Current editingProduct:', editingProduct);
    }, [editingProduct]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) throw new Error('Failed to add product');
            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            setNewProduct({ title: '', image: '' });
        } catch (err: any) {
            setError(err.message);
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        console.log('updateProduct called with:', updatedProduct);
        try {
            const response = await fetch(`http://localhost:8000/api/products/${updatedProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) throw new Error('Failed to update product');
            const updatedData = await response.json();
            setProducts((prev) =>
                prev.map((p) => (p.id === updatedData.id ? updatedData : p))
            );
            setEditingProduct(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete product');
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const productColumns: Column<Product>[] = [
        { header: "ID", accessor: "id" },
        { header: "Title", accessor: "title" },
        {
            header: "Image",
            accessor: "image",
            render: (product) => (
                <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
            ),
        },
        {
            header: "Actions",
            accessor: "id",
            render: (product) => (
                <>
                    <button className='bg-cyan-900 px-3 py-2' onClick={() => {
                        console.log('setting editing product: ', product);
                        setEditingProduct(product);
                    }}>Edit</button>
                    <button className='mx-5 bg-red-900 px-3 py-2' onClick={() => deleteProduct(product.id)}>Delete</button>
                </>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <form onSubmit={addProduct} className="mb-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Product Title"
                            value={newProduct.title || ''}
                            onChange={handleInputChange}
                            className="border bg-slate-600 p-2 mr-2"
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={newProduct.image || ''}
                            onChange={handleInputChange}
                            className="border bg-slate-600 p-2 mr-2"
                        />
                        <button type="submit" className="border-2 hover:bg-cyan-900 px-4 py-2 rounded">
                            Add Product
                        </button>
                    </form>
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-slate-700">
                            <tr>
                                {productColumns.map((column, index) => (
                                    <th key={index} className="px-4 py-2 text-left font-semibold uppercase text-sm border-b">
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-800">
                                  <td>{product.id}</td>
                                    {editingProduct?.id === product.id ? (
                                        <>  
                                            
                                            <td>
                                                <input
                                                    className='border bg-slate-600 p-2 mr-2'
                                                    type="text"
                                                    value={editingProduct.title}
                                                    onChange={(e) =>
                                                        setEditingProduct((prev) => (prev ? { ...prev, title: e.target.value } : null))
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className='border bg-slate-600 p-2 mr-2'
                                                    type="text"
                                                    value={editingProduct.image}
                                                    onChange={(e) =>
                                                        setEditingProduct((prev) => (prev ? { ...prev, image: e.target.value } : null))
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <button className="bg-slate-700" onClick={() => {
                                                    console.log('Save button clicked');
                                                    console.log('Current editingProduct:', editingProduct);
                                                    if (!editingProduct) {
                                                        console.error('No product selected for editing');
                                                        return;
                                                    }
                                                    updateProduct(editingProduct);
                                                }}>Save</button>
                                                <button className="bg-lime-400" onClick={() => setEditingProduct(null)}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{product.title}</td>
                                            <td>
                                                <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
                                            </td>
                                            <td>
                                                <button className='bg-cyan-900 px-3 py-2' onClick={() => {
                                                    console.log('setting editing product: ', product);
                                                    setEditingProduct(product);
                                                }}>Edit</button>
                                                <button className='mx-5 bg-red-900 px-3 py-2' onClick={() => deleteProduct(product.id)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ProductsPage;