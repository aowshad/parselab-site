export type Office = {
  id: string;
  code: string;      // BD · US · UAE
  country: string;
  city: string | null;       // null = not yet confirmed
  lat: number;
  lng: number;
  /** true when lat/lng is a country centroid rather than a real office location */
  approximate?: boolean;
  utc: string;
  timeZone: string;  // IANA
  role: string;      // what this office does
  address: string | null;
  phone: string | null;
};

/* Three confirmed locations. Cities and addresses are placeholders
   until supplied — no invented street addresses. */
export const offices: Office[] = [
  {
    id: 'bd',
    code: 'BD',
    country: 'Bangladesh',
    city: 'Dhaka',
    lat: 23.8103,
    lng: 90.4125,
    utc: 'UTC+6',
    timeZone: 'Asia/Dhaka',
    role: 'Product, design, engineering and support. Most of the studio is here.',
    address: null,
    phone: null,
  },
  {
    id: 'us',
    code: 'US',
    country: 'United States',
    city: null,
    lat: 39.8,
    lng: -98.6,
    approximate: true,
    utc: 'UTC−5',
    timeZone: 'America/Chicago',
    role: 'Closest to merchants in our largest market.',
    address: null,
    phone: null,
  },
  {
    id: 'ae',
    code: 'UAE',
    country: 'United Arab Emirates',
    city: 'Dubai',
    lat: 25.2048,
    lng: 55.2708,
    utc: 'UTC+4',
    timeZone: 'Asia/Dubai',
    role: 'Partnerships and regional merchant relationships.',
    address: null,
    phone: null,
  },
];
