import { ClassifiedsApp } from "@/components/classifieds-app";
import {
  categories,
  cities,
  listings,
  popularSearches,
} from "@/data/classifieds";

export default function Home() {
  return (
    <ClassifiedsApp
      categories={categories}
      cities={cities}
      initialListings={listings}
      popularSearches={popularSearches}
    />
  );
}
