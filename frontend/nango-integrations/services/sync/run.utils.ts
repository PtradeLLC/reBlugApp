// Run utilities for sync operations
export interface RunnerFlags {
  dryRun?: boolean;
  fullResync?: boolean;
  debug?: boolean;
  force?: boolean;
  metadata?: Record<string, any>;
  syncId?: string;
  connectionId?: string;
  providerConfigKey?: string;
}
