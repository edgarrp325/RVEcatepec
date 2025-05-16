'use client';

import { Table } from '@tanstack/react-table';
import { Download, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { exportTableToCSV } from '@/lib/export';
import { FilterOption } from '@/types';
import { Input } from '../ui/input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    filters?: { columnKey: string; title: string; options: FilterOption[] }[];
    filename?: string;
    hideExportButton?: boolean;
}

export function DataTableToolbar<TData>({
    table,
    globalFilter,
    setGlobalFilter,
    filters = [],
    filename,
    hideExportButton = false,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {/* 🔍 Global filter field */}
                <Input
                    id="search"
                    placeholder="Buscar..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-sm"
                />

                {/*  🎛  Dinamic render of filters*/}
                {filters.map(({ columnKey, title, options }) =>
                    table.getColumn(columnKey) ? (
                        <DataTableFacetedFilter key={columnKey} column={table.getColumn(columnKey)} title={title} options={options} />
                    ) : null,
                )}

                {/* ❌ Clean filters */}
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reiniciar
                        <X />
                    </Button>
                )}
            </div>
            {!hideExportButton && (
                <div>
                    <Button
                        variant={'outline'}
                        size="sm"
                        onClick={() => exportTableToCSV(table, { filename: filename, excludeColumns: ['is_active', 'actions'] })}
                    >
                        <Download /> Exportar
                    </Button>
                </div>
            )}
        </div>
    );
}
