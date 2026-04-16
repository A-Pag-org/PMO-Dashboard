// FILE: app/dashboard/upload/UploadContent.tsx
// PURPOSE: Interactive upload page — filters, download/upload buttons, editable table
// DESIGN REF: Wireframe pages 11–12 (Manual Data Upload + Excel Template)

'use client';

import { useState, useMemo, useRef } from 'react';
import { Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import FilterPill from '@/components/ui/FilterPill';
import EditableDataTable from '@/components/ui/EditableDataTable';
import ExcelTemplatePreview from '@/components/ui/ExcelTemplatePreview';
import {
  UPLOAD_INITIATIVE_OPTIONS,
  UPLOAD_STATE_OPTIONS,
  UPLOAD_CITY_OPTIONS_BY_STATE,
  MOCK_UPLOAD_ROWS,
} from '@/lib/constants';
import type { UploadRow } from '@/lib/types';

type UploadStatus = 'idle' | 'success' | 'error';

export default function UploadContent() {
  const [initiative, setInitiative] = useState<string>(UPLOAD_INITIATIVE_OPTIONS[4]);
  const [state, setState] = useState<string>('Uttar Pradesh');
  const [city, setCity] = useState<string>('All');
  const [rows, setRows] = useState<UploadRow[]>(MOCK_UPLOAD_ROWS);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  const initiativeOptions = [...UPLOAD_INITIATIVE_OPTIONS];
  const stateOptions = ['All', ...UPLOAD_STATE_OPTIONS];

  const cityOptions = useMemo(() => {
    if (state === 'All') {
      return ['All', ...Object.values(UPLOAD_CITY_OPTIONS_BY_STATE).flat()];
    }
    const cities = UPLOAD_CITY_OPTIONS_BY_STATE[state] ?? [];
    return ['All', ...cities];
  }, [state]);

  const filteredRows = useMemo(() => {
    let filtered = rows;
    if (city !== 'All') {
      filtered = filtered.filter((r) => r.geography === city);
    } else if (state !== 'All') {
      const stateCities = UPLOAD_CITY_OPTIONS_BY_STATE[state] ?? [];
      filtered = filtered.filter((r) => stateCities.includes(r.geography));
    }
    return filtered;
  }, [rows, state, city]);

  function handleStateChange(v: string) {
    setState(v);
    setCity('All');
  }

  function handleNewValChange(filteredIndex: number, value: string) {
    const targetRow = filteredRows[filteredIndex];
    setRows((prev) =>
      prev.map((r) =>
        r.geography === targetRow.geography && r.metric === targetRow.metric
          ? { ...r, newVal: value }
          : r,
      ),
    );
  }

  function handleDownload() {
    const headers = [
      'Geography', 'Metric', 'Metric Type', 'Target Val', 'Current Val',
      'Unit', 'New Val', 'Last Updated', 'Last Updated By',
      'Start Date', 'End Date', 'Remarks',
    ];
    const csvRows = filteredRows.map((r) => [
      r.geography, r.metric, r.metricType,
      r.targetVal ?? '', r.currentVal ?? '', r.unit,
      r.newVal, r.lastUpdated, r.lastUpdatedBy,
      r.startDate, r.endDate, r.remarks,
    ]);
    const csv = [headers, ...csvRows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upload-template-${initiative.replace(/\s+/g, '-').toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleUploadClick() {
    fileRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      setUploadStatus('error');
      return;
    }

    // TODO: replace with real upload + validation
    setUploadStatus('success');
    setTimeout(() => setUploadStatus('idle'), 4000);
    e.target.value = '';
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* ── FILTER BAR + ACTIONS ── */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 bg-[var(--color-navy-mid)] px-4 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <FilterPill
            label="Initiative"
            options={initiativeOptions}
            value={initiative}
            onChange={setInitiative}
          />
          <FilterPill
            label="State"
            options={stateOptions as unknown as string[]}
            value={state}
            onChange={handleStateChange}
          />
          <FilterPill
            label="City"
            options={cityOptions}
            value={city}
            onChange={setCity}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex min-h-[40px] items-center gap-2 rounded-md bg-[var(--color-success)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            <span>Download template</span>
          </button>
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex min-h-[40px] items-center gap-2 rounded-md bg-[var(--color-success)] px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          >
            <Upload className="h-4 w-4" />
            <span>Upload updated data</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload data file"
          />
        </div>
      </div>

      {/* Upload status message */}
      {uploadStatus !== 'idle' && (
        <div
          className={
            uploadStatus === 'success'
              ? 'flex items-center gap-2 bg-[var(--color-success-light)] px-4 py-2 text-xs font-medium text-[var(--color-success)]'
              : 'flex items-center gap-2 bg-[var(--color-danger-light)] px-4 py-2 text-xs font-medium text-[var(--color-danger)]'
          }
        >
          {uploadStatus === 'success' ? (
            <>
              <CheckCircle className="h-4 w-4" />
              File uploaded successfully. Data will be validated and updated.
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4" />
              Invalid file format. Please upload a .csv or .xlsx file.
            </>
          )}
        </div>
      )}

      {/* ── EDITABLE DATA TABLE ── */}
      <div className="flex-1 overflow-auto p-4">
        {filteredRows.length > 0 ? (
          <EditableDataTable rows={filteredRows} onNewValChange={handleNewValChange} />
        ) : (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-[var(--color-border-table)]">
            <p className="text-sm text-[var(--color-text-muted)]">
              No data available for this filter combination
            </p>
          </div>
        )}

        <p className="mt-3 text-[var(--color-text-muted)]" style={{ fontSize: 10 }}>
          Data will only be input for the lowest level, and then aggregated to the
          nearest upper level; the UI will only show the rows relevant to the user.
        </p>
      </div>

      {/* ── EXCEL TEMPLATE PREVIEW ── */}
      <div className="shrink-0 border-t border-[var(--color-divider-dashed)] p-4">
        <ExcelTemplatePreview />
      </div>
    </div>
  );
}
