'use client';
import React, { useEffect, useState } from 'react';
import { Feature, Column } from '../../types/types';
import { addData, updateData, deleteData, fetchData} from '@/app/services/apiService';
import FeatureForm from '../../components/forms/FeatureForm';
import FeatureTable from '../../components/tables/FeatureTable';

const featuresPage: React.FC = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [newFeature, setNewFeature] = useState<Partial<Feature>>({
        name: '',
        description: '',
        price: 0,
        created_at: new Date(),
        updated_at: new Date(),
        
        
    });
    const [editingFeature, setEditingFeature] = useState<Feature | null>(null);

    // Fetch features
    useEffect(() => {
        
        fetchData('http://localhost:8000/api/features',setFeatures,setError,setLoading);
    }, []);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewFeature((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        try {
            // Add the new feature using the `addFeature` function
            const addedFeature = await addData('http://localhost:8000/api/features',newFeature);
    
            // Update the features list with the newly added feature
            setFeatures((prevFeatures) => [...prevFeatures, addedFeature]);
    
            // Reset the form fields to their default values
            setNewFeature({
                name: '',
                description: '',
                price: 0, // Reset to 0 (or '' if price is stored as a string)
                created_at: new Date(), // Set to the current date
                updated_at: new Date(), // Set to the current date
                is_active: false,
            });
    
            // Optionally, clear any existing error messages
            setError('');
        } catch (err: any) {
            // Handle errors and set an error message
            setError(`Failed to add feature: ${err.message}`);
        }
    };

    // Handle update Feature
    const handleUpdateFeature = async (updatedFeature: Feature) => {
        try {
            const updatedData = await updateData(`http://localhost:8000/api/features/${updatedFeature.id}`,updatedFeature);
            setFeatures((prev) => prev.map((p) => (p.id === updatedData.id ? updatedData : p)));
            setEditingFeature(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Handle delete Feature
    const handleDeleteFeature = async (id: number) => {
        try {
            await deleteData(`http://localhost:8000/api/features/${id}`,id);
            setFeatures((prev) => prev.filter((p) => p.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const FeatureColumns: Column<Feature>[] = [
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Description", accessor: "description"},
        { header: "Price", accessor: "price" },
        { header: "Created At", accessor:"created_at"},
        { header: "Updated At", accessor:"updated_at"},
        { header: "Active", accessor: "is_active"},
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">features</h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <FeatureForm
                        feature={newFeature}
                        onSubmit={handleSubmit}
                        onChange={handleInputChange}
                    />
                    <FeatureTable
                        features={features}
                        columns={FeatureColumns}
                        editingFeature={editingFeature}
                        setEditingFeature={setEditingFeature}
                        handleUpdateFeature={handleUpdateFeature}
                        handleDeleteFeature={handleDeleteFeature}
                    />
                </>
            )}
        </div>
    );
};

export default featuresPage;