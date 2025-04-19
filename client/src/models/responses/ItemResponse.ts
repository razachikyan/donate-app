export interface IItemResponse {
  item_id: string;
  title: string;
  description: string;
  category: string;
  variant: "charity" | "announcement";
  condition: "new" | "good" | "used";
  status: "available" | "reserved" | "donated";
  address: string;
  donor_id: string;
  recipient_id: string | null;
  image_url: string;
  created_at: string;
  updated_at: string;
}
