export enum DataSource {
  ETFS_BRASIL = "ETFS_BRASIL",
  STOCKS_BRASIL = "STOCKS_BRASIL",
}

export interface ScrapeRequest {
  source: DataSource;
}
