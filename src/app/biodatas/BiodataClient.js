"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaSort,
  FaTransgender,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}

const divisions = [
  "All",
  "Dhaka",
  "Chattagram",
  "Sylhet",
  "Barishal",
  "Rajshahi",
  "Khulna",
  "Rangpur",
  "Mymensingh",
];

const biodataTypes = ["All", "Male", "Female"];

export default function BiodataClient({ biodatas }) {
  const [loading, setLoading] = useState(false);
  const [filteredBiodatas, setFilteredBiodatas] = useState(biodatas);
  const [filters, setFilters] = useState({
    name: "",
    type: "All",
    division: "All",
    minAge: "",
    maxAge: "",
    sort: "asc",
  });
  const [panelOpen, setPanelOpen] = useState(false);

  // Dynamic filtering
  useEffect(() => {
    setLoading(true);
    let filtered = [...biodatas];

    if (filters.name)
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    if (filters.type !== "All")
      filtered = filtered.filter((b) => b.biodataType === filters.type);
    if (filters.division !== "All")
      filtered = filtered.filter(
        (b) =>
          b.permanentDivision === filters.division ||
          b.presentDivision === filters.division
      );
    if (filters.minAge) filtered = filtered.filter((b) => b.age >= parseInt(filters.minAge));
    if (filters.maxAge) filtered = filtered.filter((b) => b.age <= parseInt(filters.maxAge));

    filtered.sort((a, b) => (filters.sort === "asc" ? a.age - b.age : b.age - a.age));

    setTimeout(() => {
      setFilteredBiodatas(filtered);
      setLoading(false);
    }, 200);
  }, [filters, biodatas]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Side Panel */}
      <motion.div
        animate={{ width: panelOpen ? 320 : 80 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="bg-white/95 backdrop-blur-md shadow-xl h-screen flex flex-col items-center py-6 relative overflow-hidden"
        onMouseEnter={() => setPanelOpen(true)}
        onMouseLeave={() => setPanelOpen(false)}
      >
        {/* Collapsed/Expanded Icons */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center w-full">
            <motion.div
              className="flex items-center justify-center w-full mb-6 cursor-pointer"
              animate={{ scale: panelOpen ? 1 : 1 }}
            >
              <FaSearch size={panelOpen ? 26 : 28} className="text-gray-700" />
              {panelOpen && <span className="ml-3 text-gray-900 font-semibold text-lg">Filters</span>}
            </motion.div>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4 w-full px-6"
            >
              {/* Search Name */}
              <div className="flex items-center gap-3">
                <FaSearch size={22} className="text-gray-700" />
                <input
                  type="text"
                  placeholder="Search name"
                  className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 transition-all duration-300"
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
              </div>

              {/* Type */}
              <div className="flex items-center gap-3">
                <FaTransgender size={22} className="text-gray-700" />
                <select
                  className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 transition-all duration-300"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  {biodataTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Division */}
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt size={22} className="text-gray-700" />
                <select
                  className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 transition-all duration-300"
                  value={filters.division}
                  onChange={(e) => setFilters({ ...filters, division: e.target.value })}
                >
                  {divisions.map((div) => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
              </div>

              {/* Age (Min + Max in one line) */}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min Age"
                  className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 transition-all duration-300"
                  value={filters.minAge}
                  onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                />
                <br/>
                <input
                  type="number"
                  placeholder="Max Age"
                  className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 transition-all duration-300"
                  value={filters.maxAge}
                  onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                />
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-3">
                <FaSort size={22} className="text-gray-700" />
                <select
                  className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 transition-all duration-300"
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                >
                  <option value="asc">Age Low → High</option>
                  <option value="desc">Age High → Low</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 py-12 px-6 md:px-8 min-h-screen">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12 drop-shadow-lg">
          All Biodatas
        </h1>

        {loading && <Loader />}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredBiodatas.map((bio) => (
                <motion.div
                  key={bio._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/70 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center shadow-xl hover:shadow-2xl hover:scale-105 transition-transform border border-gray-200"
                >
                  <div className="relative w-36 h-36 mb-4">
                    <Image
                      src={bio.profileImage}
                      alt={bio.name}
                      fill
                      className="rounded-full border-4 border-gradient-to-r from-yellow-400 to-pink-500 p-1"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{bio.name}</h2>
                  <p className="text-gray-700">{bio.occupation}</p>
                  <p className="text-gray-600">
                    {bio.permanentDivision} / {bio.presentDivision}
                  </p>
                  <p className="text-gray-600">Age: {bio.age}</p>
                  <p className="text-gray-600">
                    Height: {bio.height} | Weight: {bio.weight}
                  </p>
                  {bio.isPremium && (
                    <span className="mt-3 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-sm font-semibold animate-pulse">
                      Premium
                    </span>
                  )}
                  <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
                    View Details
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
