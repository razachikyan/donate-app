import { BaseDTO } from "./BaseDTO";

export class TransactionDTO extends BaseDTO {
  constructor(
    public item_id: string,
    public donor_id: string,
    public recipient_id: string,
    public status: "in_progress" | "completed" | "cancelled"
  ) {
    super();
  }
}
