"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaTrash, FaEye } from "react-icons/fa";

export default function FavouritesDashboard() {
  const { data: session } = useSession();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchFavourites = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/favourites/user?userId=${session.user.email}`);
      const data = await res.json();
      setFavourites(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [session]);

  const handleDelete = async (biodataId) => {
    if (!confirm("Are you sure you want to remove this favourite?")) return;

    try {
      const res = await fetch(`/api/favourites`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ biodataId, userId: session.user.email }),
      });

      const data = await res.json();
      alert(data.message || "Deleted successfully");
      fetchFavourites();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  if (!session) return <p className="text-center mt-10">Please login to see your favourites.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Favourite Biodatas</h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {favourites.length === 0 && !loading && <p className="text-center text-gray-500">No favourites yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favourites.map((bio) => (
          <div
            key={bio._id}
            className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center hover:shadow-2xl transition-transform hover:-translate-y-1"
          >
            {/* Profile Image */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md">
              <Image
                src={bio.profileImage || "/default-profile.png"}
                alt={bio.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Basic Info */}
            <h3 className="mt-4 text-xl font-bold text-gray-900">{bio.name}</h3>
            <p className="text-gray-600">{bio.occupation}</p>
            <p className="text-gray-500">{bio.presentDivision}</p>

            {/* Extra Info */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700 w-full">
              <div className="bg-purple-100 text-purple-700 py-1 px-2 rounded text-center font-semibold">
                Age: {bio.age || "N/A"}
              </div>
              <div className="bg-pink-100 text-pink-700 py-1 px-2 rounded text-center font-semibold">
                Height: {bio.height || "N/A"}
              </div>
              <div className="bg-blue-100 text-blue-700 py-1 px-2 rounded text-center font-semibold">
                Weight: {bio.weight || "N/A"}
              </div>
              <div className="bg-green-100 text-green-700 py-1 px-2 rounded text-center font-semibold">
                Race: {bio.race || "N/A"}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-3 w-full justify-center">
              <button
                onClick={() => router.push(`/biodatas/${bio._id}`)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <FaEye /> View
              </button>
              <button
                onClick={() => handleDelete(bio._id)}
                className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
