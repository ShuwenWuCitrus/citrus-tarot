import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Card {
  name: string;
  name_short: string;
  desc: string;
}

interface TarotCardGridProps {
  cards: Card[];
}

const TarotCardGrid: React.FC<TarotCardGridProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Link
          href={`/cards/${encodeURIComponent(card.name)}`}
          key={card.name_short}
        >
          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <Image
              src={`/imgs/tarot_cards/${card.name_short}.jpg`}
              alt={card.name}
              width={150}
              height={260}
              className="mx-auto mb-2"
            />
            <h3 className="text-center font-semibold">{card.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TarotCardGrid;
