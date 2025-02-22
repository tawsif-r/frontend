import { Feature } from '../types/types'; // Assuming you have a types file where Feature is defined

export const addFeature = async (newFeature: Partial<Feature>): Promise<Feature> => {
    try {
        const response = await fetch('http://localhost:8000/api/features', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFeature),
        });
        if (!response.ok) throw new Error('Failed to add Feature');
        const addedFeature = await response.json();
        return addedFeature;
    } catch (err: any) {
        throw new Error(err.message);
    }
};


export const getFeature = async (id: number): Promise<Feature> => {
    try {
        const response = await fetch(`http://localhost:8000/api/features/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Feature = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch Feature: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while fetching the Feature.');
        }
    }
};


// Function to update a Feature
export const updateFeature = async (updatedFeature: Feature): Promise<Feature> => {
    try {
        const response = await fetch(`http://localhost:8000/api/features/${updatedFeature.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFeature),
        });

        if (!response.ok) {
            throw new Error('Failed to update Feature');
        }

        const updatedData = await response.json();
        return updatedData; // Return the updated Feature data
    } catch (err: any) {
        throw new Error(err.message); // Rethrow the error for handling in the component
    }
};



// Function to delete a Feature
export const deleteFeature = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8000/api/features/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete Feature');
        }

        // No need to return anything for DELETE requests
    } catch (err: any) {
        throw new Error(err.message); // Rethrow the error for handling in the component
    }
};