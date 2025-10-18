"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserBiodataPage() {
  const { data: session } = useSession();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchBiodata = async () => {
      try {
        const res = await axios.get(`/api/biodatas/me?email=${session.user.email}`);
        setBiodata(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to fetch biodata", "error");
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [session?.user?.email]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!biodata) return <div className="text-center mt-20">No biodata found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Biodata</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image */}
        <div className="relative w-48 h-48">
          <Image
            src={biodata.profileImage}
            alt={biodata.name}
            fill
            className="rounded-full object-cover border-4 border-[#8B4513]"
          />
        </div>

        {/* User Information */}
        <div className="flex-1 space-y-2 text-gray-800">
          
          <p><strong>ID:</strong> {biodata.index}</p>
          <p><strong>Name:</strong> {biodata.name}</p>
          <p><strong>Email:</strong> {biodata.email}</p>
          <p><strong>Biodata Type:</strong> {biodata.biodataType}</p>
          <p><strong>Date of Birth:</strong> {biodata.dateOfBirth}</p>
          <p><strong>Age:</strong> {biodata.age}</p>
          <p><strong>Height:</strong> {biodata.height}</p>
          <p><strong>Weight:</strong> {biodata.weight}</p>
          <p><strong>Occupation:</strong> {biodata.occupation}</p>
          <p><strong>Race:</strong> {biodata.race}</p>
          <p><strong>Father's Name:</strong> {biodata.fathersName}</p>
          <p><strong>Mother's Name:</strong> {biodata.mothersName}</p>
          <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
          <p><strong>Present Division:</strong> {biodata.presentDivision}</p>
          <p><strong>Expected Partner Age:</strong> {biodata.expectedPartnerAge}</p>
          <p><strong>Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</p>
          <p><strong>Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</p>
          <p><strong>Mobile Number:</strong> {biodata.mobileNumber}</p>
          <p><strong>Premium User:</strong> {biodata.isPremium ? "Yes" : "No"}</p>
          <p><strong>Role:</strong> {biodata.role}</p>
        </div>
      </div>
    </div>
  );
}
