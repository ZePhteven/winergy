import { AxiosInstance } from "axios";

import { apiHttp } from "@app/utils/api.http";

/**
 * Represents a basic service
 */
export abstract class BaseService {
  /**
   * Axios' instance, to process HTTP calls
   */
  protected readonly _http: AxiosInstance;

  /**
   * Base path, for the service's routes
   */
  protected readonly _resource: string;

  /**
   * Initialize a new instance of class BaseService
   * @param resource Base path, for routes
   */
  protected constructor(resource: string) {
    this._resource = `/${resource}`;
    this._http = apiHttp;
  }
}
