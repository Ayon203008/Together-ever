"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaTransgender,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSort,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


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
const ITEMS_PER_PAGE = 12;

// --- লোডার কম্পোনেন্ট ---
function Loader() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#8B4513] border-opacity-70"></div>
    </div>
  );
}

// --- মূল কম্পোনেন্ট ---
export default function BiodataClient({ biodatas }) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    type: "All",
    division: "All",
    minAge: "",
    maxAge: "",
    sort: "asc",
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // --- ফিল্টারিং ---
  const filteredBiodatas = useMemo(() => {
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

    // Sorting
    filtered.sort((a, b) => (filters.sort === "asc" ? a.age - b.age : b.age - a.age));

    // Always sort by index to maintain order
    filtered.sort((a, b) => a.index - b.index);

    return filtered;
  }, [filters, biodatas]);

  // --- লোডিং হ্যান্ডেলিং ---
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [filters]);

  // --- পেজিনেশন ---
  const totalPages = Math.ceil(filteredBiodatas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredBiodatas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const router=useRouter()
  const { data: session } = useSession();


  // --- JSX ---
  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-[#FDF9F3]"
      style={{
        backgroundImage: "url('/images/soft-texture-bg.jpg')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Side Filter Panel */}
      <motion.div
        animate={{ width: panelOpen ? 300 : 80 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`fixed lg:sticky top-0 h-screen bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col py-8 relative z-50 border-r border-[#8B4513]/20 
          ${panelOpen ? "w-full md:w-[300px]" : "w-20 md:w-[80px]"} 
          lg:w-auto lg:h-auto lg:top-0 lg:flex-shrink-0 lg:flex lg:flex-col`}
        onMouseEnter={() => window.innerWidth > 1024 && setPanelOpen(true)}
        onMouseLeave={() => window.innerWidth > 1024 && setPanelOpen(false)}
      >
        {/* Panel Header */}
        <motion.div
          className="flex items-center justify-center w-full mb-10 px-4 cursor-pointer lg:cursor-default"
          animate={{ scale: panelOpen ? 1 : 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.innerWidth <= 1024 && setPanelOpen(!panelOpen)}
        >
          <FaFilter size={28} className="text-[#8B4513]" />
          {panelOpen && (
            <span className="ml-3 text-stone-800 font-serif text-2xl tracking-wide">
              Filters
            </span>
          )}
        </motion.div>

        {/* Filters Content */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6 w-full px-5"
            >
              {/* Name Filter */}
              <div className="flex items-center gap-3">
                <FaSearch size={18} className="text-[#8B4513]" />
                <input
                  type="text"
                  placeholder="Search name"
                  className="flex-1 p-2 rounded-lg border border-[#8B4513]/30 focus:ring-[#A0522D] text-gray-800 bg-white/70"
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-3">
                <FaTransgender size={18} className="text-[#8B4513]" />
                <select
                  className="flex-1 p-2 rounded-lg border border-[#8B4513]/30 focus:ring-[#A0522D] text-gray-800 bg-white/70 appearance-none cursor-pointer"
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  {biodataTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Division Filter */}
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt size={18} className="text-[#8B4513]" />
                <select
                  className="flex-1 p-2 rounded-lg border border-[#8B4513]/30 focus:ring-[#A0522D] text-gray-800 bg-white/70 appearance-none cursor-pointer"
                  onChange={(e) => setFilters({ ...filters, division: e.target.value })}
                >
                  {divisions.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Filters */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-stone-700 ml-1 flex items-center gap-1">
                  <FaCalendarAlt size={14} /> Min Age:
                </p>
                <input
                  type="number"
                  placeholder="Minimum Age"
                  className="p-2 rounded-lg border border-[#8B4513]/30 focus:ring-[#A0522D] text-gray-800 bg-white/70"
                  onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-stone-700 ml-1 flex items-center gap-1">
                  <FaCalendarAlt size={14} /> Max Age:
                </p>
                <input
                  type="number"
                  placeholder="Maximum Age"
                  className="p-2 rounded-lg border border-[#8B4513]/30 focus:ring-[#A0522D] text-gray-800 bg-white/70"
                  onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                />
              </div>

              {/* Sort Filter */}
              <div className="flex items-center gap-3">
                <FaSort size={18} className="text-[#8B4513]" />
                <select
                  className="flex-1 p-2 rounded-lg border border-[#8B4513]/30 focus:ring-[#A0522D] text-gray-800 bg-white/70 appearance-none cursor-pointer"
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
      <div className="flex-1 py-12 px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-stone-800 mb-16 drop-shadow-md tracking-wide">
          Find Your Perfect Match
        </h1>

        {loading && <Loader />}

        {!loading && currentItems.length === 0 && (
          <div className="text-center py-10 text-gray-600 text-xl font-serif">
            No Biodata found matching your filters.
          </div>
        )}

        {!loading && currentItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              <AnimatePresence>
                {currentItems.map((bio) => (
                  <motion.div
                    key={bio._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center shadow-2xl hover:shadow-3xl hover:scale-[1.03] transition-transform duration-500 border-t-4 border-[#A0522D] overflow-hidden relative group"
                  >
                    {/* Index Badge */}
                    <div className="absolute top-2 left-2 bg-[#8B4513] text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                      #{bio.index}
                    </div>

                    {/* Premium Ribbon */}
                    {bio.isPremium && (
                      <div className="absolute top-0 right-0 bg-[#A0522D] text-white text-xs font-semibold py-1 px-4 rounded-bl-xl shadow-md">
                        PREMIUM
                      </div>
                    )}

                    <div className="relative w-36 h-36 mb-4 transform group-hover:scale-[1.05] transition-transform duration-500">
                      <Image
                        src={bio.profileImage}
                        alt={bio.name}
                        fill
                        className="rounded-full border-4 border-[#8B4513] p-1 object-cover shadow-inner"
                      />
                      <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <FaHeart size={36} className="text-white transform group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-wide mt-2">
                      {bio.name}
                    </h2>
                    <p className="text-gray-600 italic mb-3 text-sm">
                      {bio.occupation}
                    </p>

                    <div className="text-sm text-gray-700 space-y-2 mb-4 w-full text-left border-t border-gray-200 pt-3">
                      <p className="flex items-center gap-3 font-semibold">
                        <FaMapMarkerAlt size={14} className="text-[#A0522D]" /> Division:{" "}
                        <span className="font-normal">{bio.permanentDivision}</span>
                      </p>
                      <p className="flex items-center gap-3 font-semibold">
                        <FaCalendarAlt size={14} className="text-[#A0522D]" /> Age:{" "}
                        <span className="font-normal">{bio.age}</span>
                      </p>
                      <p className="flex items-center gap-3 font-semibold">
                        <FaTransgender size={14} className="text-[#A0522D]" /> Type:{" "}
                        <span className="font-normal">{bio.biodataType}</span>
                      </p>
                      <p className="flex items-center gap-3 font-semibold">
                        Details:{" "}
                        <span className="font-normal">
                          H: {bio.height} / W: {bio.weight}
                        </span>
                      </p>
                    </div>


                    <button
                      onClick={() => {
                        if (!session) {
                          router.push("/login"); // 🔒 লগইন না থাকলে login পেজে পাঠাও
                        } else {
                          router.push(`/biodatas/${bio._id}`); // ✅ লগইন থাকলে details পেজে যাও
                        }
                      }}
                      className="mt-4 px-8 py-3 bg-[#8B4513] hover:bg-[#A0522D] text-white rounded-lg shadow-xl hover:scale-[1.05] transition-transform duration-300 font-bold uppercase text-base tracking-widest w-full"
                    >
                      View Details
                    </button>



                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 space-x-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-full shadow-md transition-colors duration-300 ${currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-[#A0522D] hover:text-white text-[#8B4513] border border-[#8B4513]/50"
                    }`}
                >
                  <FaChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${currentPage === index + 1
                        ? "bg-[#8B4513] text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-[#FDF9F3]"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-full shadow-md transition-colors duration-300 ${currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-[#A0522D] hover:text-white text-[#8B4513] border border-[#8B4513]/50"
                    }`}
                >
                  <FaChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
