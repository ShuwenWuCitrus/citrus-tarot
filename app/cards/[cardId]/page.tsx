"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Card {
  name: string;
  name_short: string;
  desc: string;
  meaning_up: string;
  meaning_rev: string;
}

export default function CardDetail() {
  const [card, setCard] = useState<Card | null>(null);
  const params = useParams();

  useEffect(() => {
    fetchCard();
  }, [params]);

  const fetchCard = async () => {
    if (!params.cardId) {
      console.error("Card ID is undefined");
      return;
    }

    try {
      const decodedCardName = decodeURIComponent(params.cardId as string);
      console.log("Decoded card name:", decodedCardName);
      const response = await fetch(
        `https://tarotapi.dev/api/v1/cards/search?q=${encodeURIComponent(
          decodedCardName
        )}`
      );
      const data = await response.json();
      console.log("API response:", data);
      if (data.cards && data.cards.length > 0) {
        setCard(data.cards[0]);
      } else {
        console.error("Card not found");
      }
    } catch (error) {
      console.error("Error fetching card:", error);
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{card.name}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image
            src={`/imgs/tarot_cards/${card.name_short}.jpg`}
            alt={card.name}
            width={300}
            height={520}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="mb-6">{card.desc}</p>
          <h2 className="text-2xl font-semibold mb-4">Upright Meaning</h2>
          <p className="mb-6">{card.meaning_up}</p>
          <h2 className="text-2xl font-semibold mb-4">Reversed Meaning</h2>
          <p>{card.meaning_rev}</p>
        </div>
      </div>
    </div>
  );
}
