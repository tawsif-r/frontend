'use client';
import React from 'react';
import { addData } from '@/app/services/apiService';

export interface FormField<T> {
  label: string;
  name: keyof T;
  type: string;
  options?: string[] | { value: string; label: string }[];
  multiple?: boolean;
}

interface FormProps<T> {
  api: string;
  fields: FormField<T>[];
  onSuccess: (data: T) => void;
  onError: (error: string) => void;
}

const GenForm = <T,>({ api, fields, onSuccess, onError }: FormProps<T>) => {
  const [formData, setFormData] = React.useState<Partial<T>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target instanceof HTMLSelectElement && e.target.multiple
        ? Array.from(e.target.selectedOptions).map((option) => option.value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addData(api, formData);
      onSuccess(response);
    } catch (err: any) {
      onError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name as string}>
          <label className="block mb-1">{field.label}</label>
          {field.type === 'select' && field.options ? (
            <select
              name={field.name as string}
              multiple={field.multiple}
              value={field.multiple ? (formData[field.name] as string[] || []) : (formData[field.name] as string || '')}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white p-2 rounded"
            >
              {field.options.map((option) =>
                typeof option === 'string' ? (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ) : (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )
              )}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name as string}
              value={(formData[field.name] as string) || ''}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white p-2 rounded"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-sky-800 hover:bg-indigo-900 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default GenForm;