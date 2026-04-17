// FILE: app/dashboard/detail/DetailContent.tsx
// PURPOSE: Interactive detail view — cascading filters, map+metrics, tables
// DESIGN REF: Wireframe pages 9–10 (Detailed View 1/2 + 2/2)

'use client';

import { useState, useMemo } from 'react';
import {
  Truck,
  Calendar,
  ClipboardList,
  Store,
  FileText,
  Landmark,
} from 'lucide-react';
import FilterPill from '@/components/ui/FilterPill';
import ViewToggle from '@/components/ui/ViewToggle';
import DelhiNCRMap from '@/components/maps/DelhiNCRMap';
import MetricCard from '@/components/ui/MetricCard';
import ProgressMetricRow from '@/components/ui/ProgressMetricRow';
import AverageOval from '@/components/ui/AverageOval';
import DataTable from '@/components/ui/DataTable';
import BottomBar from '@/components/layout/BottomBar';
import {
  STATES,
  CITIES,
  CITY_STATE_MAP,
  RTO_OPTIONS_BY_CITY,
  MOCK_DETAIL_MAP_DATA,
  MOCK_DETAIL_CENTER_BUBBLE,
  MOCK_DETAIL_TABLE_ALL,
  MOCK_SUMMARY_BY_INITIATIVE,
  UPLOAD_CITY_OPTIONS_BY_STATE,
} from '@/lib/constants';
import type { Initiative, ViewLevel } from '@/lib/types';

const VIEW_LEVELS = ['State', 'City', 'RTO'] as const;

interface DetailContentProps {
  initiatives: Initiative[];
}

