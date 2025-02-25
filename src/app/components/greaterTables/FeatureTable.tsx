'use client'
import React, { useEffect, useState } from 'react';
import Table from '@/app/components/tables/GenTable';
import { Column } from '@/app/components/tables/GenTable';
import { addData, deleteData, fetchData, updateData } from '@/app/services/apiService';
import { Feature } from '@/app/types/types';
import Modal from '@/app/components/ui/Modal';
import Form from '@/app/components/forms/GenForm';
import { FormField } from '@/app/components/forms/GenForm';


//=======================================Columns====================================================
const FeatureColumns: Column<Feature>[] = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name',accessor: 'name',
    render:(value,row,updateRow)=>updateRow?(
    <input 
    value={value as string} 
    onChange={(e) => updateRow(
      {...row, name:e.target.value}
    )} 
    className="w-full bg-slate-800 text-white p-1 rounded"/>
  ):(
    String(value)
  )},
  { header: 'Description', accessor: 'description',
    render: (value,row,updateRow)=>updateRow?(

      <input 
      value={value as string}
      onChange = {(e)=> updateRow(
        {...row, description:e.target.value}
      )}
      className="w-full bg-slate-800 text-white p-1 rounded"
      />
    ):(
      String(value)
    )
  },
  { header: 'Price', accessor:'price',
    render:(value, row, updateRow)=>updateRow?(
      <input
      type='number'
      value={value as number}
      onChange={(e)=>updateRow(
        {...row, price:parseFloat(e.target.value)}
      )}
      className="w-full bg-slate-800 text-white p-1 rounded"
       />
    ):(
      <span>${Number(value).toFixed(2)}</span>
    )
  },
  { header: 'Created at', accessor:'created_at'},
  { header: 'Updated at', accessor: 'updated_at'},
  { header: 'Active', accessor: 'is_active', render:(value,row,updateRow)=>(updateRow?(
    <input
      type="checkbox"
      checked={value as boolean}
      onChange={(e) => {
        const updatedRow = { ...row, is_active: e.target.checked };
        updateRow(updatedRow);
      }}
      className="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded 
                 focus:ring-cyan-500 focus:ring-2"
    />
  ) : (
    <span>{value ? 'Yes' : 'No'}</span> // Display text when not editable
  ))}
];





//===========================form fields=======================
const FeatureFields: FormField<Feature>[] = [
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Description', name: 'description', type: 'text' },
  { label: 'Price', name: 'price', type: 'number' },
  { label: 'Created At', name: 'created_at', type: 'date' },
  { label: 'Updated At', name: 'updated_at', type: 'date' },
  { label: 'Active', name: 'is_active', type: 'checkbox' },
]

//============================Page=============================
const FeatureTable = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData<Feature[]>(
      'http://localhost:8000/api/features',
      setFeatures,
      setError,
      setLoading
    );
  }, []);
  const handleSuccess = (newFeature: Feature) => {
    setFeatures((prev) => [...prev, newFeature]);
      setIsModalOpen(false); // Close the modal after successful submission
    };
    
    const handleError = (errorMessage: string) => {
      setError(errorMessage);
    };

  const handleAddFeature = async (newRow: Feature) => {
    try {
      const addedFeature = await addData('http://localhost:8000/api/features', newRow);
      setFeatures([...features, addedFeature]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateFeature = async (updatedFeature: Feature) => {
    try {
      const updatedData = await updateData(
        `http://localhost:8000/api/features/${updatedFeature.id}`,
        updatedFeature
      );
      setFeatures((prev) =>
        prev.map((p) => (p.id === updatedData.id ? updatedData : p))
      );
      setEditingFeature(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteFeature = async (id: number) => {
    try {
      await deleteData(`http://localhost:8000/api/features/${id}`, id);
      setFeatures((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold m-3">Features</h1>
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
        <h2 className="text-xl font-semibold mb-4">Add Feature</h2>
        <Form<Feature>
          api="http://localhost:8000/api/features"
          fields={FeatureFields}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <Table
        data={features}
        columns={FeatureColumns}
        onAdd={handleAddFeature}
        onUpdate={handleUpdateFeature}
        onDelete={handleDeleteFeature}
        editingData={editingFeature}
        setEditingData={setEditingFeature}
        handleUpdateData={handleUpdateFeature}
        handleDeleteData={handleDeleteFeature}
      />  
    </div>
  );
};

export default FeatureTable;