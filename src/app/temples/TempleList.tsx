'use client'

import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from "next/link"

import { type TempleWithTempleStatus } from '@/app/types/TempleWithTempleStatus';

export default function TempleList({ data }: { data: TempleWithTempleStatus[] }) {
  const columnHelper = React.useMemo(() => createColumnHelper<TempleWithTempleStatus>(), [])
  const columns = React.useMemo(
    () => [
      columnHelper.display({
        id: 'name',
        header: () => 'Name',
        cell: ({ row }) => {
          const t = row.original
          const url = `temples/${t.slug}`

          return (
            <Link href={url}>
              {t.name}
            </Link>
          )
        }
      }),
      columnHelper.display({
        id: 'location',
        header: () => 'Location',
        cell: ({ row }) => {
          const t = row.original
          const hasCoords =
            typeof t.latitude === 'number' &&
            !Number.isNaN(t.latitude) &&
            typeof t.longitude === 'number' &&
            !Number.isNaN(t.longitude)

          const label = `${t.city ?? ''}${t.state ? `, ${t.state}` : ''}${t.country ? `, ${t.country}` : ''}`.replace(/^, |, ,/g, '').trim()

          if (!hasCoords) return label || '—'

          const url = `https://www.google.com/maps/place/${t.latitude},${t.longitude}`
          return (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline underline-offset-2">
              {label || `${t.latitude}, ${t.longitude}`}
            </a>
          )
        }
      }),
      columnHelper.accessor('dateDedicated', {
        header: 'Date Dedicated',
        cell: info => {
          const v = info.getValue()
          if (!v) return '—'
          const d = typeof v === 'string' ? new Date(v) : v
          return isNaN(d.getTime()) ? '—' : d.toLocaleDateString()
        }
      }),
      columnHelper.accessor('templeStatus', {
        header: 'Status',
        cell: info => info.getValue()?.name ?? 'Unknown'
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