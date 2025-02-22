// import React, { useState } from 'react';
// import { Product } from '@/app/types/types';
// import { updateProduct } from '../../services/productService';

// interface UpdateProductFormProps {
//     initialProduct: Product;
// }

// const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ initialProduct }) => {
//     const [product, setProduct] = useState<Product>(initialProduct);
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<boolean>(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Handle form input changes
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setProduct({ ...product, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         try {
//             const updatedProduct = await updateProduct(product);
//             setSuccess(true);
//             setError(null);
//             console.log('Product updated:', updatedProduct);
//         } catch (err: any) {
//             setError(err.message);
//             setSuccess(false);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen py-8">
//             <div className="max-w-lg mx-auto">
//                 <h1 className="text-2xl font-bold text-white mb-6 text-center">Update Product</h1>

//                 {/* Status Messages */}
//                 {success && (
//                     <div className="mb-4 p-3 bg-green-600/20 border border-green-500 rounded-md text-green-300 text-center">
//                         Product updated successfully!
//                     </div>
//                 )}
//                 {error && (
//                     <div className="mb-4 p-3 bg-red-600/20 border border-red-500 rounded-md text-red-300 text-center">
//                         {error}
//                     </div>
//                 )}

//                 {/* Form */}
//                 <form 
//                     onSubmit={handleSubmit} 
//                     className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700"
//                 >
//                     <div className="space-y-6">
//                         {/* ID Field */}
//                         <div>
//                             <label 
//                                 htmlFor="id" 
//                                 className="block text-sm font-medium text-gray-300 mb-2"
//                             >
//                                 Product ID
//                             </label>
//                             <input
//                                 type="number"
//                                 id="id"
//                                 name="id"
//                                 value={product.id}
//                                 onChange={handleChange}
//                                 disabled
//                                 className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
//                                     disabled:opacity-50 disabled:cursor-not-allowed"
//                             />
//                         </div>

//                         {/* Title Field */}
//                         <div>
//                             <label 
//                                 htmlFor="title" 
//                                 className="block text-sm font-medium text-gray-300 mb-2"
//                             >
//                                 Title
//                             </label>
//                             <input
//                                 type="text"
//                                 id="title"
//                                 name="title"
//                                 value={product.title}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
//                                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
//                                     placeholder-gray-400"
//                                 placeholder="Enter product title"
//                             />
//                         </div>

//                         {/* Image Field */}
//                         <div>
//                             <label 
//                                 htmlFor="image" 
//                                 className="block text-sm font-medium text-gray-300 mb-2"
//                             >
//                                 Image URL
//                             </label>
//                             <textarea
//                                 id="image"
//                                 name="image"
//                                 value={product.image}
//                                 onChange={handleChange}
//                                 required
//                                 rows={3}
//                                 className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
//                                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
//                                     placeholder-gray-400 resize-y"
//                                 placeholder="Enter image URL"
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className={`w-full py-2.5 px-4 rounded-md text-white font-medium
//                                 ${isSubmitting 
//                                     ? 'bg-cyan-700 cursor-not-allowed opacity-75' 
//                                     : 'bg-cyan-600 hover:bg-cyan-700'} 
//                                 transition-colors duration-200`}
//                         >
//                             {isSubmitting ? 'Updating...' : 'Update Product'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateProductForm;