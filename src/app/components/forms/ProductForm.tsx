import React from 'react';

type Product = {
    id?: number;
    title: string;
    image: string;
};

type ProductFormProps = {
    product: Product;
    onSubmit: (product: Product) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onChange, onCancel }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(product);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={product.title}
                onChange={onChange}
                placeholder="Title"
                required
            />
            <input
                type="text"
                name="image"
                value={product.image}
                onChange={onChange}
                placeholder="Image URL"
                required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default ProductForm;