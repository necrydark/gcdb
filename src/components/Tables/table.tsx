import React from "react";

const GearTable = ({ headers, data }: { headers: any[]; data: any[] }) => {
  return (
    <table className="w-full text-sm  rtl:text-right even:text-white odd:text-black  font-bold">
      <thead className="text-xs text-white uppercase bg-purple-50 dark:bg-purple-700 dark:text-white">
        <tr className="odd:bg-purple-400 odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 text-center even:dark:bg-purple-700 border-b dark:border-purple-700">
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
            className="odd:bg-purple-400 odd:dark:bg-purple-900 odd:text-white even:text-black dark:even:text-white  border border-purple-500  even:bg-purple-50 text-center even:dark:bg-purple-700 border-b dark:border-purple-700"
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
