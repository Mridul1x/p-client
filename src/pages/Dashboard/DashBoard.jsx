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
            <span className="mr-2 uppercase">{row.original.status}</span>
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className="flex justify-end">
        <ExportToExcel data={data} fileName="orders" />
      </div>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table
          {...getTableProps()}
          className="w-full mt-4 text-left border-collapse"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="py-2 px-4 bg-gray-200 uppercase font-semibold text-sm "
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b hover:bg-gray-100 duration-300"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="py-3 px-4 whitespace-nowrap"
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

export default Dashboard;
