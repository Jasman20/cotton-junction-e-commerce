import React from "react";
import { GarmentType } from "@/types";

interface GarmentIllustrationProps {
  type: GarmentType;
  colorVariant?: string;
  className?: string;
}

const colorMap: Record<string, { primary: string; secondary: string; accent: string; bg: string }> = {
  emerald: { primary: "#1E3F35", secondary: "#2B5243", accent: "#F7C82D", bg: "#F3F7F5" },
  yellow: { primary: "#F7C82D", secondary: "#DCA712", accent: "#1E3F35", bg: "#FEF9E7" },
  terracotta: { primary: "#B05B35", secondary: "#984B29", accent: "#FAF8F5", bg: "#FAF4F0" },
  ivory: { primary: "#EAE5DB", secondary: "#C7BAA3", accent: "#1E3F35", bg: "#FAF8F5" },
  navy: { primary: "#1E2A38", secondary: "#2A3A4D", accent: "#F7C82D", bg: "#EFF3F6" },
  maroon: { primary: "#6B2028", secondary: "#822731", accent: "#F7C82D", bg: "#F9ECEE" },
  default: { primary: "#1E3F35", secondary: "#2B5243", accent: "#F7C82D", bg: "#F4F0E8" },
};

export const GarmentIllustration: React.FC<GarmentIllustrationProps> = ({
  type,
  colorVariant = "default",
  className = "w-full h-full",
}) => {
  const c = colorMap[colorVariant] || colorMap.default;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-linen-100 ${className}`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-4 transition-transform duration-300 hover:scale-105"
      >
        {/* Soft Background Plate */}
        <rect width="240" height="240" rx="16" fill={c.bg} />
        <circle cx="120" cy="120" r="88" fill="#FFFFFF" fillOpacity="0.5" />

        {type === "kurta" && (
          <g id="kurta">
            {/* Mandarin Collar */}
            <path d="M106 48 Q120 54 134 48 L136 58 Q120 64 104 58 Z" fill={c.accent} stroke={c.secondary} strokeWidth="1.5" />
            {/* Kurta Body */}
            <path
              d="M80 62 L106 48 L134 48 L160 62 L148 95 L140 90 L145 190 L95 190 L100 90 L92 95 Z"
              fill={c.primary}
              stroke={c.secondary}
              strokeWidth="2"
            />
            {/* Front Placket */}
            <rect x="117" y="58" width="6" height="54" rx="2" fill={c.accent} />
            <circle cx="120" cy="68" r="1.5" fill="#222" />
            <circle cx="120" cy="80" r="1.5" fill="#222" />
            <circle cx="120" cy="94" r="1.5" fill="#222" />
            {/* Side Slits & Hem */}
            <line x1="95" y1="150" x2="95" y2="190" stroke={c.accent} strokeWidth="2.5" />
            <line x1="145" y1="150" x2="145" y2="190" stroke={c.accent} strokeWidth="2.5" />
            <line x1="95" y1="188" x2="145" y2="188" stroke={c.accent} strokeWidth="2" strokeDasharray="3 2" />
          </g>
        )}

        {type === "shirt" && (
          <g id="shirt">
            {/* Shirt Collar */}
            <path d="M100 50 L120 68 L140 50 L130 45 L110 45 Z" fill={c.accent} stroke={c.secondary} strokeWidth="1.5" />
            {/* Shirt Body and Sleeves */}
            <path
              d="M82 66 L104 50 L136 50 L158 66 L146 100 L138 96 L140 182 L100 182 L102 96 L94 100 Z"
              fill={c.primary}
              stroke={c.secondary}
              strokeWidth="2"
            />
            {/* Chest Pocket */}
            <path d="M125 90 L136 90 L136 106 L130.5 110 L125 106 Z" fill="none" stroke={c.accent} strokeWidth="1.5" />
            {/* Buttons */}
            <line x1="120" y1="68" x2="120" y2="182" stroke={c.secondary} strokeWidth="1" />
            <circle cx="120" cy="84" r="1.5" fill={c.accent} />
            <circle cx="120" cy="108" r="1.5" fill={c.accent} />
            <circle cx="120" cy="132" r="1.5" fill={c.accent} />
            <circle cx="120" cy="156" r="1.5" fill={c.accent} />
          </g>
        )}

        {type === "saree" && (
          <g id="saree">
            {/* Blouse */}
            <path d="M96 52 L120 64 L144 52 L150 78 L90 78 Z" fill={c.secondary} stroke={c.primary} strokeWidth="2" />
            {/* Saree Pleats Body */}
            <path d="M88 84 L152 84 L160 192 L80 192 Z" fill={c.primary} stroke={c.secondary} strokeWidth="2" />
            {/* Zari Gold Border Hem */}
            <rect x="80" y="180" width="80" height="12" fill={c.accent} />
            {/* Diagonal Pallu Drape */}
            <path d="M88 84 L144 52 L156 68 L104 150 Z" fill={c.accent} fillOpacity="0.85" stroke={c.secondary} strokeWidth="1.5" />
            <line x1="112" y1="84" x2="112" y2="180" stroke={c.accent} strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="128" y1="84" x2="128" y2="180" stroke={c.accent} strokeWidth="1.5" strokeDasharray="4 2" />
          </g>
        )}

        {type === "anarkali" && (
          <g id="anarkali">
            {/* Fitted Yoke */}
            <path d="M98 48 L120 60 L142 48 L152 72 L138 96 L102 96 L88 72 Z" fill={c.secondary} stroke={c.primary} strokeWidth="2" />
            {/* Flared Kalidar Gown Body */}
            <path d="M102 96 L138 96 L168 194 L72 194 Z" fill={c.primary} stroke={c.secondary} strokeWidth="2" />
            {/* Kali lines */}
            <line x1="110" y1="96" x2="94" y2="194" stroke={c.accent} strokeWidth="1.5" />
            <line x1="120" y1="96" x2="120" y2="194" stroke={c.accent} strokeWidth="1.5" />
            <line x1="130" y1="96" x2="146" y2="194" stroke={c.accent} strokeWidth="1.5" />
            {/* Gold Gota Border */}
            <rect x="72" y="186" width="96" height="8" rx="2" fill={c.accent} />
          </g>
        )}

        {type === "frock" && (
          <g id="frock">
            {/* Kids Round Neck Bodice */}
            <path d="M102 54 Q120 62 138 54 L148 76 L92 76 Z" fill={c.secondary} stroke={c.primary} strokeWidth="2" />
            {/* Bow / Ribbon Accent */}
            <circle cx="120" cy="76" r="4" fill={c.accent} />
            <path d="M112 76 Q106 72 110 80 Z" fill={c.accent} />
            <path d="M128 76 Q134 72 130 80 Z" fill={c.accent} />
            {/* Frilly Skirt Body */}
            <path d="M92 78 L148 78 L164 176 L76 176 Z" fill={c.primary} stroke={c.secondary} strokeWidth="2" />
            {/* Scalloped Hem */}
            <path
              d="M76 176 Q87 184 98 176 Q109 184 120 176 Q131 184 142 176 Q153 184 164 176"
              fill={c.accent}
              stroke={c.secondary}
              strokeWidth="2"
            />
          </g>
        )}

        {type === "dhoti-kurta" && (
          <g id="dhoti-kurta">
            {/* Short Festive Kurta */}
            <path d="M84 56 L108 46 L132 46 L156 56 L144 86 L138 84 L140 134 L100 134 L102 84 L96 86 Z" fill={c.primary} stroke={c.secondary} strokeWidth="2" />
            <line x1="120" y1="52" x2="120" y2="88" stroke={c.accent} strokeWidth="2" />
            {/* Draped Dhoti / Pyjama */}
            <path d="M102 134 L138 134 L144 194 L123 194 L120 156 L117 194 L96 194 Z" fill="#FFFFFF" stroke={c.secondary} strokeWidth="2" />
            {/* Dhoti Pleat Accent */}
            <line x1="120" y1="134" x2="120" y2="156" stroke={c.accent} strokeWidth="2" />
          </g>
        )}

        {type === "lehenga" && (
          <g id="lehenga">
            {/* Choli Top */}
            <path d="M98 48 L142 48 L146 76 L94 76 Z" fill={c.secondary} stroke={c.primary} strokeWidth="2" />
            {/* Waistline Gap */}
            {/* Flared Lehenga Skirt */}
            <path d="M100 86 L140 86 L174 196 L66 196 Z" fill={c.primary} stroke={c.secondary} strokeWidth="2" />
            {/* Broad Embellished Border */}
            <rect x="66" y="180" width="108" height="16" fill={c.accent} />
            <line x1="120" y1="86" x2="120" y2="180" stroke={c.accent} strokeWidth="1.5" strokeDasharray="4 2" />
          </g>
        )}

        {/* Small Cotton Boll Watermark Motif */}
        <g opacity="0.3" transform="translate(190, 190) scale(0.6)">
          <circle cx="12" cy="12" r="10" fill={c.primary} />
          <path d="M12 2 C16 8 20 12 20 16" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      </svg>
      {/* Sample Image Badge */}
      <span className="absolute bottom-2 left-2 z-10 rounded-full bg-charcoal-900/80 px-2.5 py-0.5 text-[11px] font-medium text-linen-50 backdrop-blur-sm">
        Sample garment visual
      </span>
    </div>
  );
};
