// src/components/ProductForm.tsx
import React from 'react';

type Product = {
    id?: number;
    title: string;
    image: string;
};

type ProductFormProps = {
    product: Partial<Product>;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onChange }) => {
    return (
        <form onSubmit={onSubmit} className="mb-4">
            <input
                type="text"
                name="title"
                placeholder="Product Title"
                value={product.title || ''}
                onChange={onChange}
                className="border bg-slate-600 p-2 mr-2 rounded"
            />
            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={product.image || ''}
                onChange={onChange}
                className="border bg-slate-600 p-2 mr-2 rounded"
            />
            <button type="submit" className="border-2 hover:bg-cyan-900 px-4 py-2 rounded">
                Add Product
            </button>
        </form>
    );
};

export default ProductForm;