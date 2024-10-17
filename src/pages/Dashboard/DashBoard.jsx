import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { format } from "date-fns";
import ExportToExcel from "../../component/ExportToExcel";
import { getStatusColor } from "../../utilities/getStatusColor";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

const Dashboard = ({ usersWithOrders, handleUpdateOrderStatus }) => {
  const data = useMemo(
    () =>
      usersWithOrders.flatMap((user) =>
        user.orders.map((order) => ({
          name: user.name,
          email: user.email,
          mobile: `${order.mobile}`,
          address: order.address,
          orderId: order._id,
          transactionID: order.transactionID,
          products: order.products.map(
            (product) =>
              `${product.productId.title} - Quantity: ${product.quantity} `
          ),
          amountTotal: order.amountTotal.$numberDecimal,
          date: format(new Date(order.createdAt), "dd/MM/yyyy"),
          status: order.status,
        }))
      ),
    [usersWithOrders]
  );

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name", disableSortBy: true },
      { Header: "Email", accessor: "email", disableSortBy: true },
      { Header: "Mobile", accessor: "mobile", disableSortBy: true },
      { Header: "Address", accessor: "address", disableSortBy: true },
      { Header: "Order ID", accessor: "orderId", disableSortBy: true },
      { Header: "Products", accessor: "products", disableSortBy: true },
      {
        Header: "Date",
        accessor: "date",
        disableSortBy: false, // Enable sorting
        sortType: (rowA, rowB) => {
          const dateA = new Date(rowA.original.date);
          const dateB = new Date(rowB.original.date);
          return dateB - dateA; // Sort latest dates first
        },
      },
      { Header: "Shipping", accessor: "amountShipping", disableSortBy: true },
      { Header: "Total", accessor: "amountTotal", disableSortBy: true },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <span className="mr-2 capitalize">{row.original.status}</span>
            {row.original.status === "pending" && (
              <>
                <button
                  onClick={() =>
                    handleUpdateOrderStatus(row.original.orderId, "approved")
                  }
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleUpdateOrderStatus(row.original.orderId, "cancelled")
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        ),
      },
    ],
    [handleUpdateOrderStatus]
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's assume all columns are sortable by default, but you can override this on a per-column basis
      disableSortBy: true,
    }),
    []
  );

  const initialSortBy = React.useMemo(
    () => [
      {
        id: "date",
        desc: false, // Sort by date in descending order (latest dates first)
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, defaultColumn, initialState: { sortBy: initialSortBy } },
      useSortBy
    );

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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-2 py-4 text-left text-sm font-semibold text-black uppercase tracking-wider"
                  >
                    {column.render("Header")}
                    <span className="inline-block">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowDownLong className="w-3 h-3"></FaArrowDownLong>
                        ) : (
                          <FaArrowUpLong className="w-3 h-3"></FaArrowUpLong>
                        )
                      ) : (
                        ""
                      )}
                    </span>
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
                    <td {...cell.getCellProps()} className="px-2 py-4   ">
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
