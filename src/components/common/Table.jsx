import React from "react";

const Table = ({ columnDefs, rowData }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-2xl">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columnDefs.map((item, i) => (
              <th
                key={i}
                className="px-4 py-4 border-b bg-blue-100 text-left text-sm font-medium text-gray-600"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-4 border-b text-sm text-gray-800"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
