import { Product } from '../types/types'; // Assuming you have a types file where Product is defined
import { SetStateAction, Dispatch } from 'react';

export const addData= async <T>(
    api:string,
    newProduct: Partial<T>): Promise<T> => {
    console.log('POST Request Payload:', JSON.stringify(newProduct, null, 2));
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });
        if (!response.ok) throw new Error('Failed to add data');
        const addedProduct = await response.json();
        return addedProduct;
    } catch (err: any) {
        throw new Error(err.message);
    }
};




export const fetchData = async <T>(
    api: string,
    setData: Dispatch<SetStateAction<T>>, // Generic type for setting data
    setError: Dispatch<SetStateAction<string>>, // Correct type for setting error
    setLoading: Dispatch<SetStateAction<boolean>> // Correct type for setting loading
  ) => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(api);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setData(data); // Set the fetched data
    } catch (err: any) {
      setError(err.message); // Set the error message
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

export const getData = async <T>(
    api: string,
    id: number): Promise<T> => {
    try {
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch product: ${error.message}`);
        } else {
            throw new Error('An unexpected error occurred while fetching the product.');
        }
    }
};


// Function to update a product
export const updateData = async <T>(
    api:string,
    updatedProduct: T): Promise<T> => {
    try {
        const response = await fetch(api, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const updatedData = await response.json();
        console.log(updatedData)
        return updatedData; // Return the updated product data
    } catch (err: any) {
        throw new Error(err.message); // Rethrow the error for handling in the component
    }
};



// Function to delete a product
export const deleteData = async (
    api:string,
    id: number): Promise<void> => {
    try {
        const response = await fetch(api, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        // No need to return anything for DELETE requests
    } catch (err: any) {
        throw new Error(err.message); // Rethrow the error for handling in the component
    }
};