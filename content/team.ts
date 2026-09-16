export type Discipline = {
  id: string;
  name: string;
  /** What this team is responsible for, written as work rather than as a job title. */
  blurb: string;
  count?: number | null;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  discipline: string;
  /** /public/team/<id>.jpg — 3:4, 900×1200 minimum. */
  portrait?: string;
  note?: string;
  /** Editorial weight — drives cell size. Vary deliberately. */
  scale?: 'lg' | 'md' | 'sm';
  /** Show on the homepage selection. */
  featured?: boolean;
  needsContent?: boolean;
};

/**
 * These seven names came from the brief and have NOT been verified against
 * the current org chart. Confirm or rename, then set this flag to false.
 */
export const departmentsNeedConfirmation = true;

export const disciplines: Discipline[] = [
  { id: 'interface', name: 'Creative Interface', blurb: 'Product and interface design across every surface a merchant or shopper touches.', count: null },
  { id: 'experience', name: 'Technical Experience', blurb: 'The bridge between design intent and what the storefront can actually render.', count: null },
  { id: 'content', name: 'Content Artisan', blurb: 'Product writing, documentation and the words inside the apps.', count: null },
  { id: 'development', name: 'Technology Development', blurb: 'Application engineering, rendering pipelines and the systems merchants never see.', count: null },
  { id: 'facility', name: 'Essential Facility', blurb: 'Keeps the studio running so everyone else can concentrate on the work.', count: null },
  { id: 'operations', name: 'Operations Intelligence', blurb: 'Support, merchant onboarding and the reporting that tells us what to fix next.', count: null },
  { id: 'marketing', name: 'Marketing Engagement', blurb: 'How merchants find the apps, and what they understand before installing.', count: null },
];

const DEPTS = disciplines.map((d) => d.id);
const SCALES: Array<'lg' | 'md' | 'sm'> = ['md', 'sm', 'lg', 'sm', 'md', 'sm', 'lg', 'md'];

/* One verified person. 24 structured empties to reach the confirmed 25+.
   Paste real names, roles and portraits over these and delete the rest. */
export const people: Person[] = [
  {
    id: 'aowshad',
    name: 'Al Aowshad Himel',
    role: 'Product Designer',
    discipline: 'interface',
    note: 'Works across product design, UX and frontend prototyping.',
    scale: 'lg',
    featured: true,
  },
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `person-${i + 2}`,
    name: '[ADD NAME]',
    role: '[Role]',
    discipline: DEPTS[(i + 1) % DEPTS.length],
    scale: SCALES[i % SCALES.length],
    featured: i < 4,
    needsContent: true,
  })),
];
