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
    isSubmitting?: boolean; // Optional prop for loading state
};

const ProductForm: React.FC<ProductFormProps> = ({ 
    product, 
    onSubmit, 
    onChange, 
    isSubmitting = false 
}) => {
    return (
        <form 
            onSubmit={onSubmit} 
            className="mb-6 bg-gray-800 p-6 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-700"
        >
            <div className="space-y-5">
                {/* Title Field */}
                <div>
                    <label 
                        htmlFor="title" 
                        className="block text-sm font-medium text-gray-300 mb-1.5"
                    >
                        Product Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter product title"
                        value={product.title || ''}
                        onChange={onChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
                    />
                </div>

                {/* Image URL Field */}
                <div>
                    <label 
                        htmlFor="image" 
                        className="block text-sm font-medium text-gray-300 mb-1.5"
                    >
                        Image URL
                    </label>
                    <input
                        type='text'
                        // type="url"
                        id="image"
                        name="image"
                        placeholder="https://example.com/image.jpg"
                        value={product.image || ''}
                        onChange={onChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2.5 px-4 bg-cyan-600 text-white font-medium rounded-md 
                        hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 
                        focus:ring-offset-2 focus:ring-offset-gray-800 
                        disabled:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed 
                        transition-all duration-200`}
                >
                    {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;