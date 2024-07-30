import React, { useMemo } from "react";
import { useTable } from "react-table";
import ExportToExcelUserList from "../../component/ExportToExcelUserList";

const UserList = ({ users }) => {
  const data = useMemo(
    () =>
      users.map((user) => ({
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      })),
    [users]
  );

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Created At", accessor: "createdAt" },
    ],
    []
  );

  console.log(data);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="mt-10 overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <div className="flex justify-between p-4">
        <h3 className="text-lg font-semibold">All Users</h3>
        <ExportToExcelUserList data={data} fileName="All Users List" />
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-96 md:overflow-x-visible">
        <table
          {...getTableProps()}
          className="min-w-full bg-white divide-y divide-gray-200 table-auto"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-sm font-semibold text-black uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="divide-y divide-gray-200 text-sm text-gray-700"
          >
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
