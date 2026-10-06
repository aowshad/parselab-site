export type Discipline = {
  id: string;
  name: string;
  /** What this team is responsible for, written as work rather than as a job title. */
  blurb: string;
  count?: number | null;
  /** /public/team/<id>.webp — 4:3 team-at-work photo shown in the organisation section. */
  image?: string;
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

/** Real titles, confirmed against the org chart. */
export const departmentsNeedConfirmation = false;

export const disciplines: Discipline[] = [
  { id: 'leadership', name: 'Leadership', blurb: 'Sets the direction and is responsible for what we ship.', count: null, image: '/team/leadership.webp' },
  { id: 'interface', name: 'Creative Interface', blurb: 'Designs every screen that merchants and shoppers use.', count: null },
  { id: 'experience', name: 'Technical Experience', blurb: 'Turns designs into working storefront experiences.', count: null },
  { id: 'content', name: 'Content Artisan', blurb: 'Writes the words in our apps, plus help articles and docs.', count: null },
  { id: 'development', name: 'Technology Development', blurb: 'Builds the apps and the systems behind them.', count: null },
  { id: 'facility', name: 'Essential Facility', blurb: 'Keeps the studio running so others can focus on their work.', count: null },
  { id: 'operations', name: 'Operations Intelligence', blurb: 'Handles support, merchant onboarding and reports on what to fix next.', count: null },
  { id: 'marketing', name: 'Marketing Engagement', blurb: 'Helps merchants find our apps and understand them before installing.', count: null },
];

/* The full studio — 17 confirmed people. Portraits arrive later; scale is
   set deliberately per person so the Teams grid stays editorial. */
export const people: Person[] = [
  { id: 'pran-krishna-paul', name: 'Pran Krishna Paul', role: 'Founder & CEO', discipline: 'leadership', scale: 'lg' },
  { id: 'al-aowshad-himel', name: 'Al Aowshad Himel', role: 'Product Designer', discipline: 'interface', scale: 'lg' },
  { id: 'md-habibur-rahman', name: 'Md. Habibur Rahman', role: 'Lead, Technical Experience', discipline: 'experience', scale: 'md' },
  { id: 'abdul-ohab', name: 'Abdul Ohab', role: 'Senior Technology Development Engineer', discipline: 'development', scale: 'sm' },
  { id: 'novel-chakma', name: 'Novel Chakma', role: 'Technical Experience Engineer', discipline: 'experience', scale: 'md' },
  { id: 'shuvo-banerjee', name: 'Shuvo Banerjee', role: 'Digital Marketing Executive', discipline: 'marketing', scale: 'sm' },
  { id: 'nowshin-afroj-anha', name: 'Nowshin Afroj Anha', role: 'Writer, Content Artisan', discipline: 'content', scale: 'md' },
  { id: 'shazzad-hossain', name: 'Shazzad Hossain', role: 'Associate, Technology Development Engineer', discipline: 'development', scale: 'sm' },
  { id: 'shawon-bala-nath', name: 'Shawon Bala Nath', role: 'Writer, Content Artisan', discipline: 'content', scale: 'sm' },
  { id: 'rafiqul-islam-sakib', name: 'Rafiqul Islam Sakib', role: 'Technical Experience Engineer', discipline: 'experience', scale: 'md' },
  { id: 'nabila-akter', name: 'Nabila Akter', role: 'Associate, Technical Experience Engineer', discipline: 'experience', scale: 'sm' },
  { id: 'ami-hasan', name: 'Ami Hasan', role: 'Technology Development Engineer', discipline: 'development', scale: 'md' },
  { id: 'md-al-ashikul-bari-apon', name: 'MD Al Ashikul Bari Apon', role: 'Technical Experience Engineer', discipline: 'experience', scale: 'sm' },
  { id: 'maisha-musarrat-nabila', name: 'Maisha Musarrat Nabila', role: 'Associate, Technical Experience Engineer', discipline: 'experience', scale: 'sm' },
  { id: 'partha-pratim-paul', name: 'Partha Pratim Paul', role: 'Executive, Human Resource & Admin', discipline: 'facility', scale: 'md' },
  { id: 'swapan-paul', name: 'Swapan Paul', role: 'Facilities Coordinator', discipline: 'facility', scale: 'sm' },
  { id: 'md-ali-al-alvy', name: 'Md. Ali - Al - Alvy', role: 'Designer, Social Media', discipline: 'marketing', scale: 'md' },
];
