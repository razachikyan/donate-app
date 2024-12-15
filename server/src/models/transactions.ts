export interface ITransactionDTO {
  item_id: string;
  donor_id: string;
  recipient_id: string;
  status: string;
  pickup_date: string;
  delivery_date: string;
  created_at: string;
  updated_at: string;
}

export interface ITransactionResponse {
  transaction_id: string;
  item_id: string;
  donor_id: string;
  recipient_id: string;
  status: string;
  pickup_date: string;
  delivery_date: string;
  created_at: string;
  updated_at: string;
}
