import { BaseFilter } from "@app/models/shared/entities";
import { Bottle } from "@app/models/bottles";
import { SearchService } from "./shared";

export class BottlesService extends SearchService<BaseFilter, Bottle> {
  /**
   * Singleton instance of the service
   */
  private static _instance: BottlesService;

  protected constructor() {
    super("bottles");
  }

  /**
   * Provides access to the service's singleton instance
   * @returns Singleton instance
   */
  public static getInstance() {
    return (this._instance ??= new this());
  }
}
