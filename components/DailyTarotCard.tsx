"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

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
  const [suggestion, setSuggestion] = useState<string>("");
  const [showFullDesc, setShowFullDesc] = useState(false);

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const getRandomCard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://tarotapi.dev/api/v1/cards/random?n=1"
      );
      const data: ApiResponse = await response.json();
      const newIsReversed = Math.random() < 0.5; // 50% chance of being reversed
      setDailyCard(data.cards[0]);
      setIsReversed(newIsReversed);
      await getSuggestion(data.cards[0], newIsReversed);
    } catch (error) {
      console.error("Error fetching card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSuggestion = async (card: Card, isReversed: boolean) => {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Based on the tarot card "${card.name}" ${
      isReversed ? "(Reversed)" : ""
    }, provide a concise daily suggestion in 2-3 sentences. Consider the card's meaning: ${
      isReversed ? card.meaning_rev : card.meaning_up
    }. Start directly with the advice, without any introductory phrases or headings.`;

    try {
      const result = await model.generateContent(prompt);
      let generatedText = result.response.text();

      // Remove any common prefixes that might appear
      const prefixesToRemove = [
        "Daily suggestion:",
        "Suggestion of the day:",
        "Here's your daily suggestion:",
        "Daily advice:",
        "Advice for today:",
      ];

      for (const prefix of prefixesToRemove) {
        if (generatedText.toLowerCase().startsWith(prefix.toLowerCase())) {
          generatedText = generatedText.slice(prefix.length).trim();
          break;
        }
      }

      setSuggestion(generatedText);
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setSuggestion("Unable to generate a suggestion at this time.");
    }
  };

  return (
    <div className="daily-tarot-card max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">
        Your Daily Tarot Card
      </h1>
      {isLoading ? (
        <p className="text-lg mb-6 text-center">Loading...</p>
      ) : dailyCard ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {dailyCard.name} {isReversed ? "(Reversed)" : ""}
            </h2>
            <div className={`mb-6 ${isReversed ? "transform rotate-180" : ""}`}>
              <Image
                src={`/imgs/tarot_cards/${dailyCard.name_short}.jpg`}
                alt={dailyCard.name}
                width={200}
                height={350}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-purple-700">
                Description
              </h3>
              <p className="text-gray-700">
                {showFullDesc
                  ? dailyCard.desc
                  : truncateDescription(dailyCard.desc, 100)}
                {dailyCard.desc.length > 100 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="ml-2 text-purple-600 hover:text-purple-800 focus:outline-none"
                  >
                    {showFullDesc ? "Read less" : "Read more"}
                  </button>
                )}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-purple-700">
                Meaning
              </h3>
              <p className="text-gray-700">
                {isReversed ? dailyCard.meaning_rev : dailyCard.meaning_up}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-700">
                Daily Suggestion
              </h3>
              <div className="text-gray-700 prose prose-sm">
                <ReactMarkdown>{suggestion}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg mb-6 text-center">
          Click the button to draw your daily card
        </p>
      )}
      <div className="mt-8 text-center">
        <button
          onClick={getRandomCard}
          className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          disabled={isLoading}
        >
          Draw Card
        </button>
      </div>
    </div>
  );
};

export default function TarotPage() {
  return (
    <main className="flex items-center justify-center p-4">
      <DailyTarotCard />
    </main>
  );
}
