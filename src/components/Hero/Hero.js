import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen">
      {/* Full-screen background image */}
      <Image
        src="/images/hero.jpg"
        alt="Hero Image"
        fill
        className="object-cover object-center"
      />

      {/* Overlay (optional for better text readability) */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div>
            <Image alt="flower" width={200} height={200} src={'/images/flower2.png'}/>

        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
          Your Journey Begins Here
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white drop-shadow-md">
          Find Your Match
        </p>
      </div>
    </section>
  );
}
