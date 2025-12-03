export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
  status?: "new" | "read" | "replied";
}