export default function DetailContent({ initiatives }: DetailContentProps) {
  const [selectedInitiative, setSelectedInitiative] = useState(initiatives[0].name);
  const [stateFilter, setStateFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [rtoFilter, setRtoFilter] = useState('All');
  const [viewLevel, setViewLevel] = useState<ViewLevel>('state');

  const currentInit = initiatives.find((i) => i.name === selectedInitiative) ?? initiatives[0];
  const summaryData = MOCK_SUMMARY_BY_INITIATIVE[currentInit.slug];

  const initiativeNames = initiatives.map((i) => i.name);
  const viewLabel: (typeof VIEW_LEVELS)[number] =
    viewLevel === 'state' ? 'State' : viewLevel === 'city' ? 'City' : 'RTO';

  // Wireframe note: available views adapt to selected geography.
  const availableViewLevels = useMemo<readonly (typeof VIEW_LEVELS)[number][]>(() => {
    if (cityFilter !== 'All') return ['RTO'];
    if (stateFilter !== 'All') return ['City', 'RTO'];
    return VIEW_LEVELS;
  }, [stateFilter, cityFilter]);
  const effectiveViewLabel =
    availableViewLevels.includes(viewLabel) ? viewLabel : availableViewLevels[0];
  const effectiveViewLevel = effectiveViewLabel.toLowerCase() as ViewLevel;

  // Cascading filter options
  const stateOptions = ['All', ...STATES];

  const cityOptions = useMemo(() => {
    if (stateFilter === 'All') return ['All', ...CITIES];
    const cities = UPLOAD_CITY_OPTIONS_BY_STATE[stateFilter] ?? [];
    return ['All', ...cities];
  }, [stateFilter]);

  const rtoOptions = useMemo(() => {
    if (cityFilter === 'All') {
      const allRtos = Object.values(RTO_OPTIONS_BY_CITY).flat();
      return ['All', ...allRtos];
    }
    const rtos = RTO_OPTIONS_BY_CITY[cityFilter] ?? [];
    return ['All', ...rtos];
  }, [cityFilter]);

  // Reset child filters when parent changes
  function handleStateChange(v: string) {
    setStateFilter(v);
    setCityFilter('All');
    setRtoFilter('All');
  }

  function handleCityChange(v: string) {
    setCityFilter(v);
    setRtoFilter('All');
  }

  // Filter map data based on selections
  const filteredMapData = useMemo(() => {
    let data = MOCK_DETAIL_MAP_DATA;
    if (stateFilter !== 'All') {
      data = data.filter((d) => CITY_STATE_MAP[d.name] === stateFilter);
    }
    if (cityFilter !== 'All') {
      data = data.filter((d) => d.name === cityFilter);
    }
    return data;
  }, [stateFilter, cityFilter]);

  // Filter table data at city granularity
  const filteredCityRows = useMemo(() => {
    let rows = MOCK_DETAIL_TABLE_ALL;
    if (stateFilter !== 'All') {
      rows = rows.filter((r) => CITY_STATE_MAP[r.geography] === stateFilter);
    }
    if (cityFilter !== 'All') {
      rows = rows.filter((r) => r.geography === cityFilter);
    }
    return rows.map((r) => ({
      label: r.geography,
      target: r.target,
      achieved: r.achieved,
      completion: r.completion,
    }));
  }, [stateFilter, cityFilter]);

  // State table rows (for state view)
  const stateTableRows = useMemo(
    () =>
      (summaryData?.table ?? [])
        .filter((r) => stateFilter === 'All' || r.state === stateFilter)
        .map((r) => ({
          label: r.state,
          target: r.target,
          achieved: r.achieved,
          completion: r.completion,
        })),
    [summaryData, stateFilter],
  );

  // RTO rows are derived from city totals for demo behavior.
  const rtoTableRows = useMemo(() => {
    const cityBaseRows = MOCK_DETAIL_TABLE_ALL.filter((r) => {
      if (stateFilter !== 'All' && CITY_STATE_MAP[r.geography] !== stateFilter) return false;
      if (cityFilter !== 'All' && r.geography !== cityFilter) return false;
      return true;
    });

    const rows = cityBaseRows.flatMap((cityRow) => {
      const rtos = RTO_OPTIONS_BY_CITY[cityRow.geography] ?? [`${cityRow.geography} RTO`];
      const perTarget = Math.floor(cityRow.target / rtos.length);
      const perAchieved = Math.floor(cityRow.achieved / rtos.length);

      return rtos.map((rtoName, idx) => {
        const last = idx === rtos.length - 1;
        const target = last
          ? cityRow.target - perTarget * (rtos.length - 1)
          : perTarget;
        const achieved = last
          ? cityRow.achieved - perAchieved * (rtos.length - 1)
          : perAchieved;
        const completion = target > 0 ? Math.round((achieved / target) * 100) : 0;
        return {
          label: rtoName,
          target,
          achieved,
          completion,
        };
      });
    });

    if (rtoFilter === 'All') return rows;
    return rows.filter((r) => r.label === rtoFilter);
  }, [stateFilter, cityFilter, rtoFilter]);

  const displayedTableRows =
    effectiveViewLevel === 'state'
      ? stateTableRows
      : effectiveViewLevel === 'city'
        ? filteredCityRows
        : rtoTableRows;

  const displayedMapData =
    effectiveViewLevel === 'state'
      ? summaryData?.map ?? []
      : filteredMapData;

  const outcomeMetrics = currentInit.metrics.filter((m) => m.type === 'outcome');
  const progressMetrics = currentInit.metrics.filter((m) => m.type === 'progress');

  const delhiNcrAvg = summaryData
    ? Math.round(summaryData.table.reduce((s, r) => s + r.completion, 0) / summaryData.table.length)
    : 0;

  const stateAvg = useMemo(() => {
    if (stateFilter === 'All') return delhiNcrAvg;
    const stateRow = summaryData?.table.find((r) => r.state === stateFilter);
    return stateRow?.completion ?? 0;
  }, [stateFilter, summaryData, delhiNcrAvg]);

  const cityAvg = useMemo(() => {
    if (cityFilter === 'All') return stateAvg;
    const cityRow = MOCK_DETAIL_TABLE_ALL.find((r) => r.geography === cityFilter);
    return cityRow?.completion ?? 0;
  }, [cityFilter, stateAvg]);

  const filteredGeoCompletion = useMemo(() => {
    if (displayedTableRows.length === 0) return 0;
    const total = displayedTableRows.reduce((acc, row) => acc + row.completion, 0);
    return Math.round(total / displayedTableRows.length);
  }, [displayedTableRows]);

  function handleViewLevelChange(v: string) {
    setViewLevel(v.toLowerCase() as ViewLevel);
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      {/* ── FILTER BAR ── */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 bg-[var(--color-navy-mid)] px-4 py-2">
        <FilterPill
          label="State"
          options={stateOptions as unknown as string[]}
          value={stateFilter}
          onChange={handleStateChange}
        />
        <FilterPill
          label="City"
          options={cityOptions as unknown as string[]}
          value={cityFilter}
          onChange={handleCityChange}
        />
        <FilterPill
          label="RTO"
          options={rtoOptions}
          value={rtoFilter}
          onChange={setRtoFilter}
        />
        <div className="mx-2 h-6 w-px bg-white/20" />
        <FilterPill
          label="Initiative"
          options={initiativeNames}
          value={selectedInitiative}
          onChange={setSelectedInitiative}
        />
      </div>

      {/* ── TOP HALF — Map + Metrics ── */}
      <div className="flex min-h-0 flex-1 border-b border-[var(--color-divider-dashed)]">
        {/* Left column — Map */}
        <div className="flex w-1/2 flex-col border-r border-[var(--color-divider-dashed)]">
          <div className="shrink-0 bg-[var(--color-navy)] px-4 py-2">
            <h2 className="text-xs font-semibold text-[var(--color-text-white)]">
              {currentInit.primaryMetric}
            </h2>
          </div>
          <div className="shrink-0 px-4 py-2">
            <ViewToggle options={availableViewLevels} value={effectiveViewLabel} onChange={handleViewLevelChange} />
          </div>
          <div className="px-4 pb-1">
            <span className="inline-flex rounded-full bg-[var(--color-surface-light)] px-3 py-1 text-[10px] font-semibold text-[var(--color-text-secondary)]">
              % completion of filtered geo: {filteredGeoCompletion}%
            </span>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center px-3">
            <div className="h-full w-full max-h-[560px] max-w-[720px]">
              <DelhiNCRMap
                data={displayedMapData}
                centerBubble={summaryData?.center ?? MOCK_DETAIL_CENTER_BUBBLE}
              />
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-2 px-4 py-1.5">
            <AverageOval label="Delhi-NCR avg" value={`${delhiNcrAvg}%`} />
            <AverageOval
              label="State avg"
              value={`${stateAvg}%`}
              visible={effectiveViewLevel === 'city' || effectiveViewLevel === 'rto'}
            />
            <AverageOval
              label="City avg"
              value={`${cityAvg}%`}
              visible={effectiveViewLevel === 'rto'}
            />
          </div>
        </div>

        {/* Right column — Metrics */}
        <div className="flex w-1/2 flex-col overflow-y-auto">
          <div className="shrink-0 bg-[var(--color-navy)] px-4 py-2">
            <h3 className="text-xs font-semibold text-[var(--color-text-white)]">
              Outcome metrics
            </h3>
          </div>
          <div className="space-y-2 p-3">
            {outcomeMetrics.length > 0 ? (
              outcomeMetrics.map((m, i) => (
                <MetricCard
                  key={m.name}
                  icon={i === 0 ? Truck : Calendar}
                  label={m.name}
                  achieved={m.achieved}
                  target={m.target}
                />
              ))
            ) : (
              <p className="py-4 text-center text-xs text-[var(--color-text-muted)]">
                No outcome metrics for this initiative
              </p>
            )}
          </div>

          {progressMetrics.length > 0 && (
            <>
              <div className="shrink-0 bg-[var(--color-navy)] px-4 py-2">
                <h3 className="text-xs font-semibold text-[var(--color-text-white)]">
                  Progress metrics
                </h3>
              </div>
              <div className="space-y-2 p-3">
                {progressMetrics.map((m, i) => {
                  const icons = [ClipboardList, Store, FileText, Landmark];
                  return (
                    <ProgressMetricRow
                      key={m.name}
                      icon={icons[i % icons.length]}
                      label={m.name}
                      achieved={m.achieved}
                      target={m.target}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── BOTTOM HALF — Dual Data Tables ── */}
      <div className="shrink-0 px-4 py-3">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DataTable
            title={outcomeMetrics[0]?.name ?? currentInit.primaryMetric}
            geographyLabel={
              effectiveViewLevel === 'state'
                ? 'State'
                : effectiveViewLevel === 'city'
                  ? 'City'
                  : 'RTO'
            }
            rows={displayedTableRows}
          />
          {outcomeMetrics.length > 1 ? (
            <DataTable
              title={outcomeMetrics[1].name}
              geographyLabel={
                effectiveViewLevel === 'state'
                  ? 'State'
                  : effectiveViewLevel === 'city'
                    ? 'City'
                    : 'RTO'
              }
              rows={displayedTableRows}
            />
          ) : (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-[var(--color-border-table)] p-6">
              <p className="text-xs text-[var(--color-text-muted)]">
                All other metrics on right side &raquo;
              </p>
            </div>
          )}
        </div>
        <p className="mt-2 text-center text-[var(--color-text-muted)]" style={{ fontSize: '10px' }}>
          The Y-axis of the table will change according to the view selected above;
          only metrics applicable to the selected view will be shown.
        </p>
      </div>

      <BottomBar showDetailedView={false} showAllDataView showManualData />
    </div>
  );
}
