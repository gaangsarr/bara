"use server";

import dbConnect from "@/lib/mongoose";
import Contact from "@/lib/models/Contact";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  console.log("🚀 Server Action called");

  try {
    // Extract data dari form
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    console.log("📝 Form data received:", { name, email, subject });

    // Validasi basic
    if (!name || !email || !message) {
      console.error("❌ Validation failed: Missing fields");
      return {
        success: false,
        error: "Semua field wajib diisi!",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("❌ Validation failed: Invalid email");
      return {
        success: false,
        error: "Email tidak valid!",
      };
    }

    console.log("✅ Validation passed");

    // Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await dbConnect();

    // Create new contact
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || "",
      message: message.trim(),
      status: "new",
    });

    console.log("✅ Contact saved successfully. ID:", contact._id);

    // Revalidate path
    revalidatePath("/contact");
    revalidatePath("/admin/messages");

    return {
      success: true,
      message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
      id: contact._id.toString(),
    };
  } catch (error) {
    console.error("❌ Error in submitContactForm:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return {
      success: false,
      error: `Terjadi kesalahan: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
