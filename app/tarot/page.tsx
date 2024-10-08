"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Card {
  name: string;
  name_short: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
}

interface ApiResponse {
  nhits: number;
  cards: Card[];
}

const DailyTarotCard = () => {
  const [dailyCard, setDailyCard] = useState<Card | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomCard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://tarotapi.dev/api/v1/cards/random?n=1"
      );
      const data: ApiResponse = await response.json();
      setDailyCard(data.cards[0]);
      setIsReversed(Math.random() < 0.5); // 50% chance of being reversed
    } catch (error) {
      console.error("Error fetching card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="daily-tarot-card text-center max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Daily Tarot Card</h1>
      {isLoading ? (
        <p className="text-lg mb-6">Loading...</p>
      ) : dailyCard ? (
        <div className="card bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            {dailyCard.name} {isReversed ? "(Reversed)" : ""}
          </h2>
          <div className={`mb-4 ${isReversed ? "transform rotate-180" : ""}`}>
            <Image
              src={`/imgs/tarot_cards/${dailyCard.name_short}.jpg`}
              alt={dailyCard.name}
              width={200}
              height={350}
              className="mx-auto"
            />
          </div>
          <p className="text-gray-700 mb-4">{dailyCard.desc}</p>
          <h3 className="text-xl font-semibold mb-2">Meaning</h3>
          <p className="text-gray-600 mb-4">
            {isReversed ? dailyCard.meaning_rev : dailyCard.meaning_up}
          </p>
        </div>
      ) : (
        <p className="text-lg mb-6">Click the button to draw your daily card</p>
      )}
      <button
        onClick={getRandomCard}
        className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
        disabled={isLoading}
      >
        Draw Card
      </button>
    </div>
  );
};

export default function TarotPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <DailyTarotCard />
    </main>
  );
}
