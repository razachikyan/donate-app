import { BaseDTO } from "./BaseDTO";

export class ItemDTO extends BaseDTO {
  constructor(
    public title: string,
    public description: string,
    public address: string,
    public category: string,
    public condition: string,
    public status: string,
    public donor_id: string,
    public image_url: string
  ) {
    super();
  }
}
