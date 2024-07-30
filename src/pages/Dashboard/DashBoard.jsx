import React, { useMemo } from "react";
import { useTable } from "react-table";
import { format } from "date-fns";
import ExportToExcel from "../../component/ExportToExcel";

const Dashboard = ({ usersWithOrders, handleUpdateOrderStatus }) => {
  const data = useMemo(
    () =>
      usersWithOrders.flatMap((user) =>
        user.orders.map((order) => ({
          name: user.name,
          email: user.email,
          mobile: `0${order.mobile}`,
          address: order.address,
          orderId: order._id,
          products: order.products.map(
            (product) =>
              `${product.productId.title} - Quantity: ${product.quantity} `
          ),
          amountTotal: order.amountTotal.$numberDecimal,
          amountShipping: order.amountShipping.$numberDecimal,
          date: format(new Date(order.createdAt), "dd/MM/yyyy"),
          status: order.status,
        }))
      ),
    [usersWithOrders]
  );

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Mobile", accessor: "mobile" },
      { Header: "Address", accessor: "address" },
      { Header: "Order ID", accessor: "orderId" },
      { Header: "Products", accessor: "products" },
      { Header: "Total Amount", accessor: "amountTotal" },
      { Header: "Shipping Amount", accessor: "amountShipping" },
      { Header: "Date", accessor: "date" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <span className="mr-2 capitalize">{row.original.status}</span>
            {row.original.status === "pending" && (
              <button
                onClick={() =>
                  handleUpdateOrderStatus(row.original.orderId, "approved")
                }
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Approve
              </button>
            )}
          </div>
        ),
      },
    ],
    [handleUpdateOrderStatus]
  );

  console.log(data);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md ">
      <div className="text-right p-4">
        <ExportToExcel data={data} fileName="orders" />
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-96">
        <table
          {...getTableProps()}
          className="min-w-full bg-white divide-y divide-gray-200 table-auto"
        >
          <thead className="bg-gray-50 sticky top-0">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-2 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider"
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
                    <td {...cell.getCellProps()} className="px-2 py-4 ">
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

export default Dashboard;
