export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date | string;
  status?: "new" | "read" | "replied";
}
