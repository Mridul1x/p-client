import React, { useMemo } from "react";
import { useTable } from "react-table";
import ExportToExcelUserList from "../../component/ExportToExcelUserList";

const UserList = ({ users }) => {
  const adminData = useMemo(
    () =>
      users
        .filter((user) => user.role === "admin")
        .map((user) => ({
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        })),
    [users]
  );

  const userData = useMemo(
    () =>
      users
        .filter((user) => user.role !== "admin")
        .map((user) => ({
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

  const adminTable = useTable({ columns, data: adminData });
  const userTable = useTable({ columns, data: userData });

  return (
    <div className="mt-10">
      <div className="mb-6">
        <div className="flex justify-between p-4">
          <h3 className="text-lg font-semibold">Admin List</h3>
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-96 md:overflow-x-visible">
          <table
            {...adminTable.getTableProps()}
            className="min-w-full bg-white divide-y divide-gray-200 table-auto"
          >
            <thead className="bg-gray-50">
              {adminTable.headerGroups.map((headerGroup) => (
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
              {...adminTable.getTableBodyProps()}
              className="divide-y divide-gray-200 text-sm text-gray-700"
            >
              {adminTable.rows.map((row) => {
                adminTable.prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-50">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-base font-medium"
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

      <div className="mt-10 overflow-hidden border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between p-4">
          <h3 className="text-lg font-semibold">All Users</h3>
          <ExportToExcelUserList data={userData} fileName="All Users List" />
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-96 md:overflow-x-visible">
          <table
            {...userTable.getTableProps()}
            className="min-w-full bg-white divide-y divide-gray-200 table-auto"
          >
            <thead className="bg-gray-50">
              {userTable.headerGroups.map((headerGroup) => (
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
              {...userTable.getTableBodyProps()}
              className="divide-y divide-gray-200 text-sm text-gray-700"
            >
              {userTable.rows.map((row) => {
                userTable.prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-50">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-base font-medium"
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
    </div>
  );
};

export default UserList;
