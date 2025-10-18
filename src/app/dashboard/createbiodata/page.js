"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateBiodataPage() {
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      Swal.fire("Error!", "You must be logged in to create biodata.", "error");
      return;
    }

    try {
      const payload = {
        biodataType: e.target.biodataType.value,
        name: e.target.name.value,
        profileImage: e.target.profileImage.value,
        dateOfBirth: e.target.dateOfBirth.value,
        height: e.target.height.value,
        weight: e.target.weight.value,
        age: parseInt(e.target.age.value),
        occupation: e.target.occupation.value,
        race: e.target.race.value,
        fathersName: e.target.fathersName.value,
        mothersName: e.target.mothersName.value,
        permanentDivision: e.target.permanentDivision.value,
        presentDivision: e.target.presentDivision.value,
        expectedPartnerAge: e.target.expectedPartnerAge.value,
        expectedPartnerHeight: e.target.expectedPartnerHeight.value,
        expectedPartnerWeight: e.target.expectedPartnerWeight.value,
        mobileNumber: e.target.mobileNumber.value,
        email: session.user.email, // user email
        isPremium: false,
        role: "user",
      };

      // POST request to backend
      const res = await axios.post("/api/biodatas", payload);

      // Show auto-generated index to user
      Swal.fire(
        "Success!",
        `Biodata created successfully!\nYour Biodata Number is ${res.data.index}`,
        "success"
      );

      console.log("Response:", res.data);
      e.target.reset();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to create biodata", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Biodata
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="biodataType" placeholder="Biodata Type" required type="text" className="input" />
        <input name="name" placeholder="Name" required type="text" className="input" />
        <input name="profileImage" placeholder="Profile Image URL" required type="url" className="input" />
        <input name="dateOfBirth" type="date" placeholder="Date of Birth" required className="input" />
        <input name="height" placeholder="Height" required type="text" className="input" />
        <input name="weight" placeholder="Weight" required type="text" className="input" />
        <input name="age" placeholder="Age" required type="number" className="input" />
        <input name="occupation" placeholder="Occupation" required type="text" className="input" />
        <input name="race" placeholder="Race" required type="text" className="input" />
        <input name="fathersName" placeholder="Father's Name" required type="text" className="input" />
        <input name="mothersName" placeholder="Mother's Name" required type="text" className="input" />
        <input name="permanentDivision" placeholder="Permanent Division" required type="text" className="input" />
        <input name="presentDivision" placeholder="Present Division" required type="text" className="input" />
        <input name="expectedPartnerAge" placeholder="Expected Partner Age" required type="text" className="input" />
        <input name="expectedPartnerHeight" placeholder="Expected Partner Height" required type="text" className="input" />
        <input name="expectedPartnerWeight" placeholder="Expected Partner Weight" required type="text" className="input" />
        <input name="mobileNumber" placeholder="Mobile Number" required type="tel" className="input" />

        {/* Read-only email */}
        <input
          name="email"
          value={session?.user?.email || ""}
          readOnly
          placeholder="Email"
          type="email"
          className="input bg-gray-100 cursor-not-allowed"
        />

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
