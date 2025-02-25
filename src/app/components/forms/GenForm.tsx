import React, { useState } from 'react';
import { addData } from '@/app/services/apiService';

// Define the type for each form field
export interface FormField<T> {
  label: string;
  name: keyof T;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date'; // Added date type
  options?: string[]; // For select fields
}

// Define the props for the Form component
export interface FormProps<T> {
  api: string;
  fields: FormField<T>[];
  onSuccess: (data: T) => void;
  onError: (error: string) => void;
}

// Generic Form Component
const Form = <T extends object>({ api, fields, onSuccess, onError }: FormProps<T>) => {
  // Initialize formData with default values for all fields
  const initialState = fields.reduce((acc, field) => ({
    ...acc,
    [field.name]: field.type === 'checkbox' ? false : ''
  }), {} as Partial<T>);

  const [formData, setFormData] = useState<Partial<T>>(initialState);

  // Handle input changes
  const handleChange = (name: keyof T, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedData = await addData<T>(api, formData);
      onSuccess(addedData);
      setFormData(initialState); // Reset to initial state
    } catch (err: any) {
      onError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-800 p-6 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-700">
      {fields.map((field) => (
        <div key={String(field.name)} style={{ marginBottom: '10px' }}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">{field.label}</label>
          {field.type === 'select' ? (
            <select
              value={(formData[field.name] as string) || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === 'checkbox' ? (
            <input
              type="checkbox"
              checked={!!formData[field.name] as boolean}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
            />
          ) : field.type === 'date' ? (
            <input
              type="date"
              value={(formData[field.name] as string) ?? ''} // Date will be stored as string in YYYY-MM-DD format
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
            />
          ) : (
            <input
              type={field.type}
              value={(formData[field.name] as string | number) ?? ''} // Use empty string as fallback
              onChange={(e) =>
                handleChange(
                  field.name,
                  field.type === 'number' && e.target.value !== ''
                    ? parseFloat(e.target.value)
                    : e.target.value
                )
              }
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent 
                            disabled:opacity-50 placeholder-gray-400 transition-all duration-200"
            />
          )}
        </div>
      ))}

      <button 
        type="submit" 
        className={`w-full py-2.5 px-4 bg-cyan-600 text-white font-medium rounded-md 
            hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 
            focus:ring-offset-2 focus:ring-offset-gray-800 
            disabled:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed 
            transition-all duration-200`}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;