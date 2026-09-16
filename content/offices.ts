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
  email: string | null;
  phone: string | null;
  /** Free text, e.g. 'Mon–Sat · 10:00 – 19:00' */
  hours: string | null;
  /** True once every field above is confirmed. */
  complete?: boolean;
};

/* Three confirmed locations. Dhaka is complete; the other two carry
   placeholders until supplied — no invented street addresses. */

/** The head office, used by the footer. */
export const headOfficeId = 'bd';
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
    address: 'House 514, Road 7, Avenue 4, Mirpur DOHS, Dhaka 1216',
    email: 'info@parselab.com',
    phone: '+1 936 657 1639', // NOTE: US country code on the Bangladesh office — confirm
    hours: 'Mon–Sat · 10:00 – 19:00', // PLACEHOLDER hours — replace with the real ones
    complete: true,
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
    email: null,
    phone: null,
    hours: null,
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
    email: null,
    phone: null,
    hours: null,
  },
];
