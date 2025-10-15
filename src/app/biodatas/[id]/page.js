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
  FaEnvelope,
  FaPhone,
  FaUser,
  FaRulerVertical,
  FaWeight,
  FaUsers,
  FaStar,
} from "react-icons/fa";

export default function BiodataDetails() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBiodata = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/biodatas/${id}`);
        const data = await res.json();
        setBiodata(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchBiodata();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (!biodata)
    return <p className="text-center mt-20 text-gray-700">Biodata not found.</p>;


  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 md:px-12 flex justify-center"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/1tdZL8Hy/bg-3.png')",
        backgroundSize: "cover",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Image Section */}
        <div className="relative w-full md:w-1/3 h-80 md:h-auto">
          <Image
            src={biodata.profileImage}
            alt={biodata.name}
            fill
            className="object-cover"
          />
          {biodata.isPremium && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold rounded-full animate-pulse shadow-lg">
              Premium
            </span>
          )}
        </div>

        {/* Right Info Section */}
        <div className="flex-1 p-8 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-900">{biodata.name}</h1>
          <p className="text-gray-700 text-lg">{biodata.occupation}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InfoItem icon={<FaBirthdayCake />} label="Age" value={biodata.age} />
            <InfoItem icon={<FaMale />} label="Gender" value={biodata.biodataType} />
            <InfoItem icon={<FaMapMarkerAlt />} label="Permanent Division" value={biodata.permanentDivision} />
            <InfoItem icon={<FaMapMarkerAlt />} label="Present Division" value={biodata.presentDivision} />
            <InfoItem icon={<FaRulerVertical />} label="Height" value={biodata.height} />
            <InfoItem icon={<FaWeight />} label="Weight" value={biodata.weight} />
            <InfoItem icon={<FaUsers />} label="Race" value={biodata.race} />
            <InfoItem icon={<FaUser />} label="Father's Name" value={biodata.fathersName} />
            <InfoItem icon={<FaUser />} label="Mother's Name" value={biodata.mothersName} />
            <InfoItem icon={<FaBirthdayCake />} label="DOB" value={biodata.dateOfBirth} />
            <InfoItem icon={<FaEnvelope />} label="Email" value={biodata.email} />
            <InfoItem icon={<FaPhone />} label="Mobile" value={biodata.mobileNumber} />
            <InfoItem icon={<FaStar />} label="Expected Partner Age" value={biodata.expectedPartnerAge} />
            <InfoItem icon={<FaRulerVertical />} label="Expected Partner Height" value={biodata.expectedPartnerHeight} />
            <InfoItem icon={<FaWeight />} label="Expected Partner Weight" value={biodata.expectedPartnerWeight} />
          </div>

          <button
            onClick={() => router.back()}
            className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-3 px-6 shadow-lg hover:scale-105 transition-transform w-fit self-start"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Reusable Info Item
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-gray-700 bg-gray-100/60 p-3 rounded-xl shadow-inner">
      <div className="text-xl">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
    </div>
  );
}
