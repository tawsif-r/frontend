'use client';
import React, { useEffect, useState } from 'react';
import { Product, Column } from '../../types/product';
import { addProduct, updateProduct, deleteProduct } from '@/app/services/productService';
import ProductForm from '../../components/forms/ProductForm';
import ProductTable from '../../components/tables/ProductTable';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({ title: '', image: '' });
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Fetch products
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

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const addedProduct = await addProduct(newProduct);
            setProducts([...products, addedProduct]);
            setNewProduct({ title: '', image: '' });
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Handle update product
    const handleUpdateProduct = async (updatedProduct: Product) => {
        try {
            const updatedData = await updateProduct(updatedProduct);
            setProducts((prev) => prev.map((p) => (p.id === updatedData.id ? updatedData : p)));
            setEditingProduct(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Handle delete product
    const handleDeleteProduct = async (id: number) => {
        try {
            await deleteProduct(id);
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
                    <button
                        onClick={() => setEditingProduct(product)}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteProduct(product.id)}
                    >
                        Delete
                    </button>
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
                    <ProductForm
                        product={newProduct}
                        onSubmit={handleSubmit}
                        onChange={handleInputChange}
                    />
                    <ProductTable
                        products={products}
                        columns={productColumns}
                        editingProduct={editingProduct}
                        setEditingProduct={setEditingProduct}
                        handleUpdateProduct={handleUpdateProduct}
                        handleDeleteProduct={handleDeleteProduct}
                    />
                </>
            )}
        </div>
    );
};

export default ProductsPage;