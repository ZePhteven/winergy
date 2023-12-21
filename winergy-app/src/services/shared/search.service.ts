import { GenericAbortSignal } from "axios";

import {
  BASE_SEARCH_REQUEST,
  CreateDto,
  SearchRequest,
  SearchResponse,
} from "@app/models/shared/api";
import { BaseEntity } from "@app/models/shared/entities";

import { BaseService } from "./base.service";

/**
 * Represents a service with basic methods for entity search
 */
export abstract class SearchService<
  TFilter,
  TEntity extends BaseEntity
> extends BaseService {
  /**
   * Create the entity
   * @param entity Entity to create
   * @returns Newly created entity
   */
  public create(entity: CreateDto<TEntity>): Promise<TEntity> {
    const response = this._http
      .post<TEntity>(this._resource, entity)
      .then((x) => x.data)
      .catch(() => {
        return {} as TEntity;
      });

    return response;
  }

  /**
   * Search for entities
   * @param request Request containing the search criteria
   * @returns The entities corresponding to the criteria
   */
  public search(
    request?: Partial<SearchRequest<TFilter>>,
    signal?: GenericAbortSignal
  ): Promise<SearchResponse<TEntity>> {
    const response = this._http
      .post<SearchResponse<TEntity>>(
        `${this._resource}/search`,
        {
          ...BASE_SEARCH_REQUEST,
          ...request,
        },
        { signal }
      )
      .then((x) => x.data);

    return response;
  }

  /**
   * Get an entity
   * @param id Entity's Id
   * @returns The entity correponding to the given Id
   */
  public get(id: number): Promise<TEntity> {
    const response = this._http
      .get<TEntity>(`${this._resource}/${id}`)
      .then((x) => {
        return x.data;
      });

    return response;
  }

  /**
   * Update an entity
   * @param id Entity's ID
   * @param entity Entity to update
   * @returns Updated entity
   */
  public update(id: number, entity: TEntity): Promise<TEntity> {
    const response = this._http
      .put<number>(`${this._resource}/${id}`, entity)
      .then(() => {
        return { id } as TEntity;
      })
      .catch(() => {
        return {} as TEntity;
      });

    return response;
  }

  /**
   * Remove the entity
   * @param id Entity's Id
   */
  public async remove(id: number) {
    await this._http.delete<void>(`${this._resource}/${id}`);
  }
}
