import React, { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from '@tanstack/react-table'
import { type Order, mockOrders } from '../types/order'
import CheckBox from './CheckBox'
import TitleCell from './TitleCell'

const columnHelper = createColumnHelper<Order>()

// 状态样式映射
const statusStyles = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-red-100 text-red-800',
} as const

export default function OrdersTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = [
    // 复选框列
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <CheckBox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: () => null, // 详情行中不显示复选框
      size: 48,
    }),
    // 产品列
    columnHelper.accessor('items', {
      header: 'Product',
      cell: ({ getValue }) => {
        const items = getValue()
        const item = items[0]
        return (
          <TitleCell>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-gray-600 text-sm mt-1">x{item.quantity}</div>
            <div className="text-gray-600 text-sm">Item ID: {item.itemId}</div>
          </TitleCell>
        )
      },
    }),
    // 数量列
    columnHelper.accessor('totalAmount', {
      header: 'Quantity',
      cell: ({ getValue, row }) => {
        const amount = getValue()
        const item = row.original.items[0]
        return (
          <TitleCell>
            <div className="font-medium text-gray-900">{amount}</div>
            <div className="text-gray-600 text-sm mt-1">x{item.quantity}</div>
          </TitleCell>
        )
      },
    }),
    // 状态列
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue()
        return (
          <span className={`inline-block px-2 py-1 text-xs rounded ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
          </span>
        )
      },
    }),
    // 支付方式列
    columnHelper.display({
      id: 'payment',
      header: 'Payment Method',
      cell: ({ row }) => (
        <TitleCell>
          <div className="font-medium text-gray-900">{row.original.paymentMethod}</div>
          <div className="text-gray-600 text-sm mt-1">{row.original.paymentAmount}</div>
        </TitleCell>
      ),
    }),
    // 地址列
    columnHelper.display({
      id: 'address',
      header: 'Address',
      cell: ({ row }) => {
        const { address } = row.original
        return (
          <TitleCell>
            <div className="font-medium text-gray-900">{address.location}</div>
            <div className="text-gray-600 text-sm mt-1">{address.restaurant}</div>
            <div className="text-gray-600 text-sm">{address.phone}</div>
          </TitleCell>
        )
      },
    }),
    // 描述列
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
    }),
    // 操作列
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <TitleCell>
          <div className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm mb-1">View Order</div>
          <div className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm mb-1">Edit Order</div>
          <div className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm">More</div>
        </TitleCell>
      ),
    }),
  ]

  const table = useReactTable({
    data: mockOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getRowId: row => row.id, // 使用订单 ID 作为行 ID
    state: {
      rowSelection,
    },
  })

  return (
    <div className="w-full overflow-x-auto bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="bg-gray-50 px-4 py-3 text-left font-semibold text-gray-700"
                  style={{ width: header.column.getSize() }}
                >
                  {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            const isSelected = row.getIsSelected()
            const orderRowClass = `bg-slate-50 transition-colors border border-gray-200 border-b-0 cursor-pointer ${isSelected ? 'bg-blue-50 border-blue-200' : ''
              }`
            const detailRowClass = `bg-white hover:bg-slate-50 transition-colors border border-gray-200 border-t-0 ${isSelected ? 'border-blue-200 hover:bg-blue-50' : ''
              }`

            return (
              <React.Fragment key={row.id}>
                {/* 每个订单组前的间隙 */}
                <tr>
                  <td colSpan={8} className="h-2 bg-white p-0 border-0" />
                </tr>

                {/* 订单行 */}
                <tr className={orderRowClass} onClick={row.getToggleSelectedHandler()}>
                  <td className="w-[48px] px-4 py-3 text-left border-0">
                    <CheckBox
                      checked={isSelected}
                      disabled={!row.getCanSelect()}
                      onChange={row.getToggleSelectedHandler()}
                      onClick={(e) => e.stopPropagation()} // 防止双重触发
                    />
                  </td>
                  <td colSpan={7} className="border-0">
                    <div className="px-4 py-3 flex justify-between items-center font-medium">
                      <span>Order No. {row.original.orderNo}</span>
                      <span>Order Time {row.original.orderTime}</span>
                    </div>
                  </td>
                </tr>

                {/* 详情行 */}
                <tr className={detailRowClass}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="border-0" style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>

      {/* 选中数量显示 */}
      <div className="mt-4 px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-700">
        已选中 <span className="font-medium text-blue-600">{Object.keys(rowSelection).length}</span> 项，
        共 <span className="font-medium">{mockOrders.length}</span> 项
      </div>
    </div>
  )
}