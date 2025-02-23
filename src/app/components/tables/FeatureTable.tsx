import React from 'react';
import { Column, Feature } from '../../types/types';
import Link from 'next/link';

type FeatureTableProps = {
    features: Feature[];
    columns: Column<Feature>[];
    editingFeature: Feature | null;
    setEditingFeature: React.Dispatch<React.SetStateAction<Feature | null>>;
    handleUpdateFeature: (updatedFeature: Feature) => void;
    handleDeleteFeature: (id: number) => void;
};

const FeatureTable: React.FC<FeatureTableProps> = ({
    features,
    columns,
    editingFeature,
    setEditingFeature,
    handleUpdateFeature,
    handleDeleteFeature,
}) => {
    return (
        <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full">
                {/* Table Header */}
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="px-6 py-3 bg-slate-950 text-left font-medium uppercase tracking-wider">
                                {column.header}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left font-medium uppercase tracking-wider bg-slate-950 ">Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {features.map((feature) => (
                        <tr key={feature.id} className="border-b border-gray-700 bg-slate-900 hover:bg-gray-800 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">{feature.id}</td>
                            {/* Feature Name */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingFeature?.id === feature.id ? (
                                    <input
                                        type="text"
                                        value={editingFeature.name}
                                        onChange={(e) =>
                                            setEditingFeature((prev) =>
                                                prev ? { ...prev, name: e.target.value } : null
                                            )
                                        }
                                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Feature name"
                                    />
                                ) : (
                                    feature.name
                                )}
                            </td>

                            {/* Feature Description */}
                            <td className="px-6 py-4 whitespace-pre-line">
                                {editingFeature?.id === feature.id ? (
                                    <input
                                        type="text"
                                        value={editingFeature.description}
                                        onChange={(e) =>
                                            setEditingFeature((prev) =>
                                                prev ? { ...prev, description: e.target.value } : null
                                            )
                                        }
                                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Feature description"
                                    />
                                ) : (
                                    <div className="line-clamp-2">
                                        {feature.description}
                                    </div>
                                )}
                            </td>

                            {/* Feature Price */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingFeature?.id === feature.id ? (
                                    <input
                                        type="number"
                                        value={editingFeature.price ?? ''}
                                        onChange={(e) =>
                                            setEditingFeature((prev) =>
                                                prev
                                                    ? { ...prev, price: parseFloat(e.target.value) || 0 }
                                                    : null
                                            )
                                        }
                                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Feature price"
                                    />
                                ) : (
                                    feature.price
                                )}
                            </td>

                            {/* Feature Created At */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingFeature?.id === feature.id ? (
                                    <input
                                        type="date"
                                        value={
                                            editingFeature.created_at instanceof Date
                                                ? editingFeature.created_at.toISOString().split('T')[0]
                                                : ''
                                        }
                                        onChange={(e) =>
                                            setEditingFeature((prev) =>
                                                prev
                                                    ? { ...prev, created_at: new Date(e.target.value) }
                                                    : null
                                            )
                                        }
                                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                ) : (
                                    feature.created_at instanceof Date ||
                                        !isNaN(new Date(feature.created_at).getTime()) ? (
                                        new Date(feature.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })
                                    ) : (
                                        'No Date Available'
                                    )
                                )}
                            </td>

                            {/* Feature Updated At */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingFeature?.id === feature.id ? (
                                    <input
                                        type="date"
                                        value={
                                            editingFeature.updated_at instanceof Date
                                                ? editingFeature.updated_at.toISOString().split('T')[0]
                                                : ''
                                        }
                                        onChange={(e) =>
                                            setEditingFeature((prev) =>
                                                prev
                                                    ? { ...prev, updated_at: new Date(e.target.value) }
                                                    : null
                                            )
                                        }
                                        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                ) : (
                                    feature.updated_at instanceof Date ||
                                        !isNaN(new Date(feature.updated_at).getTime()) ? (
                                        new Date(feature.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })
                                    ) : (
                                        'No Date Available'
                                    )
                                )}
                            </td>

                            {/* Feature Is Active */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingFeature?.id === feature.id ? (
                                    <input
                                        type="checkbox"
                                        checked={!!editingFeature.is_active}
                                        onChange={(e) =>
                                            setEditingFeature((prev) =>
                                                prev ? { ...prev, is_active: e.target.checked } : null
                                            )
                                        }
                                        className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-gray-800"
                                    />
                                ) : (
                                    feature.is_active ? 'Yes' : 'No'
                                )}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {editingFeature?.id === feature.id ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                if (editingFeature) handleUpdateFeature(editingFeature);
                                            }}
                                            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingFeature(null)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setEditingFeature(feature)}
                                            className="px-2 py-2 text-white rounded-md hover:scale-150 transition-all duration-300"
                                        >
                                            <svg className="w-5 h-5 flex-shrink-0 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFeature(feature.id)}
                                            className="px-2 py-2 text-white rounded-md hover:scale-150 transition-all duration-300"
                                        ><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeWidth="2" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </button>
                                        <Link className="inline-block text-white rounded-md 
                                                hover:scale-150 transition-all duration-300" href={`/features/${feature.id}`}>
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                            </svg>
                                        </Link>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeatureTable;