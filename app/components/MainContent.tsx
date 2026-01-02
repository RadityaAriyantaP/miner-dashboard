"use client"
import { useState } from "react";
import { ManpowerList } from "./ManpowerList";
import { MiddlePanel } from "./MiddlePanel";
import ModelViewer from "./ModelCanvas";
import clsx from "clsx";
import { BorderComponent } from "./OtherComponents";

const manpowerDatabase = {
  'miner-1': {
    id: 'miner-1',
    name: "Raditya Ariyanta P",
    role: "Software Engineer",
    nrp: "25003724",
    trainingSafety:{
      simper: "2025-12-12",
      permit: "2026-4-4",
      violationYtd: 0,
      trainingCompletion: 4
    },
    sap: [
      { label: "Inspection", value: 84 },
      { label: "Observation", value: 86 },
      { label: "KTA", value: 82 },
      { label: "TTA", value: 88 },
      { label: "Coaching", value: 5 },
      { label: "Safety Meeting", value: 88 },
      { label: "Critical Work", value: 88 },
      { label: "Wake Up Call", value: 88 },
      
    ],
    atr: {
      value: 85,
      color: "#10b981",
      subAttributes: [
        { label: "Hadir", value: 21 },
        { label: "Off", value: 4 },
        { label: "Sakit", value: 2 },
        { label: "Izin", value: 4 },
        { label: "Alpha", value: 0 },
        { label: "Lembur", value: 121 },
      ]
    },
    attributes: [
      { attribute: "Task", value: 85 },
      { attribute: "P2H", value: 78 },
      { attribute: "HM", value: 91 },
      { attribute: "Fuel", value: 73 },
      { attribute: "Productivity", value: 88 }
    ]
  },
  'miner-2': {
    id: 'miner-2',
    name: "Rizki Ramadhan",
    nrp: "25003724",
    role: "Group Leader",
    trainingSafety:{
      simper: "2025-12-12",
      permit: "2026-4-4",
      violationYtd: 0,
      trainingCompletion: 4
    },
    sap: [],
    atr: {
      value: 92,
      color: "#10b981",
      subAttributes: [
        { label: "Hadir", value: 21 },
        { label: "Off", value: 4 },
        { label: "Sakit", value: 2 },
        { label: "Izin", value: 4 },
        { label: "Alpha", value: 0 },
        { label: "Lembur", value: 121 },
      ]
    },
    attributes: [
      { attribute: "ATR", value: 92 },
      { attribute: "P2H", value: 85 },
      { attribute: "HM", value: 80 },
      { attribute: "Fuel", value: 68 },
      { attribute: "Productivity", value: 94 }
    ]
  },
  'miner-3': {
    id: 'miner-3',
    name: "Adrian Fathur",
    nrp: "25003723",
    role: "Software Engineer",
    trainingSafety:{
      simper: "2025-12-12",
      permit: "2026-4-4",
      violationYtd: 0,
      trainingCompletion: 4
    },
    sap: [],
    atr: {
      value: 88,
      color: "#10b981",
      subAttributes: [
        { label: "Hadir", value: 21 },
        { label: "Off", value: 4 },
        { label: "Sakit", value: 2 },
        { label: "Izin", value: 4 },
        { label: "Alpha", value: 0 },
        { label: "Lembur", value: 121 },
      ]
    },
    attributes: [
      { attribute: "Task", value: 88 },
      { attribute: "P2H", value: 90 },
      { attribute: "HM", value: 86 },
      { attribute: "Fuel", value: 82 },
      { attribute: "Productivity", value: 79 }
    ]
  }
};

function isExpired (expiredAt: string) {
  return new Date(expiredAt).getTime() < Date.now();
};

export default function ManpowerContent() {
  const [selectedManpowerId, setSelectedManpowerId] = useState<string>('miner-1');
  const manpowerList = Object.values(manpowerDatabase).map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    nrp: m.nrp
  }));

  const selectedManpower = manpowerDatabase[selectedManpowerId as keyof typeof manpowerDatabase];
  const simperExpired = isExpired(selectedManpower.trainingSafety.simper);
  const permitExpired = isExpired(selectedManpower.trainingSafety.permit);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-[300px_1fr_300px] gap-6 h-full">
          {/* Left: Manpower List */}
          <ManpowerList 
            manpowerList={manpowerList}
            selectedId={selectedManpowerId}
            onSelect={setSelectedManpowerId}
          />

          {/* Middle: Details and Radar Chart */}
          <MiddlePanel
            name={selectedManpower.name}
            role={selectedManpower.role}
            atrValue={selectedManpower.atr.value}
            atrColor={selectedManpower.atr.color}
            subAttributes={selectedManpower.atr.subAttributes}
            radarData={selectedManpower.attributes}
            sap={selectedManpower.sap}
          />

          {/* Right: Manpower Image */}
          <div className="flex flex-col gap-8">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 relative overflow-hidden items-center justify-center">
                <BorderComponent/>
               <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-widest text-cyan-400">
                  SAFETY & TRAINING
                </h3>
              </div>
              <Item
                label="Training Completion"
                value={`${selectedManpower.trainingSafety.trainingCompletion}`}
                status={selectedManpower.trainingSafety.trainingCompletion >= 4 ? "success" : "warning"}
              />

              <Item
                label="Violation YTD"
                value={selectedManpower.trainingSafety.violationYtd}
                status={selectedManpower.trainingSafety.violationYtd === 0 ? "success" : "danger"}
              />

              <Item
                label="Permit"
                value={`${permitExpired ? "Expired" : "Active"} • ${selectedManpower.trainingSafety.permit}`}
              />

              <Item
                label="Simper"
                value={`${simperExpired ? "Expired" : "Active"} • ${selectedManpower.trainingSafety.simper}`}
              />
            </div>
            <div className="h-[500px] bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 relative overflow-hidden flex items-center justify-center">
              <BorderComponent/>
              <ModelViewer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({
  label,
  value,
  status,
}: Readonly<{
  label: string;
  value: React.ReactNode;
  status?: "success" | "warning" | "danger";
}>) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>

      <span
        className={clsx(
          "flex items-center gap-2 font-semibold",
          status === "success" && "text-emerald-400",
          status === "warning" && "text-yellow-400",
          status === "danger" && "text-red-400",
          !status && "text-gray-200"
        )}
      >
        {value}
        {status && (
          <span
            className={clsx(
              "h-2 w-2 rounded-full",
              status === "success" && "bg-emerald-400",
              status === "warning" && "bg-yellow-400",
              status === "danger" && "bg-red-400"
            )}
          />
        )}
      </span>
    </div>
  );
}