import React from "react";

const GearTable = ({ headers, data }: { headers: any[]; data: any[] }) => {
  return (
    <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="odd:bg-white odd:dark:bg-gray-900  border border-gray-500  even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-700">
          {headers.map((header) => (
            <th className="px-6 py-3" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            className="odd:bg-white text-center odd:dark:bg-gray-900  border border-gray-500  even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-600"
          >
            <td className="px-6 py-4" key={row.id}>
              {row.gearIcon}
            </td>
            <td className="px-6 py-4" key={row.id}>
              {row.jpName}
            </td>
            <td className="px-6 py-4" key={row.id}>
              {row.name}
            </td>
            <td className="px-6 py-4" key={row.id}>
              {row.set}
            </td>
            <td className="px-6 py-4" key={row.id}>
              {row.setBonus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GearTable;
