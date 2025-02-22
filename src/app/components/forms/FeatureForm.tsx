import React from 'react';

type Feature = {
    id?: number;
    name: string;
    description: string;
    price: number | null;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
};

type FeatureFormProps = {
    feature: Partial<Feature>;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSubmitting?: boolean;
    errors?: { [key: string]: string }; // Optional error messages
};

const FeatureForm: React.FC<FeatureFormProps> = ({
    feature,
    onSubmit,
    onChange,
    isSubmitting = false,
    errors = {},
}) => {
    const defaultFeature: Partial<Feature> = {
        name: '',
        description: '',
        price: null,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: false,
    };

    const mergedFeature = { ...defaultFeature, ...feature };
    const buttonText = mergedFeature.id ? 'Update Feature' : 'Add Feature';

    return (
        <form
            onSubmit={onSubmit}
            className="mb-6 bg-gray-800 p-6 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-700"
        >
            <div className="space-y-5">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Feature Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter feature name"
                        value={mergedFeature.name || ''}
                        onChange={onChange}
                        required
                        disabled={isSubmitting}
                        aria-describedby="name-description"
                        className={`w-full px-4 py-2 bg-gray-700 text-white border ${
                            errors.name ? 'border-red-500' : 'border-gray-600'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200`}
                    />
                    <p id="name-description" className="text-xs text-gray-400 mt-1">
                        Enter the name of the feature.
                    </p>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Description Field */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Feature Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter feature description"
                        value={mergedFeature.description || ''}
                        onChange={onChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
                    />
                </div>

                {/* Price Field */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Feature Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter feature price"
                        value={mergedFeature.price ?? ''}
                        onChange={(e) =>
                            onChange({
                                target: {
                                    name: 'price',
                                    value: e.target.value === '' ? null : parseFloat(e.target.value),
                                },
                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                        }
                        step="0.01"
                        required
                        disabled={isSubmitting}
                        className={`w-full px-4 py-2 bg-gray-700 text-white border ${
                            errors.price ? 'border-red-500' : 'border-gray-600'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200`}
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>

                {/* Created At Field */}
                <div>
                    <label htmlFor="created_at" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Feature Created At
                    </label>
                    <input
                        type="date"
                        id="created_at"
                        name="created_at"
                        value={mergedFeature.created_at ? mergedFeature.created_at.toISOString().split('T')[0] : ''}
                        onChange={(e) =>
                            onChange({
                                target: {
                                    name: 'created_at',
                                    value: e.target.value,
                                },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
                    />
                </div>

                {/* Updated At Field */}
                <div>
                    <label htmlFor="updated_at" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Feature Updated At
                    </label>
                    <input
                        type="date"
                        id="updated_at"
                        name="updated_at"
                        value={mergedFeature.updated_at ? mergedFeature.updated_at.toISOString().split('T')[0] : ''}
                        onChange={(e) =>
                            onChange({
                                target: {
                                    name: 'updated_at',
                                    value: e.target.value,
                                },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
                    />
                </div>

                {/* Is Active Field */}
                <div>
                    <label htmlFor="is_active" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Feature Active
                    </label>
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={mergedFeature.is_active ?? false}
                        onChange={(e) =>
                            onChange({
                                target: {
                                    name: 'is_active',
                                    value: e.target.checked,
                                },
                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                        }
                        disabled={isSubmitting}
                        className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-gray-800 
                            disabled:opacity-50"
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
                    {isSubmitting ? 'Submitting...' : buttonText}
                </button>
            </div>
        </form>
    );
};

export default FeatureForm;