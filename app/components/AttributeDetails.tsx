import { CircularProgress } from "./CircularProgress";

interface SubAttribute {
  label: string;
  value: number;
}

interface Attribute {
  name: string;
  value: number;
  color: string;
  subAttributes: SubAttribute[];
}

interface AttributeDetailsProps {
  attributes: Attribute[];
}

export function AttributeDetails({ attributes }: AttributeDetailsProps) {
  return (
    <div className="flex-1 bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-cyan-500/30 relative overflow-hidden">
      {/* Futuristic background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)',
          animation: 'scan 8s linear infinite'
        }}></div>
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-400/50"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyan-400/50"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-cyan-400/50"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-400/50"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-black text-cyan-400 mb-8 text-center uppercase tracking-widest">
          <span className="relative">
            Manpower Details
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </span>
        </h2>
        
        <div className="grid grid-cols-5 gap-6">
          {attributes.map((attr, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Category name */}
              <div className="text-sm text-cyan-300/80 mb-3 text-center uppercase tracking-wider font-bold">
                {attr.name}
              </div>
              
              {/* Circular progress with glow */}
              <div className="mb-4 relative">
                <div className="absolute inset-0 blur-xl opacity-50" style={{ backgroundColor: attr.color }}></div>
                <CircularProgress 
                  value={attr.value} 
                  color={attr.color}
                />
              </div>
              
              {/* Sub attributes */}
              <div className="w-full space-y-2">
                {attr.subAttributes.map((sub, subIndex) => (
                  <div 
                    key={subIndex} 
                    className="flex justify-between items-center text-xs p-2 rounded bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/30 transition-all"
                  >
                    <span className="text-gray-300">{sub.label}</span>
                    <span className="font-black text-white">{sub.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}