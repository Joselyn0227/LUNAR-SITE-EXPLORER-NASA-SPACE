export type SiteKind = "site" | "coordinate";
export type SiteStatus = "excellent" | "good" | "review";

export interface LunarSite {
  id: string;
  name: string;
  coordinates: string;
  kind: SiteKind;
  status: SiteStatus;
  mapPosition: { x: number; y: number };
  sunlight: number;
  temperature: string;
  signal: number;
  communicationDelay: string;
  scores: { energy: number; communications: number; stability: number; accessibility: number };
}

export const mockSites: LunarSite[] = [
  {
    id: "shackleton",
    name: "Shackleton Crater",
    coordinates: "89.9° S · 0.0° E",
    kind: "site",
    status: "excellent",
    mapPosition: { x: 52, y: 82 },
    sunlight: 78,
    temperature: "-120°C / 20°C",
    signal: 96,
    communicationDelay: "2.4 min",
    scores: { energy: 95, communications: 90, stability: 89, accessibility: 88 },
  },
  {
    id: "zuman",
    name: "Zumán Crater",
    coordinates: "84.5° S · 3.2° E",
    kind: "site",
    status: "good",
    mapPosition: { x: 34, y: 44 },
    sunlight: 71,
    temperature: "-132°C / 16°C",
    signal: 88,
    communicationDelay: "2.8 min",
    scores: { energy: 84, communications: 82, stability: 79, accessibility: 76 },
  },
  {
    id: "haworth",
    name: "Haworth",
    coordinates: "86.1° S · 3.7° E",
    kind: "site",
    status: "review",
    mapPosition: { x: 77, y: 46 },
    sunlight: 64,
    temperature: "-145°C / 12°C",
    signal: 82,
    communicationDelay: "3.1 min",
    scores: { energy: 76, communications: 79, stability: 72, accessibility: 68 },
  },
  {
    id: "cabeus",
    name: "Cabeus",
    coordinates: "85.3° S · 2.2° E",
    kind: "coordinate",
    status: "review",
    mapPosition: { x: 26, y: 56 },
    sunlight: 59,
    temperature: "-158°C / 8°C",
    signal: 75,
    communicationDelay: "3.6 min",
    scores: { energy: 70, communications: 74, stability: 78, accessibility: 66 },
  },
  {
    id: "gerlache",
    name: "de Gerlache",
    coordinates: "83.5° S · 12.4° E",
    kind: "coordinate",
    status: "good",
    mapPosition: { x: 68, y: 30 },
    sunlight: 73,
    temperature: "-126°C / 18°C",
    signal: 86,
    communicationDelay: "2.9 min",
    scores: { energy: 86, communications: 81, stability: 83, accessibility: 77 },
  },
];