"use client";
import { useState } from "react";
import { BorderComponent } from "./OtherComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Manpower {
  id: string;
  name: string;
  role: string;
  nrp: string;
}

interface ManpowerListProps {
  manpowerList: Manpower[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ManpowerList({ manpowerList, selectedId, onSelect }: Readonly<ManpowerListProps>) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredManpowerList = manpowerList.filter((manpower) =>
    manpower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manpower.nrp.includes(searchQuery) ||
    manpower.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden h-full">
      <BorderComponent/>
      <h3 className="text-xl font-black text-cyan-400 mb-4 text-center uppercase tracking-widest relative z-10">
        Manpower
      </h3>

      {/* Search Input */}
      <div className="relative z-10 mb-4">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400/60"
          />
          <input
            type="text"
            placeholder="Search by name, NRP, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
          />
        </div>
        {searchQuery && (
          <div className="mt-1.5 text-xs text-cyan-400/60">
            {filteredManpowerList.length} {filteredManpowerList.length === 1 ? 'result' : 'results'} found
          </div>
        )}
      </div>

      <div className="space-y-2 relative z-10 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {filteredManpowerList.length > 0 ? (
          filteredManpowerList.map((manpower, index) => (
          <button
            key={manpower.id}
            onClick={() => onSelect(manpower.id)}
            className={`w-full p-3 rounded-lg border transition-all text-left flex items-center gap-3 ${
              selectedId === manpower.id
                ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/30'
            }`}
          >
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded flex items-center justify-center border border-cyan-400/30">
              <span className="text-xs font-bold text-cyan-400">{index + 1}</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">{manpower.nrp}</div>
              <div className="font-bold text-white">{manpower.name}</div>
              <div className="text-xs text-cyan-300/70 uppercase">{manpower.role}</div>
            </div>
          </button>
          ))
        ) : (
          <div className="text-center py-8 text-cyan-400/60 text-sm">
            No results found for {searchQuery}
          </div>
        )}
      </div>
    </div>
  );
}