import React from "react";
import { Game } from "../../services/api";

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => Promise<void>;
  onDemo?: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay, onDemo }) => {
  const getProviderColor = (provider: string) => {
    const colors: { [key: string]: string } = {
      PGSOFT: "bg-purple-500",
      JOKER: "bg-yellow-500",
      SLOTXO: "bg-red-500",
      SEXY: "bg-pink-500",
      HABANERO: "bg-orange-500",
      CQ9: "bg-blue-500",
      PRAGMATIC_SLOT: "bg-indigo-500",
      PRAGMATIC: "bg-indigo-500",
      SA: "bg-teal-500",
      EVOLUTION: "bg-green-500",
      KINGMAKER: "bg-purple-600",
      default: "bg-gray-500",
    };
    return colors[provider.toUpperCase()] || colors.default;
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      SLOT: "🎰",
      LIVE: "🎲",
      LIVECASINO: "🎲",
      FISHING: "🎣",
      ARCADE: "🕹️",
      TABLE: "♠️",
      SPORT: "⚽",
      LOTTERY: "🎱",
      default: "🎮",
    };
    return icons[category.toUpperCase()] || icons.default;
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl group transition transform hover:-translate-y-1"
      onClick={() => onPlay(game)}
    >
      {/* IMAGE */}
      <img
        src={game.img || "/images/placeholder.png"}
        alt={game.name}
        className="h-64 w-full group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
      />

      {/* GRADIENT OVERLAY (bottom) */}
      {/* <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" /> */}

      {/* TOP-LEFT BADGES */}
      {/* <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold text-white uppercase ${getProviderColor(
            game.provider || game.providerCode || "UNKNOWN"
          )}`}
        >
          {game.provider || game.providerCode}
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-black/60">
          {game.type}
        </span>
      </div> */}

      {/* MAINTENANCE MASK */}
      {game.status === "INACTIVE" && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <span className="text-white font-bold">MAINTENANCE</span>
        </div>
      )}
    </div>
  );
};

export default GameCard;
