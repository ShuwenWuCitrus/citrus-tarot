import Image from "next/image";
import DailyTarotCard from "@/components/DailyTarotCard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-8 bg-[#f0ebe5]">
      <div className="text-center mb-12 mt-8">
        <Image
          src="/imgs/citrus_tarot.png"
          alt="citrus tarot logo"
          width={150}
          height={150}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold mb-3 text-gray-800">Tarot Reader</h1>
        <p className="text-xl text-gray-600">
          Discover the wisdom of the cards
        </p>
      </div>
      <DailyTarotCard />
    </main>
  );
}
