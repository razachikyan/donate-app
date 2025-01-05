export interface IItemDTO {
  title: string;
  description: string;
  category: string;
  condition: string;
  status: string;
  donor_id: string;
  image_url: string;
  address: string
}

export interface IItemResponse {
  item_id: string;
  title: string;
  address: string
  description: string;
  category: string;
  condition: string;
  status: string;
  donor_id: string;
  recipient_id: string | null;
  image_url: string;
  created_at: string;
  updated_at: string;
}
