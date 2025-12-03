"use server";

import { getDatabase } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { ContactMessage } from "@/types/contact";

export async function submitContactForm(formData: FormData) {
  try {
    // Extract data dari form
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Validasi basic
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Semua field wajib diisi!",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Email tidak valid!",
      };
    }

    // Connect ke MongoDB
    const db = await getDatabase();
    const collection = db.collection<ContactMessage>("contacts");

    // Insert data
    const contactData: ContactMessage = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || "",
      message: message.trim(),
      createdAt: new Date(),
      status: "new",
    };

    const result = await collection.insertOne(contactData as any);

    // Optional: Revalidate path jika ada halaman yang display messages
    revalidatePath("/contact");

    return {
      success: true,
      message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Terjadi kesalahan. Silakan coba lagi.",
    };
  }
}
