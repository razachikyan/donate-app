export interface IItemDTO {
  title: string;
  description: string;
  category: string;
  condition: string;
  status: string;
  donor_id: string;
  recipient_id: string;
  image_url: string;
  create_at: string;
  updated_at: string;
}

export interface IItemResponse {
  item_id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  status: string;
  donor_id: string;
  recipient_id: string;
  image_url: string;
  create_at: string;
  updated_at: string;
}