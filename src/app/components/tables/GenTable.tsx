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
  // onAdd,
  onUpdate,
  onDelete,
  editingData,
  setEditingData,
  handleUpdateData,
  handleDeleteData,
}: TableProps<T>) => {
  const [newRow, setNewRow] = useState<Partial<T>>({});
  const [editRow, setEditRow] = useState<T | null>(null);

  // const handleAdd = () => {
  //   if (Object.keys(newRow).length > 0) {
  //     onAdd({ ...newRow, id: Date.now() } as T);
  //     setNewRow({});
  //   }
  // };

  const handleSave = () => {
    if (editRow) {
      handleUpdateData(editRow);
    }
  };

  return (
    <div className="ml-2 overflow-x-auto rounded-xl shadow-xl">
      {/* <div className="p-4 bg-slate-950">
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
      </div> */}

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
                      className="mr-2 px-2 py-1"
                      onClick={handleSave}
                    >
                      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover:scale-150 transition-all duration-300">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>

                    </button>
                    <button
                      className="mr-2 px-2 py-1"
                      onClick={() => {
                        setEditingData(null);
                        setEditRow(null);
                      }}
                    >
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:scale-150 transition-all duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>

                    </button>
                  </>
                ) : (
                  <button
                    className="px-2 py-2 rounded-md hover:scale-150 transition-all duration-300"
                    onClick={() => {
                      setEditingData(row);
                      setEditRow({ ...row }); // Create a copy of the row
                    }}
                  >
                    <svg className="w-5 h-5 flex-shrink-0 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                )}
                <button
                  className="px-2 py-2 rounded-md hover:scale-150 transition-all duration-300"
                  onClick={() => handleDeleteData(row.id)}
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeWidth="2" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

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