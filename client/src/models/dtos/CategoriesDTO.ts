import { BaseDTO } from "./BaseDTO";

export class CategoriesDTO extends BaseDTO {
  constructor(public name: string, public description?: string) {
    super();
  }
}
