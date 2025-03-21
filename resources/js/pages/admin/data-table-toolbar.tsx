'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { isActive, labs } from './filters';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {table.getColumn('laboratory_name') && (
                    <DataTableFacetedFilter column={table.getColumn('laboratory_name')} title="Labs" options={labs} />
                )}
                {table.getColumn('is_active') && <DataTableFacetedFilter column={table.getColumn('is_active')} title="Active" options={isActive} />}
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <X />
                    </Button>
                )}
            </div>
        </div>
    );
}
