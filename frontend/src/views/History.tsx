import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { fetchHistory } from '../services/api';
import { IHistoryLog, ChangeType, IHistoryFilters } from '../types/History.types';

function History() {
  const [historyLogs, setHistoryLogs] = useState<IHistoryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<IHistoryFilters>({
    changeTypes: [],
  });
  const [sortOrder, setSortOrder] = useState<'oldest' | 'newest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showFilterDropdown && !target.closest('.filter-dropdown-container')) {
        setShowFilterDropdown(false);
      }
    };

    if (showFilterDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await fetchHistory();
      setHistoryLogs(data);
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (changeType: ChangeType) => {
    setAppliedFilters((prev) => {
      const isSelected = prev.changeTypes.includes(changeType);
      let newChangeTypes: ChangeType[];
      if (isSelected) {
        newChangeTypes = prev.changeTypes.filter((type) => type !== changeType);
      } else {
        newChangeTypes = [...prev.changeTypes, changeType];
      }
      return {
        ...prev,
        changeTypes: newChangeTypes,
      };
    });
    setCurrentPage(1);
  };

  const filteredAndSortedLogs = useMemo(() => {
    let filtered = [...historyLogs];

    if (appliedFilters.changeTypes.length > 0) {
      filtered = filtered.filter((log) =>
        appliedFilters.changeTypes.includes(log.changeType)
      );
    }

    // Sort by timestamp only
    filtered.sort((a, b) => {
      const aTime = new Date(a.timestamp).getTime();
      const bTime = new Date(b.timestamp).getTime();
      
      if (sortOrder === 'oldest') {
        return aTime - bTime; // Oldest first
      } else {
        return bTime - aTime; // Newest first
      }
    });

    return filtered;
  }, [historyLogs, appliedFilters, sortOrder]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedLogs, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedLogs.length / itemsPerPage);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading history logs...</div>;
  }

  return (
    <div className="history-section">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">History Logs</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <Select value={sortOrder} onValueChange={(value: 'oldest' | 'newest') => setSortOrder(value)}>
            {/* @ts-expect-error - SelectTrigger accepts children via forwardRef props spread */}
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            {/* @ts-expect-error - SelectContent accepts children via forwardRef props spread */}
            <SelectContent>
              {/* @ts-expect-error - SelectItem accepts children via forwardRef props spread */}
              <SelectItem value="newest">Newest to Oldest</SelectItem>
              {/* @ts-expect-error - SelectItem accepts children via forwardRef props spread */}
              <SelectItem value="oldest">Oldest to Newest</SelectItem>
            </SelectContent>
          </Select>
          
          <label className="text-sm text-gray-600">Filter by:</label>
          <div className="relative filter-dropdown-container">
            {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
            <Button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              variant="outline"
              className="w-[180px] justify-between"
            >
              <span>
                {appliedFilters.changeTypes.length > 0
                  ? `${appliedFilters.changeTypes.length} selected`
                  : 'All Change Types'}
              </span>
              <svg
                className="h-4 w-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
                <div className="space-y-1">
                  {Object.values(ChangeType).map((type) => {
                    const isSelected = appliedFilters.changeTypes.includes(type);
                    return (
                      <div
                        key={type}
                        onClick={() => handleFilterChange(type)}
                        className="relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 hover:bg-gray-50 cursor-pointer"
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          {isSelected && (
                            <svg
                              className="h-4 w-4 text-gray-900"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="text-sm text-gray-700 capitalize">
                          {type}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {appliedFilters.changeTypes.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAppliedFilters({ changeTypes: [] });
                        setCurrentPage(1);
                        setShowFilterDropdown(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs py-1 px-2 h-auto"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-black">
              <TableHead className="bg-black text-white hover:bg-black">
                Timestamp
              </TableHead>
              <TableHead className="bg-black text-white hover:bg-black">
                Project Name
              </TableHead>
              <TableHead className="bg-black text-white hover:bg-black">
                Resource Name
              </TableHead>
              <TableHead className="bg-black text-white hover:bg-black">
                Change Type
              </TableHead>
              <TableHead className="bg-black text-white hover:bg-black">
                Previous Value
              </TableHead>
              <TableHead className="bg-black text-white hover:bg-black">
                New Value
              </TableHead>
              <TableHead className="bg-black text-white hover:bg-black">
                Changed By
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No history logs found
                </TableCell>
              </TableRow>
            ) : (
              paginatedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                  <TableCell>{log.projectName}</TableCell>
                  <TableCell>{log.resourceName}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800 capitalize">
                      {log.changeType}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">{log.previousValue || 'N/A'}</TableCell>
                  <TableCell className="text-gray-900 font-medium">{log.newValue || 'N/A'}</TableCell>
                  <TableCell>{log.changedBy}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedLogs.length)} of{' '}
            {filteredAndSortedLogs.length} entries
          </div>
          <div className="flex gap-2">
            {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  if (totalPages <= 7) return true;
                  if (page === 1 || page === totalPages) return true;
                  if (Math.abs(page - currentPage) <= 1) return true;
                  return false;
                })
                .map((page, index, array) => {
                  const showEllipsis = index > 0 && page - array[index - 1] > 1;
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
                      <Button
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        className={
                          currentPage === page
                            ? 'bg-black text-white hover:bg-black hover:text-white'
                            : ''
                        }
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  );
                })}
            </div>
            {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;