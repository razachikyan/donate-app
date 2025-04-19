export interface IItemDTO {
  title: string;
  description: string;
  category: string;
  variant: "charity" | "announcement";
  condition: "new" | "good" | "used";
  status: "available" | "reserved" | "donated";
  donor_id: string;
  image_url: string;
  address: string;
}

export interface IItemResponse {
  item_id: string;
  title: string;
  address: string;
  description: string;
  category: string;
  condition: "new" | "good" | "used";
  status: "available" | "reserved" | "donated";
  donor_id: string;
  recipient_id: string | null;
  image_url: string;
  variant: "charity" | "announcement";
  created_at: string;
  updated_at: string;
}
