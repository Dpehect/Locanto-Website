export type Category = {
  name: string;
  count: number;
};

export type Listing = {
  id: string;
  title: string;
  category: string;
  city: string;
  state?: string;
  description: string;
  images: string[];
  photoCount: number;
  posted: string;
  premium?: boolean;
  verified?: boolean;
  tag?: string;
};

export const categories: Category[] = [
  { name: "Automotive Services", count: 2110 },
  { name: "Cleaning Services", count: 3698 },
  { name: "Computer & Tech Help", count: 1390 },
  { name: "Construction Services", count: 2814 },
  { name: "Creative & Design Services", count: 1178 },
  { name: "Digital Marketing Services", count: 4516 },
  { name: "Event Services", count: 806 },
  { name: "Health & Beauty Services", count: 1634 },
  { name: "Home Services", count: 5982 },
  { name: "Insurance & Financial Services", count: 2034 },
  { name: "Lawn & Garden Services", count: 1480 },
  { name: "Legal Services", count: 958 },
  { name: "Moving & Storage Services", count: 1261 },
  { name: "Office Services", count: 720 },
  { name: "Pet Services", count: 641 },
  { name: "Photo Services", count: 514 },
  { name: "Real Estate Services", count: 1785 },
  { name: "Translation Services", count: 350 },
  { name: "Travel Services", count: 919 },
  { name: "Tutoring & Learning Centers", count: 1123 },
  { name: "Vehicle Rentals", count: 338 },
  { name: "Web Services", count: 2568 },
  { name: "Other Services", count: 1467 },
];

export const cities = [
  "United States",
  "Atlanta",
  "Austin",
  "Boston",
  "Charlotte",
  "Chicago",
  "Dallas",
  "Denver",
  "Detroit",
  "El Paso",
  "Houston",
  "Las Vegas",
  "Los Angeles",
  "Miami",
  "New York",
  "Phoenix",
  "Pittsburgh",
  "Sacramento",
  "San Antonio",
  "San Diego",
  "San Francisco",
  "Seattle",
  "Tampa",
];

export const popularSearches = [
  "Maid Service",
  "Spas",
  "Travel",
  "Funds",
  "Heating Services",
  "Modeller",
  "Furniture Transport",
  "Website Design",
  "Marketing agency",
  "Dog Trainers",
];

export const listings: Listing[] = [
  {
    id: "torque360-new-york",
    title: "Torque360 auto repair shop management software, New York",
    category: "Automotive Services",
    city: "New York",
    state: "NY",
    description:
      "Cloud workflow software for auto repair shops, mobile mechanics, and specialty service providers. Track repair orders, invoices, appointments, and customer messages in one workspace built for busy teams.",
    images: [
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 2,
    posted: "Today",
    premium: true,
    verified: true,
    tag: "Business",
  },
  {
    id: "mesa-sales-irvine",
    title: "Bi-lingual automotive sales associate, Irvine",
    category: "Automotive Services",
    city: "Santa Ana",
    state: "CA",
    description:
      "Friendly sales support for a luxury imports showroom. Ideal for Spanish and English speakers who enjoy customer care, vehicle presentation, and a no-pressure dealership environment.",
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 3,
    posted: "Today",
    tag: "Hiring",
  },
  {
    id: "hw-excavation-phoenix",
    title: "Dry utility installs, excavation, pool pads and trenching, Phoenix",
    category: "Construction Services",
    city: "Glendale",
    state: "AZ",
    description:
      "Experienced excavation crew offering dry utility work, septic preparation, wall footers, grading, and site cleanup. Local team with transparent estimates and reliable scheduling.",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 2,
    posted: "Yesterday",
    verified: true,
  },
  {
    id: "earn-between-shifts",
    title: "Study less, stack more, earn between shifts",
    category: "Digital Marketing Services",
    city: "Boynton Beach",
    state: "FL",
    description:
      "A guided online promotion setup for students and part-time workers who want a flexible side income path. Includes onboarding calls, templates, and weekly progress support.",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 1,
    posted: "Yesterday",
    premium: true,
  },
  {
    id: "andys-handyman-chicago",
    title: "Andy's Handyman Service, Chicago",
    category: "Home Services",
    city: "Chicago",
    state: "IL",
    description:
      "Insured family-owned handyman company for faucet repairs, doors, drywall, trim, shelving, light remodels, and home maintenance. Twenty years of local service experience.",
    images: [
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 13,
    posted: "2 days ago",
    verified: true,
  },
  {
    id: "airstream-cleaning-dallas",
    title: "Air duct and chimney cleaning for safer homes, Dallas",
    category: "Cleaning Services",
    city: "Dallas",
    state: "TX",
    description:
      "Dryer vent cleaning, chimney sweeping, duct inspection, and indoor air service for homes and small businesses. Same-week appointments available across the metro area.",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 1,
    posted: "2 days ago",
    tag: "Local",
  },
  {
    id: "beth-realtor-charleston",
    title: "Luxury real estate guidance for Charleston buyers",
    category: "Real Estate Services",
    city: "Charleston",
    state: "SC",
    description:
      "A dedicated real estate advisor for Mount Pleasant, Summerville, Isle of Palms, and surrounding communities. Property search support, pricing strategy, and listing preparation.",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 1,
    posted: "3 days ago",
    verified: true,
  },
  {
    id: "tax-strategy-limassol",
    title: "International tax strategy and cross-border structuring",
    category: "Insurance & Financial Services",
    city: "Santa Fe",
    state: "NM",
    description:
      "Advisory for founders and business owners evaluating international tax planning, relocation requirements, entity setup, and compliant operating structures.",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 2,
    posted: "3 days ago",
    premium: true,
  },
  {
    id: "tutoring-brookline",
    title: "Personal tutoring and learning center sessions, Brookline",
    category: "Tutoring & Learning Centers",
    city: "Boston",
    state: "MA",
    description:
      "One-on-one tutoring for middle school, high school, and early college students. Math, reading, essay planning, test prep, and study routines tailored to each learner.",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 4,
    posted: "4 days ago",
    verified: true,
  },
  {
    id: "haven-web-atlanta",
    title: "Haven Media Solutions web design, Atlanta",
    category: "Web Services",
    city: "Atlanta",
    state: "GA",
    description:
      "Responsive websites, landing pages, SEO foundations, analytics setup, and refresh projects for local businesses that need clear pages and fast launch timelines.",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 1,
    posted: "4 days ago",
    premium: true,
    verified: true,
  },
  {
    id: "pet-care-denver",
    title: "Dog walking and drop-in pet care, Denver",
    category: "Pet Services",
    city: "Denver",
    state: "CO",
    description:
      "Daily walks, weekend visits, feeding, playtime, and medication reminders for dogs and cats. Photo updates after each visit and flexible neighborhood scheduling.",
    images: [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 6,
    posted: "5 days ago",
    tag: "Popular",
  },
  {
    id: "moving-los-angeles",
    title: "Moving crew, packing help and short-haul transport",
    category: "Moving & Storage Services",
    city: "Los Angeles",
    state: "CA",
    description:
      "Apartment moves, office moves, loading assistance, packing materials, and storage runs. Two-person and three-person crews available with clear hourly pricing.",
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=760&q=80",
    ],
    photoCount: 5,
    posted: "1 week ago",
  },
];
