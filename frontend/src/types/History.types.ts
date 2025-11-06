export interface IHistoryLog {
  id: number;
  timestamp: string;
  projectName: string;
  resourceName: string;
  changeType: ChangeType;
  previousValue: string;
  newValue: string;
  changedBy: string;
}

export enum ChangeType {
  DATE_CHANGE = 'date change',
  PROJECT_CHANGE = 'project change',
  RESOURCE_CHANGE = 'resource change',
  SOW_CHANGE = 'SOW change',
  ALLOCATION_PERCENT_CHANGE = 'allocation % change',
}

export type SortColumn = 'timestamp' | 'projectName' | 'resourceName' | 'changeType' | 'previousValue' | 'newValue' | 'changedBy';
export type SortDirection = 'asc' | 'desc';

export interface IHistoryFilters {
  changeTypes: ChangeType[];
}

