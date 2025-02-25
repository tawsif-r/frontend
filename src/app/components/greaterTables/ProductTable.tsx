'use client'
import React, { useEffect, useState } from 'react';
import Table from '@/app/components/tables/GenTable';
import { Column } from '@/app/components/tables/GenTable';
import { addData, deleteData, fetchData, updateData } from '@/app/services/apiService';
import { Product } from '@/app/types/types';
import Form from '@/app/components/forms/GenForm';
import {FormField} from '@/app/components/forms/GenForm'
import Modal from '@/app/components/ui/Modal';


//==================================table==============================
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
//===========================X==============================




//===========================form=======================
const productFields: FormField<Product>[] = [
  { label: 'Title', name: 'title', type: 'text' },
  { label: 'Image', name: 'image', type: 'text' },
]
//=============================X=========================

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData<Product[]>(
      'http://localhost:8000/api/products',
      setProducts,
      setError,
      setLoading
    );
  }, []);

  const handleSuccess = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    setIsModalOpen(false); // Close the modal after successful submission
  };
  
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleAddProduct = async (newRow: Product) => {
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
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold m-3">Products</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-800 hover:bg-indigo-900 shadow-xl font-medium py-2 px-4 rounded-lg transition-colors duration-200 hover:shadow-indigo-500 hover:shadow-lg hover:scale-105 flex items-center gap-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <Form<Product>
          api="http://localhost:8000/api/products"
          fields={productFields}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <Table
        data={products}
        columns={productColumns}
        onAdd={handleAddProduct}
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