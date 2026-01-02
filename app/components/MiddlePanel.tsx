"use client"
import { CircularProgress } from './CircularProgress';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { BorderComponent } from './OtherComponents';

interface SubAttribute {
  label: string;
  value: number;
}

interface Attribute {
  attribute: string;
  value: number;
}

interface MiddlePanelProps {
  name: string;
  role: string;
  atrValue: number;
  atrColor: string;
  subAttributes: SubAttribute[];
  radarData: Attribute[];
  sap: SubAttribute[]
}

export function MiddlePanel({ name, role, atrValue, atrColor, subAttributes, radarData, sap }: Readonly<MiddlePanelProps>) {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden h-full flex flex-col">
      <BorderComponent/>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)',
          animation: 'scan 8s linear infinite'
        }}></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header: Player Info */}
        <div className="mb-6">
          <h3 className="text-sm text-cyan-300/70 uppercase tracking-wider mb-2">Manpower Info</h3>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <div className="text-2xl font-black text-cyan-400">{name}</div>
              <div className="text-sm text-gray-400 uppercase">{role}</div>
            </div>
          </div>
        </div>

        {/* ATR Details */}
        <div className="mb-6">
          <div className="flex items-start gap-6">
            {/* Circular Progress */}
            <div className="items-center relative">
              <h3 className="text-sm text-cyan-300/70 uppercase tracking-wider mb-4 justify-self-center">ATR</h3>
              <div className="absolute inset-0 blur-xl opacity-40" style={{ backgroundColor: atrColor }}></div>
              <CircularProgress 
                value={atrValue} 
                color={atrColor}
                size={120}
              />
            </div>
            
            {/* Sub attributes in 2x2 grid */}
            <div className="flex-1 grid grid-cols-3 gap-3">
              {subAttributes.map((sub, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg bg-black/30 border border-white/10"
                >
                  <div className="text-xs text-gray-400 mb-1">{sub.label}</div>
                  <div className="text-2xl font-black text-white">{sub.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="flex-1 flex">
          <div className='flex-1'>
            <h3 className="text-sm text-cyan-300/70 uppercase tracking-wider mb-4">Performance Radar</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsRadarChart data={radarData}>
                  <PolarGrid stroke="#06b6d4" strokeOpacity={0.3} />
                  <PolarAngleAxis 
                    dataKey="attribute" 
                    tick={{ fill: '#67e8f9', fontSize: 11, fontWeight: 'bold' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#67e8f9', fontSize: 9 }}
                  />
                  <Radar 
                    name="Stats" 
                    dataKey="value" 
                    stroke="#06b6d4" 
                    fill="#06b6d4" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RechartsRadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-cyan-300/70 uppercase tracking-wider mb-4">SAP</h3>
            <div className="flex-1 grid grid-cols-3 gap-3">
              {sap.map((sub, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg bg-black/30 border border-white/10"
                >
                  <div className="text-xs text-gray-400 mb-1">{sub.label}</div>
                  <div className="text-2xl font-black text-white">{sub.value}</div>
                </div>
              ))}
            </div>
          </div>
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
