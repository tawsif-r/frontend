'use client'
import React, { useEffect, useState } from 'react';
import Table from '@/app/components/tables/GenTable';
import { Column } from '@/app/components/tables/GenTable';
import { addData, deleteData, fetchData, updateData } from '@/app/services/apiService';
import { Product } from '@/app/types/types';

const productColumns: Column<Product>[] = [
  { header: 'ID', accessor: 'id' },
  {
    header: 'Title',
    accessor: 'title',
    render: (value, row, updateRow) =>
      updateRow ? (
        <input
          value={value as string}
          onChange={(e) => updateRow({ ...row, title: e.target.value })}
          className="w-full bg-slate-800 text-white p-1 rounded"
        />
      ) : (
        String(value)
      ),
  },
  {
    header: 'Image',
    accessor: 'image',
    render: (value, row, updateRow) =>
      updateRow ? (
        <input
          value={value as string}
          onChange={(e) => updateRow({ ...row, image: e.target.value })}
          className="w-full bg-slate-800 text-white p-1 rounded"
        />
      ) : (
        <img src={value as string} alt="Product" style={{ maxWidth: '50px' }} />
      ),
  },
];

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchData<Product[]>(
      'http://localhost:8000/api/products',
      setProducts,
      setError,
      setLoading
    );
  }, []);

  const handleAdd = async (newRow: Product) => {
    try {
      const addedProduct = await addData('http://localhost:8000/api/products', newRow);
      setProducts([...products, addedProduct]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const updatedData = await updateData(
        `http://localhost:8000/api/products/${updatedProduct.id}`,
        updatedProduct
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedData.id ? updatedData : p))
      );
      setEditingProduct(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteData(`http://localhost:8000/api/products/${id}`, id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <Table
        data={products}
        columns={productColumns}
        onAdd={handleAdd}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        editingData={editingProduct}
        setEditingData={setEditingProduct}
        handleUpdateData={handleUpdateProduct}
        handleDeleteData={handleDeleteProduct}
      />  
    </div>
  );
};

export default ProductTable;