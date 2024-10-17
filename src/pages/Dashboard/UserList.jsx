import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import ExportToExcelUserList from "../../component/ExportToExcelUserList";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const UserList = ({ users }) => {
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  const token = useSelector((state) => state.user?.token);
  const currentUserRole = useSelector((state) => state.user?.user?.role); // Get current user's role
  console.log(currentUserRole);
  const [userList, setUserList] = useState(users);
  ``;

  const handleToggleRole = async (userId, currentRole) => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/api/users/${userId}/role`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: response.data.role } : user
        )
      );

      toast.success(`User role updated to ${response.data.role}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  // Data for each user role
  const superAdminData = useMemo(
    () =>
      userList
        .filter((user) => user.role === "superAdmin")
        .map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        })),
    [userList]
  );

  const adminData = useMemo(
    () =>
      userList
        .filter((user) => user.role === "admin")
        .map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: "Seller",
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        })),
    [userList]
  );

  const userData = useMemo(
    () =>
      userList
        .filter((user) => user.role !== "admin" && user.role !== "superAdmin")
        .map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role === "admin" ? "Seller" : "Customer",
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        })),
    [userList]
  );

  // Column definitions for each table
  const superAdminColumns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Created At", accessor: "createdAt" },
    ],
    []
  ); // No action column for superAdmin table

  const adminColumns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Created At", accessor: "createdAt" },
      ...(currentUserRole === "superAdmin" // Check strictly for "superAdmin"
        ? [
            {
              Header: "Action",
              accessor: "id",
              Cell: ({ row }) => (
                <button
                  className={`px-4 py-2 text-white rounded ${
                    row.original.role === "Seller"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                  onClick={() =>
                    handleToggleRole(row.original.id, row.original.role)
                  }
                >
                  {row.original.role === "Seller"
                    ? "Make Customer"
                    : "Make Seller"}
                </button>
              ),
            },
          ]
        : []),
    ],
    [userList, currentUserRole]
  );
  const userColumns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Created At", accessor: "createdAt" },
      ...(currentUserRole === "superAdmin" // Show action column only if the current user is superAdmin
        ? [
            {
              Header: "Action",
              accessor: "id",
              Cell: ({ row }) => (
                <button
                  className={`px-4 py-2 text-white rounded ${
                    row.original.role === "Customer"
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`}
                  onClick={() =>
                    handleToggleRole(row.original.id, row.original.role)
                  }
                >
                  {row.original.role === "Customer"
                    ? "Make Seller"
                    : "Make User"}
                </button>
              ),
            },
          ]
        : []),
    ],
    [userList, currentUserRole]
  );

  const superAdminTable = useTable({
    columns: superAdminColumns,
    data: superAdminData,
  });
  const adminTable = useTable({ columns: adminColumns, data: adminData });
  const userTable = useTable({ columns: userColumns, data: userData });

  return (
    <div className="mt-10">
      <div className="mb-6 overflow-x-auto bg-blue-100 rounded-lg shadow-md">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-blue-800">Admin List</h3>
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-96">
          <table
            {...superAdminTable.getTableProps()}
            className="min-w-full bg-white divide-y divide-gray-200 table-auto"
          >
            <thead className="bg-gray-50">
              {superAdminTable.headerGroups.map((headerGroup) => (
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
              {...superAdminTable.getTableBodyProps()}
              className="divide-y divide-gray-200 text-sm text-gray-700"
            >
              {superAdminTable.rows.map((row) => {
                superAdminTable.prepareRow(row);
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

      {/* Admin Table */}

      <div className="mb-6 overflow-x-auto bg-green-100 rounded-lg shadow-md">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-green-800">Seller List</h3>
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-96">
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

      {/* User Table */}
      <div className="overflow-x-auto bg-yellow-100 rounded-lg shadow-md">
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-yellow-800">
            All Customers
          </h3>
          <ExportToExcelUserList data={userData} fileName="All Users List" />
        </div>
        <div className="overflow-x-auto overflow-y-auto max-h-96">
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
