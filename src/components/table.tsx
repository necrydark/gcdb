import React from "react";

interface IProps {
  headers: any[];
  data: any[];
}

const Table: React.FC<IProps> = ({
  headers,
  data,
}: {
  headers: any[];
  data: any[];
}) => {
  return (
    <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="odd:bg-white odd:dark:bg-gray-900  border border-gray-500  even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          {headers.map((header) => (
            <th className="px-6 py-3" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="odd:bg-white odd:dark:bg-gray-900  border border-gray-500  even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          {Object.entries(data).map(([key, value]) => (
            <td className="px-6 py-4" key={key}>
              <td>{value}</td>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
