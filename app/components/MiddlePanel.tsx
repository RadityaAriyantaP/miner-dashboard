"use client"
import { useState } from "react";
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

interface Keluarga {
  nama: string;
  hubungan: string;
}

interface Pendidikan {
  jenjang: string;
  tempat: string;
  tahun: string;
}

interface MiddlePanelProps {
  name: string;
  role: string;
  atrValue: number;
  atrColor: string;
  subAttributes: SubAttribute[];
  radarData: Attribute[];
  sap: SubAttribute[];
  hireDate: string;
  mcuStatus: 'Aktif' | 'Tidak Aktif';
  keluarga: Keluarga[];
  pendidikan: Pendidikan[];
}

type TabType = 'performance' | 'pendidikan' | 'keluarga';

// Helper function to calculate length of service
function calculateLengthOfService(hireDate: string): string {
  const hire = new Date(hireDate);
  const now = new Date();
  const years = now.getFullYear() - hire.getFullYear();
  const months = now.getMonth() - hire.getMonth();

  let yearsDiff = years;
  let monthsDiff = months;

  if (monthsDiff < 0) {
    yearsDiff -= 1;
    monthsDiff += 12;
  }

  if (yearsDiff > 0) {
    return `${yearsDiff} thn ${monthsDiff} bln`;
  } else {
    return `${monthsDiff} bln`;
  }
}

export function MiddlePanel({ name, role, atrValue, atrColor, subAttributes, radarData, sap, hireDate, mcuStatus, keluarga, pendidikan }: Readonly<MiddlePanelProps>) {
  const [activeTab, setActiveTab] = useState<TabType>('performance');
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
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400/60">Hire:</span>
              <span className="text-white/80">{new Date(hireDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              <span className="text-cyan-400/60">({calculateLengthOfService(hireDate)})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400/60">MCU:</span>
              <span className={`font-semibold ${mcuStatus === 'Aktif' ? 'text-green-400' : 'text-red-400'}`}>
                {mcuStatus}
              </span>
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

        {/* Tabs */}
        <div className="flex-1 flex flex-col">
          {/* Tab Buttons */}
          <div className="flex gap-2 mb-4 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'performance'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab('pendidikan')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'pendidikan'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Pendidikan
            </button>
            <button
              onClick={() => setActiveTab('keluarga')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'keluarga'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Keluarga
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'performance' && (
              <div className="flex gap-4 h-full">
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
                <div className="w-56">
                  <h3 className="text-sm text-cyan-300/70 uppercase tracking-wider mb-4">SAP</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sap.map((sub, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-lg bg-black/30 border border-white/10"
                      >
                        <div className="text-xs text-gray-400 mb-1 truncate">{sub.label}</div>
                        <div className="text-xl font-black text-white">{sub.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pendidikan' && (
              <div>
                <h3 className="text-sm text-cyan-300/70 uppercase tracking-wider mb-4">Riwayat Pendidikan</h3>
                <div className="space-y-3">
                  {pendidikan.map((edu, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-black/30 border border-white/10 hover:border-cyan-400/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-lg font-bold text-cyan-400 mb-1">{edu.jenjang}</div>
                          <div className="text-sm text-gray-300">{edu.tempat}</div>
                        </div>
                        <div className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                          {edu.tahun}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'keluarga' && (
              <div>
                <h3 className="text-sm text-cyan-300/70 uppercase tracking-wider mb-4">Data Keluarga</h3>
                <div className="space-y-3">
                  {keluarga.map((fam, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-black/30 border border-white/10 hover:border-cyan-400/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                          <span className="text-sm font-bold text-cyan-400">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-bold text-white">{fam.nama}</div>
                          <div className="text-xs text-gray-400 uppercase">{fam.hubungan}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
