'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Product } from '../../../types/types';
import { getProduct } from '@/app/services/productService';

export default function ProductDetail() {
    const params = useParams();
    const productId = Number(params.id);
    const [productData, setProductData] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const product = await getProduct(productId);
                setProductData(product);
            } catch (err) {
                setError('Failed to load product details. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [productId]);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Product Details
                </h1>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cyan-500"></div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                {/* Product Content */}
                {!loading && !error && productData && (
                    <div className="shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-gray-800 p-6">
                            {/* Product Image */}
                            <div className="mb-6">
                                <img
                                    src={productData.image}
                                    alt={productData.title}
                                    className="w-full h-64 object-cover rounded-md border border-gray-200"
                                    // onError={(e) => (e.currentTarget.src = '/placeholder-image.jpg')} // Fallback image
                                />
                            </div>

                            {/* Product Details */}
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-sm font-medium">Product ID</h2>
                                    <p className="text-lg">{productData.id}</p>
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium ">Title</h2>
                                    <p className="text-lg  font-semibold">{productData.title}</p>
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium">Image URL</h2>
                                    <a
                                        href={productData.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-600 hover:text-cyan-800 break-all"
                                    >
                                        {productData.image}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Back Button */}
                        
                        <div className="p-6 border-t bg-slate-800 border-gray-200">
                            <button
                                
                                className="w-full sm:w-auto px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 
                                    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 
                                    focus:ring-offset-2"
                            ><Link href={`${productId}/update`}>Edit</Link>
                                
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="w-full sm:w-auto ml-3 px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 
                                    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 
                                    focus:ring-offset-2"
                            >
                                Back to Products
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && !productData && (
                    <div className="text-center text-gray-500 py-12">
                        <p>No product found with ID {productId}</p>
                    </div>
                )}
            </div>
        </div>
    );
}