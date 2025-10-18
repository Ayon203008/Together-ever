"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaMale,
  FaFemale,
  FaUser,
  FaRulerVertical,
  FaWeight,
  FaUsers,
  FaStar,
  FaHashtag,
  FaHeart,
} from "react-icons/fa";
import { useSession } from "next-auth/react";


export default function BiodataDetails() {
  const router = useRouter();
  const { id } = useParams();

  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (!id) return;

    const fetchBiodata = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/biodatas/${id}`);
        const data = await res.json();
        setBiodata(data);

        if (data) {
          await fetchAndFindSimilar(data);
        }
      } catch (error) {
        console.error("Error fetching biodata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [id]);

  const fetchAndFindSimilar = async (current) => {
    try {
      const res = await fetch(`/api/biodatas?gender=${encodeURIComponent(current.biodataType)}`);
      let candidates = [];
      if (res.ok) {
        candidates = await res.json();
      } else {
        const allRes = await fetch(`/api/biodatas`);
        candidates = allRes.ok ? await allRes.json() : [];
      }

      candidates = (candidates || []).filter(
        (b) => b && b.biodataType === current.biodataType && b._id !== current._id
      );

      if (candidates.length === 0) {
        const allRes = await fetch(`/api/biodatas`);
        const all = allRes.ok ? await allRes.json() : [];
        candidates = (all || []).filter(
          (b) => b && b.biodataType === current.biodataType && b._id !== current._id
        );
      }

      const scored = candidates.map((c) => {
        let score = 0;
        if (current.occupation && c.occupation && current.occupation.toLowerCase() === c.occupation.toLowerCase()) {
          score += 50;
        }

        if (
          current.permanentDivision &&
          c.permanentDivision &&
          current.permanentDivision.toLowerCase() === c.permanentDivision.toLowerCase()
        ) {
          score += 30;
        } else if (
          current.presentDivision &&
          c.presentDivision &&
          current.presentDivision.toLowerCase() === c.presentDivision.toLowerCase()
        ) {
          score += 20;
        }

        const ageDiff = Math.abs((current.age || 0) - (c.age || 0));
        if (!isNaN(ageDiff)) {
          if (ageDiff === 0) score += 20;
          else if (ageDiff <= 2) score += 12;
          else if (ageDiff <= 5) score += 6;
          else if (ageDiff <= 10) score += 2;
        }

        if (c.isPremium) score += 1;

        return { ...c, score, ageDiff };
      });

      scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return (a.ageDiff || 0) - (b.ageDiff || 0);
      });

      let top = scored.slice(0, 3).map(({ score, ageDiff, ...rest }) => rest);

      if (top.length < 3) {
        const existingIds = new Set(top.map((t) => t._id).concat(current._id));
        const fillers = (scored || [])
          .map(({ score, ageDiff, ...rest }) => rest)
          .filter((c) => !existingIds.has(c._id))
          .slice(0, 3 - top.length);

        if (fillers.length < 3 - top.length) {
          const allRes = await fetch(`/api/biodatas`);
          const all = allRes.ok ? await allRes.json() : [];
          const extra = (all || [])
            .filter((b) => b.biodataType === current.biodataType && b._id !== current._id && !existingIds.has(b._id))
            .slice(0, 3 - top.length - fillers.length);
          fillers.push(...extra);
        }

        top = top.concat(fillers);
      }

      setSimilarBiodatas(top);
    } catch (err) {
      console.error("Error finding similar biodatas:", err);
      setSimilarBiodatas([]);
    }
  };

  const handleAddToFavourite = async () => {
    if (!session?.user?.email) {
      alert("Login required");
      return;
    }

    setFavLoading(true);
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ biodataId: biodata._id, userId: session.user.email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Added to favourite");
        setIsFavourite(true); // ✅ disable button
      } else {
        alert(data.message || "Failed to add favourite");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add favourite");
    } finally {
      setFavLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );

  if (!biodata) return <p className="text-center mt-20 text-gray-700">Biodata not found.</p>;

  return (
    <div
      className="min-h-screen bg-gray-100 py-12 px-4 md:px-16 flex flex-col items-center"
      style={{
        backgroundImage: "url('https://i.postimg.cc/1tdZL8Hy/bg-3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-md rounded-4xl shadow-2xl max-w-6xl w-full overflow-hidden border border-gray-200 p-6 md:p-12 flex flex-col items-center"
      >
        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl">
          <Image
            src={biodata.profileImage || "/default-profile.png"}
            alt={biodata.name || "User"}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="text-center mt-4">
          <h1 className="text-4xl font-extrabold text-gray-900">{biodata.name}</h1>
          <p className="text-gray-600 text-lg mt-1">{biodata.occupation}</p>
          {biodata.index && (
            <div className="flex items-center justify-center gap-2 mt-2 text-purple-600 font-semibold">
              <FaHashtag className="text-lg" />
              <span>Biodata Number {biodata.index}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 w-full">
          <InfoItem icon={<FaBirthdayCake />} label="Age" value={biodata.age} />
          <InfoItem icon={biodata.biodataType === "Male" ? <FaMale /> : <FaFemale />} label="Gender" value={biodata.biodataType} />
          <InfoItem icon={<FaMapMarkerAlt />} label="Permanent Division" value={biodata.permanentDivision} />
          <InfoItem icon={<FaMapMarkerAlt />} label="Present Division" value={biodata.presentDivision} />
          <InfoItem icon={<FaRulerVertical />} label="Height" value={biodata.height} />
          <InfoItem icon={<FaWeight />} label="Weight" value={biodata.weight} />
          <InfoItem icon={<FaUsers />} label="Race" value={biodata.race} />
          <InfoItem icon={<FaUser />} label="Father's Name" value={biodata.fathersName} />
          <InfoItem icon={<FaUser />} label="Mother's Name" value={biodata.mothersName} />
          <InfoItem icon={<FaBirthdayCake />} label="DOB" value={biodata.dateOfBirth} />
          <InfoItem icon={<FaStar />} label="Expected Partner Age" value={biodata.expectedPartnerAge} />
          <InfoItem icon={<FaRulerVertical />} label="Expected Partner Height" value={biodata.expectedPartnerHeight} />
          <InfoItem icon={<FaWeight />} label="Expected Partner Weight" value={biodata.expectedPartnerWeight} />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => router.back()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-3 px-6 shadow-lg hover:scale-105 transition-transform font-semibold"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push(`/contact-request/${biodata._id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 shadow-lg font-semibold transition-transform hover:scale-105"
          >
            Request Contact Info
          </button>
          <button
            onClick={handleAddToFavourite}
            disabled={favLoading || isFavourite}
            className={`flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 px-6 shadow-lg font-semibold transition-transform hover:scale-105 ${
              isFavourite ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaHeart />
            {isFavourite ? "Added" : favLoading ? "Adding..." : "Add to Favourite"}
          </button>
        </div>
      </motion.div>

      {similarBiodatas.length > 0 && (
        <div className="mt-12 max-w-6xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Similar {biodata.biodataType === "Male" ? "Male" : "Female"} Biodatas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarBiodatas.map((bio) => (
              <motion.div
                key={bio._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => router.push(`/biodatas/${bio._id}`)}
                className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col items-center p-4"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg -mt-12">
                  <Image
                    src={bio.profileImage || "/default-profile.png"}
                    alt={bio.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center mt-4">
                  <h3 className="text-lg font-bold text-gray-900">{bio.name}</h3>
                  <p className="text-sm text-gray-600">{bio.occupation}</p>
                  <p className="text-sm text-gray-500 mt-1">{bio.presentDivision}</p>

                  <div className="mt-3 flex justify-center items-center gap-3 text-sm text-gray-700">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                      Age: {bio.age}
                    </span>
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-semibold">
                      {bio.height}
                    </span>
                  </div>
                </div>

                <div className="mt-4 w-full flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/biodatas/${bio._id}`);
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (

    
    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl shadow-inner hover:shadow-lg transition-shadow hover:bg-white duration-300">
      <div className="text-2xl text-purple-500">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-semibold text-gray-800">{value || "N/A"}</span>
      </div>
    </div>
   
  );
}
