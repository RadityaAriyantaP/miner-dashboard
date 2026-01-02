import { BorderComponent } from "./OtherComponents";

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
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden h-full">
      <BorderComponent/>
      <h3 className="text-xl font-black text-cyan-400 mb-6 text-center uppercase tracking-widest relative z-10">
        Manpower
      </h3>

      <div className="space-y-2 relative z-10 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {manpowerList.map((manpower, index) => (
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
        ))}
      </div>
    </div>
  );
}