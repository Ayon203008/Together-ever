"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ContactRequestForm() {
  const { id } = useParams(); // biodata ID
  const router = useRouter();
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [cardId, setCardId] = useState("");
  const [biodataIndex, setBiodataIndex] = useState(""); // NEW: biodata number
  const [loading, setLoading] = useState(false);

  // set email from session
  useEffect(() => {
    if (session?.user?.email) setEmail(session.user.email);
  }, [session]);

  // fetch biodata info to get index
  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const res = await fetch(`/api/biodatas/${id}`);
        const data = await res.json();
        if (data?.index) setBiodataIndex(data.index);
      } catch (err) {
        console.error("Failed to fetch biodata index", err);
      }
    };
    if (id) fetchBiodata();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          biodataId: id,       // biodata document ID
          biodataIndex,        // NEW: biodata number
          email,
          userId: session?.user?.id,
          cardId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Contact request sent successfully!");
       
      } else {
        alert(data.error || "Request failed");
      }
    } catch (err) {
      console.error(err);
      alert("Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Request</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Show Biodata Number */}
          <input
            type="text"
            value={biodataIndex || ""}
            disabled
            className="border p-3 rounded bg-gray-100"
            placeholder="Biodata Number"
          />

          <input
            type="text"
            value={email}
            disabled
            className="border p-3 rounded bg-gray-100"
          />
          <input
            type="text"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            placeholder="Card ID / Payment Info"
            className="border p-3 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
