export interface GithubIssue {
  id: number;
  owner: string;
  repo: string;
  issue_number: number;
  title: string;
  author: string;
  author_id: string;
  state: string;
  date_created: Date;
  date_last_modified: Date;
  body: string;
}
type LogLevel = 'info' | 'debug' | 'error' | 'warn' | 'http' | 'verbose' | 'silly';
interface ParamEncoder {
    (value: any, defaultEncoder: (value: any) => any): any;
}
interface GenericFormData {
    append(name: string, value: any, options?: any): any;
}
interface SerializerVisitor {
    (this: GenericFormData, value: any, key: string | number, path: null | Array<string | number>, helpers: FormDataVisitorHelpers): boolean;
}
interface CustomParamsSerializer {
    (params: Record<string, any>, options?: ParamsSerializerOptions): string;
}
interface FormDataVisitorHelpers {
    defaultVisitor: SerializerVisitor;
    convertValue: (value: any) => any;
    isVisitable: (value: any) => boolean;
}
interface SerializerOptions {
    visitor?: SerializerVisitor;
    dots?: boolean;
    metaTokens?: boolean;
    indexes?: boolean | null;
}
interface ParamsSerializerOptions extends SerializerOptions {
    encode?: ParamEncoder;
    serialize?: CustomParamsSerializer;
}
export interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: D;
    request?: any;
}
interface Pagination {
    type: string;
    limit?: number;
    response_path?: string;
    limit_name_in_request: string;
}
interface CursorPagination extends Pagination {
    cursor_path_in_response: string;
    cursor_name_in_request: string;
}
interface LinkPagination extends Pagination {
    link_rel_in_response_header?: string;
    link_path_in_response_body?: string;
}
interface OffsetPagination extends Pagination {
    offset_name_in_request: string;
}
interface RetryHeaderConfig {
    at?: string;
    after?: string;
}
export interface ProxyConfiguration {
    endpoint: string;
    providerConfigKey?: string;
    connectionId?: string;
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'get' | 'post' | 'patch' | 'put' | 'delete';
    headers?: Record<string, string>;
    params?: string | Record<string, string | number>;
    paramsSerializer?: ParamsSerializerOptions;
    data?: unknown;
    retries?: number;
    baseUrlOverride?: string;
    paginate?: Partial<CursorPagination> | Partial<LinkPagination> | Partial<OffsetPagination>;
    retryHeader?: RetryHeaderConfig;
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
}
declare enum AuthModes {
    OAuth1 = "OAUTH1",
    OAuth2 = "OAUTH2",
    Basic = "BASIC",
    ApiKey = "API_KEY",
    AppStore = "APP_STORE",
    App = "APP",
    None = "NONE"
}
interface AppCredentials extends CredentialsCommon {
    type: AuthModes.App;
    access_token: string;
    expires_at?: Date | undefined;
    raw: Record<string, any>;
}
interface BasicApiCredentials extends CredentialsCommon {
    type: AuthModes.Basic;
    username: string;
    password: string;
}
interface ApiKeyCredentials extends CredentialsCommon {
    type: AuthModes.ApiKey;
    apiKey: string;
}
interface CredentialsCommon<T = Record<string, any>> {
    type: AuthModes;
    raw: T;
}
interface OAuth2Credentials extends CredentialsCommon {
    type: AuthModes.OAuth2;
    access_token: string;
    refresh_token?: string;
    expires_at?: Date | undefined;
}
interface OAuth1Credentials extends CredentialsCommon {
    type: AuthModes.OAuth1;
    oauth_token: string;
    oauth_token_secret: string;
}
type AuthCredentials = OAuth2Credentials | OAuth1Credentials | BasicApiCredentials | ApiKeyCredentials | AppCredentials;
interface Metadata {
    [key: string]: string | Record<string, any>;
}
interface Connection {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    provider_config_key: string;
    connection_id: string;
    connection_config: Record<string, string>;
    environment_id: number;
    metadata: Metadata | null;
    credentials_iv?: string | null;
    credentials_tag?: string | null;
    credentials: AuthCredentials;
}
export declare class ActionError extends Error {
    type: string;
    payload: unknown;
    constructor(payload?: unknown);
}
export interface NangoProps {
    host?: string;
    secretKey: string;
    accountId?: number;
    connectionId?: string;
    environmentId?: number;
    activityLogId?: number;
    providerConfigKey?: string;
    lastSyncDate?: Date;
    syncId?: string | undefined;
    nangoConnectionId?: number;
    syncJobId?: number | undefined;
    dryRun?: boolean;
    track_deletes?: boolean;
    attributes?: object | undefined;
    logMessages?: unknown[] | undefined;
    stubbedMetadata?: Metadata | undefined;
}
interface UserLogParameters {
    level?: LogLevel;
}
interface EnvironmentVariable {
    name: string;
    value: string;
}
export declare class NangoAction {
    private nango;
    private attributes;
    activityLogId?: number;
    syncId?: string;
    nangoConnectionId?: number;
    environmentId?: number;
    syncJobId?: number;
    dryRun?: boolean;
    connectionId?: string;
    providerConfigKey?: string;
    ActionError: typeof ActionError;
    constructor(config: NangoProps);
    proxy<T = any>(config: ProxyConfiguration): Promise<AxiosResponse<T>>;
    get<T = any>(config: ProxyConfiguration): Promise<AxiosResponse<T>>;
    post<T = any>(config: ProxyConfiguration): Promise<AxiosResponse<T>>;
    put<T = any>(config: ProxyConfiguration): Promise<AxiosResponse<T>>;
    patch<T = any>(config: ProxyConfiguration): Promise<AxiosResponse<T>>;
    delete<T = any>(config: ProxyConfiguration): Promise<AxiosResponse<T>>;
    getConnection(): Promise<Connection>;
    setMetadata(metadata: Record<string, any>): Promise<AxiosResponse<void>>;
    updateMetadata(metadata: Record<string, string>): Promise<AxiosResponse<void>>;
    setFieldMapping(fieldMapping: Record<string, string>): Promise<AxiosResponse<void>>;
    getMetadata<T = Metadata>(): Promise<T>;
    getFieldMapping(): Promise<Metadata>;
    log(content: string, userDefinedLevel?: UserLogParameters): Promise<void>;
    getEnvironmentVariables(): Promise<EnvironmentVariable[] | null>;
    getFlowAttributes<A = object>(): A | null;
    paginate<T = any>(config: ProxyConfiguration): AsyncGenerator<T[], undefined, void>;
    triggerAction(providerConfigKey: string, connectionId: string, actionName: string, input?: unknown): Promise<object>;
}
export declare class NangoSync extends NangoAction {
    lastSyncDate?: Date;
    track_deletes: boolean;
    logMessages?: unknown[] | undefined;
    stubbedMetadata?: Metadata | undefined;
    constructor(config: NangoProps);
    /**
     * Set Sync Last Sync Date
     * @desc permanently set the last sync date for the sync
     * to be used for the next sync run
     */
    setLastSyncDate(date: Date): Promise<boolean>;
    /**
     * Deprecated, please use batchSave
     */
    batchSend<T = any>(results: T[], model: string): Promise<boolean | null>;
    batchSave<T = any>(results: T[], model: string): Promise<boolean | null>;
    batchDelete<T = any>(results: T[], model: string): Promise<boolean | null>;
    batchUpdate<T = any>(results: T[], model: string): Promise<boolean | null>;
    getMetadata<T = Metadata>(): Promise<T>;
}
export {};
export const NangoFlows = [
  {
    "providerConfigKey": "demo-github-integration",
    "syncs": [
      {
        "name": "github-issue-example",
        "runs": "every half hour",
        "track_deletes": false,
        "type": "sync",
        "auto_start": true,
        "attributes": {},
        "returns": [
          "GithubIssue"
        ],
        "models": [
          {
            "name": "GithubIssue",
            "fields": [
              {
                "name": "id",
                "type": "integer"
              },
              {
                "name": "owner",
                "type": "string"
              },
              {
                "name": "repo",
                "type": "string"
              },
              {
                "name": "issue_number",
                "type": "number"
              },
              {
                "name": "title",
                "type": "string"
              },
              {
                "name": "author",
                "type": "string"
              },
              {
                "name": "author_id",
                "type": "string"
              },
              {
                "name": "state",
                "type": "string"
              },
              {
                "name": "date_created",
                "type": "date"
              },
              {
                "name": "date_last_modified",
                "type": "date"
              },
              {
                "name": "body",
                "type": "string"
              }
            ]
          }
        ],
        "description": "Fetches the Github issues from all a user's repositories.\nDetails: full sync, doesn't track deletes, metadata is not required.\n",
        "scopes": [
          "public_repo"
        ],
        "endpoints": []
      }
    ],
    "actions": []
  }
] as const; 
