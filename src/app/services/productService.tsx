import { Product } from '../types/product'; // Assuming you have a types file where Product is defined

export const addProduct = async (newProduct: Partial<Product>): Promise<Product> => {
    try {
        const response = await fetch('http://localhost:8000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });
        if (!response.ok) throw new Error('Failed to add product');
        const addedProduct = await response.json();
        return addedProduct;
    } catch (err: any) {
        throw new Error(err.message);
    }
};


export const getProduct = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Product = await response.json();
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
export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
    try {
        const response = await fetch(`http://localhost:8000/api/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const updatedData = await response.json();
        return updatedData; // Return the updated product data
    } catch (err: any) {
        throw new Error(err.message); // Rethrow the error for handling in the component
    }
};



// Function to delete a product
export const deleteProduct = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`, {
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