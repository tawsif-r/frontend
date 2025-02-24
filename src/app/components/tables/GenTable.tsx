import React, { useState } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T, updateRow?: (updatedRow: T) => void) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onAdd: (newRow: T) => void;
  onUpdate: (updatedRow: T) => void;
  onDelete: (id: number) => void;
  editingData: T | null;
  setEditingData: (data: T | null) => void;
  handleUpdateData: (updatedData: T) => void;
  handleDeleteData: (id: number) => void;
};

const Table = <T extends { id: number }>({
  data,
  columns,
  onAdd,
  onUpdate,
  onDelete,
  editingData,
  setEditingData,
  handleUpdateData,
  handleDeleteData,
}: TableProps<T>) => {
  const [newRow, setNewRow] = useState<Partial<T>>({});
  const [editRow, setEditRow] = useState<T | null>(null);

  const handleAdd = () => {
    if (Object.keys(newRow).length > 0) {
      onAdd({ ...newRow, id: Date.now() } as T);
      setNewRow({});
    }
  };

  const handleSave = () => {
    if (editRow) {
      handleUpdateData(editRow);
    }
  };

  return (
    <div className="ml-2 overflow-x-auto rounded-xl shadow-lg">
      <div className="p-4 bg-slate-950">
        <div className="flex gap-2 flex-wrap">
          {columns.map((column) => (
            <input
              key={String(column.accessor)}
              className="px-2 py-1 bg-slate-800 text-white rounded"
              type="text"
              placeholder={`Enter ${column.header}`}
              value={(newRow[column.accessor] as string) || ""}
              onChange={(e) =>
                setNewRow((prev) => ({
                  ...prev,
                  [column.accessor]: e.target.value,
                }))
              }
            />
          ))}
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-slate-950 text-left font-medium uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            <th className="px-6 py-3 bg-slate-950 text-left font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column, colIndex) => {
                const value = editingData?.id === row.id && editRow 
                  ? editRow[column.accessor] // Use editRow value when editing
                  : row[column.accessor];
                return (
                  <td
                    className="px-6 py-2 border-b border-gray-700 bg-slate-900 hover:bg-gray-800 transition-colors duration-150"
                    key={colIndex}
                  >
                    {editingData?.id === row.id && column.render
                      ? column.render(value, row, (updatedRow) => setEditRow(updatedRow))
                      : column.render
                      ? column.render(value, row)
                      : String(value)}
                  </td>
                );
              })}
              <td className="px-6 py-2 border-b border-gray-700 bg-slate-900">
                {editingData?.id === row.id ? (
                  <>
                    <button
                      className="mr-2 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="mr-2 px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                      onClick={() => {
                        setEditingData(null);
                        setEditRow(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="mr-2 px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    onClick={() => {
                      setEditingData(row);
                      setEditRow({ ...row }); // Create a copy of the row
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDeleteData(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;