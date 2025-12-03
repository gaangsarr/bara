import { getDatabase } from "@/lib/mongodb";
import { ContactMessage } from "@/types/contact";

export default async function MessagesPage() {
  const db = await getDatabase();
  const collection = db.collection<ContactMessage>("contacts");

  // Fetch semua messages, sort by newest first
  const messages = await collection
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id?.toString()}
            className="bg-white p-6 rounded-lg shadow border"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{msg.name}</h3>
                <p className="text-gray-600">{msg.email}</p>
                {msg.subject && (
                  <p className="text-sm text-gray-500">
                    Subject: {msg.subject}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString("id-ID")}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
