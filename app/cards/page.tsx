"use client";

import React, { useState, useEffect } from "react";
import TarotCardGrid from "@/components/TarotCardGrid";
import SearchBar from "@/components/SearchBar";

interface Card {
  name: string;
  name_short: string;
  desc: string;
  // Add other properties as needed
}

export default function CardGallery() {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all cards when the component mounts
    fetchCards();
  }, []);

  useEffect(() => {
    // Filter cards based on search term
    const filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm, cards]);

  const fetchCards = async () => {
    try {
      const response = await fetch("https://tarotapi.dev/api/v1/cards");
      const data = await response.json();
      setCards(data.cards);
      setFilteredCards(data.cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Tarot Card Gallery
      </h1>
      <SearchBar onSearch={handleSearch} />
      <TarotCardGrid cards={filteredCards} />
    </div>
  );
}
