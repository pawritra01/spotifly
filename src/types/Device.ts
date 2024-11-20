export interface Device {
  id: string;
  is_active: boolean;
  name: string;
  type: "Computer" | "TV" | "Smartphone";
}
