// Sync model definition
export interface SyncConfig {
  id?: string;
  name: string;
  provider_config_key: string;
  connection_id: string;
  enabled: boolean;
  frequency?: number;
  last_sync?: Date;
  next_sync?: Date;
  metadata?: Record<string, any>;
  sync_type?: string;
  sync_mode?: "full" | "incremental";
  sync_status?: "pending" | "running" | "completed" | "failed";
  error_message?: string;
}
