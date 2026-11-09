'use client';

import { useState } from 'react';

export default function Home() {
  const grid = [
    ['NN', 'NN', 'NN', 'SBR', 'CR', 'SB', 'SG', 'CGR', 'RC'],
    ['NN', 'NN', 'SPI', 'CY', 'CG', 'SY', 'SG', 'CGR', 'RC'],
    ['SGR', 'CG', 'SG', 'SB', 'CG', 'SY', 'SG', 'CGR', 'RC'],
    ['NN', 'SPI', 'SPU', 'CY', 'SR', 'SY', 'SG', 'CGR', 'RC'],
    ['NN', 'NN', 'NN', 'SBK', 'SR', 'CO', 'SG', 'CGR', 'RC'],
    ['NN', 'SY', 'CB', 'SPI', 'CY', 'SR', 'SG', 'CGR', 'RC'],
    ['NN', 'NN', 'NN', 'SY', 'CY', 'SB', 'SG', 'CGR', 'RC'],
  ];

  const [overrides, setOverrides] = useState<Record<string, string>>({});

  const handleOverride = (code: string, value: string) => {
    const letter = value.replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase();
    setOverrides((prev) => {
      const next = { ...prev };
      if (letter) {
        next[code] = letter;
      } else {
        delete next[code];
      }
      return next;
    });
  };

  const unique = [...new Set(grid.flat().filter(item => item !== 'NN'))];

  const colors: Record<string, string> = {
    R: '#da0d0d',
    G: '#22c55e',
    B: '#174fa8',
    Y: '#eab308',
    W: '#ffffff',
    O: '#f97316',
    PU: '#a855f7',
    PI: '#ec4899',
    BK: '#000000',
    BR: '#92400e',
    GR: '#6b7280',
    C: '#06b6d4',
  };

  const shapes: Record<string, string> = {
    S: 'rounded-none',
    C: 'rounded-full',
    R: 'rounded-xl',
  };

  function getShape(code: string) {
    if (code === 'NN') return null;

    const shape = code[0];
    const color = code.slice(1);

    return {
      shape: shapes[shape],
      color: colors[color],
    };
  }

  return (
    <main className="h-screen bg-[#0c0c0c] flex p-6 gap-6 overflow-hidden">
      {/* Left side: unique legend with its own scrollbar */}
      <div className="h-full w-64 flex flex-col flex-shrink-0 bg-[#141414] rounded-lg p-4 border border-gray-800">
        <h2 className="text-white font-bold text-sm mb-3 flex-shrink-0">Mapping</h2>
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2 custom-scrollbar">
          {unique.map((code) => {
            const cell = getShape(code);
            if (!cell) return null;
            return (
              <div key={code} className="flex items-center gap-3 flex-shrink-0">
                <div
                  className={`w-8 h-8 flex-shrink-0 ${cell.shape}`}
                  style={{ backgroundColor: cell.color }}
                />
                <input
                  type="text"
                  maxLength={1}
                  value={overrides[code] || ''}
                  onChange={(e) => handleOverride(code, e.target.value)}
                  className="w-10 h-8 text-center bg-white text-black rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-sm font-bold"
                />
                <span className="text-gray-400 text-xs font-mono">{code}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side: grid preview centered */}
      <div className="flex-1 h-full flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-9 gap-3">
          {grid.flatMap((row, rowIndex) =>
            row.map((code, colIndex) => {
              const cell = getShape(code);

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  {cell && (
                    <div
                      className={`w-full h-full ${cell.shape} flex items-center justify-center text-black text-sm font-bold`}
                      style={{ backgroundColor: cell.color }}
                    >
                      {overrides[code] || ''}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}