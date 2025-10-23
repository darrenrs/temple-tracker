'use client'

import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from "next/link"

import { type VisitWithTemple } from '@/app/types/VisitWithTemple';

export default function VisitList({ data }: { data: VisitWithTemple[] }) {
  const columnHelper = React.useMemo(() => createColumnHelper<VisitWithTemple>(), [])
  const columns = React.useMemo(
    () => [
      columnHelper.display({
        id: 'sessionDate',
        header: () => 'Date',
        cell: ({ row }) => {
          const t = row.original
          const url = `visits/${t.id}`

          return (
            <Link href={url}>
              {t.sessionDate.toLocaleString()}
            </Link>
          )
        }
      }),
      columnHelper.accessor('temple', {
        header: 'Temple',
        cell: info => info.getValue().name
      }),
      columnHelper.accessor('userNote', {
        header: 'User Notes',
        cell: info => info.getValue()
      })
    ],
    [columnHelper],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="min-w-full border-collapse text-xs sm:text-sm">
      <thead>
        {table.getHeaderGroups().map(hg => (
          <tr key={hg.id}>
            {hg.headers.map(h => (
              <th key={h.id} className="text-left p-2 border-b">
                {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="p-2 border-b">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}