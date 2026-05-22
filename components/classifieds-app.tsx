"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FormEvent, ReactNode } from "react";
import type { Category, Listing } from "@/data/classifieds";

type ViewMode = "detailed" | "simple" | "no-images";

type ClassifiedsAppProps = {
  categories: Category[];
  cities: string[];
  initialListings: Listing[];
  popularSearches: string[];
};

type DraftListing = {
  title: string;
  category: string;
  city: string;
  description: string;
};

const navItems = [
  "See all",
  "Classes",
  "Community",
  "Events",
  "For Sale",
  "Industrial",
  "Jobs",
  "Personals",
  "Real Estate",
  "Services",
  "Vehicles",
];

const radiusOptions = ["+0 mi", "+5 mi", "+10 mi", "+20 mi", "+40 mi", "+100 mi"];

const lastViewed = [
  ["Handyman Chicago", "Home Services"],
  ["Website Design Austin", "Web Services"],
  ["Office Cleaning Dallas", "Cleaning Services"],
];

export function ClassifiedsApp({
  categories,
  cities,
  initialListings,
  popularSearches,
}: ClassifiedsAppProps) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("United States");
  const [activeCategory, setActiveCategory] = useState("All categories");
  const [radius, setRadius] = useState("+0 mi");
  const [viewMode, setViewMode] = useState<ViewMode>("detailed");
  const [imagesOnly, setImagesOnly] = useState(false);
  const [searchAlert, setSearchAlert] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [total, setTotal] = useState(initialListings.length);
  const [notice, setNotice] = useState("Fresh listings from the services board");
  const [draft, setDraft] = useState<DraftListing>({
    title: "",
    category: "Home Services",
    city: "New York",
    description: "",
  });

  const categoryTotal = useMemo(
    () => categories.reduce((sum, category) => sum + category.count, 0),
    [categories],
  );

  const allCategories = useMemo(
    () => [{ name: "All categories", count: categoryTotal }, ...categories],
    [categories, categoryTotal],
  );

  const fetchListings = useCallback(async () => {
    const params = new URLSearchParams({
      query,
      city: selectedCity,
      category: activeCategory,
      imagesOnly: String(imagesOnly),
    });

    setIsLoading(true);

    try {
      const response = await fetch(`/api/listings?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Listing request failed");
      }

      const data = (await response.json()) as {
        total: number;
        results: Listing[];
        generatedAt: string;
      };

      setListings(data.results);
      setTotal(data.total);
      setNotice(`Updated ${new Date(data.generatedAt).toLocaleTimeString()}`);
    } catch {
      setNotice("Live filtering is temporarily unavailable");
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, imagesOnly, query, selectedCity]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      void fetchListings();
    }, 180);

    return () => window.clearTimeout(handle);
  }, [fetchListings]);

  useEffect(() => {
    async function loadSaved() {
      try {
        const response = await fetch("/api/saved");
        const data = (await response.json()) as { ids: string[] };
        setSavedIds(new Set(data.ids));
      } catch {
        setSavedIds(new Set());
      }
    }

    void loadSaved();
  }, []);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await fetchListings();
  }

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      setNotice("Please complete all ad fields before posting");
      return;
    }

    const data = (await response.json()) as { listing: Listing };
    setListings((current) => [data.listing, ...current]);
    setTotal((current) => current + 1);
    setNotice("Your service ad was added to the board");
    setIsPostOpen(false);
    setDraft({
      title: "",
      category: "Home Services",
      city: "New York",
      description: "",
    });
  }

  async function toggleSaved(listingId: string) {
    const nextSaved = !savedIds.has(listingId);
    setSavedIds((current) => {
      const next = new Set(current);

      if (nextSaved) {
        next.add(listingId);
      } else {
        next.delete(listingId);
      }

      return next;
    });

    try {
      await fetch("/api/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: listingId, saved: nextSaved }),
      });
    } catch {
      setNotice("Saved ads will sync again when the server responds");
    }
  }

  function applyPopularSearch(search: string) {
    setQuery(search);
    setNotice(`Searching services for ${search}`);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="topbar">
          <div className="topbar-inner">
            <a href="#help">Help Center</a>
            <button className="topbar-post" type="button">
              <Icon name="plus" />
              Post free ad
            </button>
            <button className="link-button" type="button">
              Login
            </button>
          </div>
        </div>

        <div className="brandbar">
          <a className="brand" href="#" aria-label="Locanto services clone home">
            <span className="brand-mark">L</span>
            <span className="brand-copy">
              <strong>locanto</strong>
              <span>Free Classifieds United States</span>
            </span>
          </a>

          <button className="location-button" type="button">
            <Icon name="map" />
            United States
          </button>

          <button
            aria-expanded={isMobileNavOpen}
            aria-label="Toggle categories"
            className="mobile-menu-button"
            type="button"
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            <Icon name={isMobileNavOpen ? "x" : "menu"} />
          </button>
        </div>

        <nav className="nav-strip" aria-label="Primary categories">
          <div className="nav-inner">
            {navItems.map((item) => (
              <a
                className={`nav-item ${item === "Services" ? "is-active" : ""}`}
                href="#results"
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div
          className={`mobile-nav-panel ${isMobileNavOpen ? "is-open" : ""}`}
          aria-label="Mobile categories"
        >
          {navItems.map((item) => (
            <a
              className={`nav-item ${item === "Services" ? "is-active" : ""}`}
              href="#results"
              key={item}
              onClick={() => setIsMobileNavOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </header>

      <main className="page-shell">
        <section className="search-area" aria-labelledby="page-title">
          <div className="breadcrumbs">
            <a href="#">Home</a>
            <span>/</span>
            <a href="#">Services</a>
          </div>

          <div className="page-title-row">
            <div>
              <h1 className="page-title" id="page-title">
                Services United States
              </h1>
              <p className="result-count">{formatNumber(categoryTotal)} Results</p>
            </div>
            <button className="secondary-button" type="button">
              <Icon name="sliders" />
              Adjust your search
            </button>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <label className="field">
              <span className="field-label">I am looking for</span>
              <span className="input-shell">
                <Icon name="search" />
                <input
                  placeholder="Search services, company names, or cities"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </span>
            </label>

            <label className="field">
              <span className="field-label">Location</span>
              <span className="input-shell">
                <Icon name="map" />
                <select
                  value={selectedCity}
                  onChange={(event) => setSelectedCity(event.target.value)}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <button className="search-button" type="submit">
              <Icon name="search" />
              Go
            </button>
          </form>

          <div className="radius-row" aria-label="Radius options">
            {radiusOptions.map((option) => (
              <button
                className={radius === option ? "is-selected" : ""}
                key={option}
                type="button"
                onClick={() => setRadius(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="popular-row">
            <span className="popular-label">Popular:</span>
            {popularSearches.map((search) => (
              <button
                className="chip-button"
                key={search}
                type="button"
                onClick={() => applyPopularSearch(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </section>

        <div className="content-grid">
          <aside className="left-rail" aria-label="Service filters">
            <RailPanel icon="grid" title="Categories">
              <div className="rail-list">
                {allCategories.map((category) => (
                  <button
                    className={`rail-link ${
                      activeCategory === category.name ? "is-active" : ""
                    }`}
                    key={category.name}
                    type="button"
                    onClick={() => setActiveCategory(category.name)}
                  >
                    <span>{category.name}</span>
                    <span>{formatNumber(category.count)}</span>
                  </button>
                ))}
              </div>
            </RailPanel>

            <RailPanel icon="map" title="Choose location">
              <div className="rail-list compact">
                {cities.slice(1, 13).map((city) => (
                  <button
                    className={`rail-link ${selectedCity === city ? "is-active" : ""}`}
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                  >
                    <span>{city}</span>
                    <span>view</span>
                  </button>
                ))}
              </div>
            </RailPanel>
          </aside>

          <section className="results-column" id="results" aria-live="polite">
            <div className="tool-strip">
              <div className="tool-left">
                <button className="category-button" type="button">
                  <Icon name="grid" />
                  Categories
                </button>
                <button
                  className={`secondary-button ${searchAlert ? "is-active" : ""}`}
                  type="button"
                  onClick={() => setSearchAlert((active) => !active)}
                >
                  <Icon name={searchAlert ? "check" : "bell"} />
                  {searchAlert ? "Alert set" : "Set search alert"}
                </button>
                <button
                  className={`secondary-button ${imagesOnly ? "is-active" : ""}`}
                  type="button"
                  onClick={() => setImagesOnly((active) => !active)}
                >
                  <Icon name="image" />
                  Images
                </button>
              </div>

              <div className="tool-right">
                <div className="segments" role="tablist" aria-label="View mode">
                  {(["simple", "no-images", "detailed"] as ViewMode[]).map((mode) => (
                    <button
                      aria-selected={viewMode === mode}
                      className={`segment-button ${
                        viewMode === mode ? "is-active" : ""
                      }`}
                      key={mode}
                      role="tab"
                      type="button"
                      onClick={() => setViewMode(mode)}
                    >
                      <Icon
                        name={
                          mode === "detailed"
                            ? "list"
                            : mode === "no-images"
                              ? "eye-off"
                              : "lines"
                        }
                      />
                      {mode === "no-images" ? "No images" : titleCase(mode)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="post-panel">
              <div className="offer-row">
                <div className="offer-copy">
                  <strong>Offer a service?</strong>
                  <span>Publish a local services ad with a title, category, and city.</span>
                </div>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setIsPostOpen((open) => !open)}
                >
                  <Icon name={isPostOpen ? "x" : "plus"} />
                  {isPostOpen ? "Close" : "Post free ad"}
                </button>
              </div>

              {isPostOpen ? (
                <form className="post-form" onSubmit={handlePost}>
                  <label className="field">
                    <span className="field-label">Title</span>
                    <input
                      required
                      placeholder="Enter your title"
                      value={draft.title}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label className="field">
                    <span className="field-label">Category</span>
                    <select
                      value={draft.category}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          category: event.target.value,
                        }))
                      }
                    >
                      {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="field">
                    <span className="field-label">City</span>
                    <select
                      value={draft.city}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          city: event.target.value,
                        }))
                      }
                    >
                      {cities.slice(1).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="field field-full">
                    <span className="field-label">Description</span>
                    <textarea
                      required
                      placeholder="Describe the service, availability, and contact preference"
                      value={draft.description}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <button className="primary-button" type="submit">
                    <Icon name="check" />
                    Publish service
                  </button>
                </form>
              ) : null}
            </div>

            <div className="result-summary">
              <span>
                <strong>{formatNumber(total)}</strong> Results in Services
                {selectedCity === "United States" ? " United States" : ` ${selectedCity}`}
              </span>
              <span>{notice}</span>
            </div>

            <div className="listing-list">
              {isLoading ? (
                <>
                  <ListingSkeleton />
                  <ListingSkeleton />
                  <ListingSkeleton />
                </>
              ) : listings.length > 0 ? (
                listings.map((listing) => (
                  <ListingCard
                    isSaved={savedIds.has(listing.id)}
                    key={listing.id}
                    listing={listing}
                    viewMode={viewMode}
                    onToggleSaved={toggleSaved}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <Icon name="search" />
                  <strong>No matching services found</strong>
                  <p>
                    Try a broader category, a nearby city, or clear the search text
                    to return to all service ads.
                  </p>
                </div>
              )}
            </div>

            <div className="pagination" aria-label="Pagination">
              <button type="button" aria-label="Previous page">
                <Icon name="chevron-left" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  className={page === 1 ? "is-current" : ""}
                  key={page}
                  type="button"
                >
                  {page}
                </button>
              ))}
              <button type="button">...</button>
              <button type="button">20</button>
              <button type="button" aria-label="Next page">
                <Icon name="chevron-right" />
              </button>
            </div>

            <InfoSection />
          </section>

          <aside className="right-rail" aria-label="Extra panels">
            <RailPanel icon="clock" title="Last viewed">
              <div className="mini-list">
                {lastViewed.map(([name, category]) => (
                  <div className="mini-item" key={name}>
                    <strong>{name}</strong>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </RailPanel>

            <div className="premium-band">
              <Icon name="star" />
              <strong>Premium Account badge</strong>
              <p>Highlight ads with premium labels, trust signals, and more visibility.</p>
              <button className="secondary-button" type="button">
                Upgrade now
              </button>
            </div>

            <RailPanel icon="shield" title="Safety tips">
              <ul className="safety-list">
                <li>Meet in public places for local services when possible.</li>
                <li>Review provider details before sending deposits.</li>
                <li>Keep messages inside the platform until trust is clear.</li>
              </ul>
            </RailPanel>
          </aside>
        </div>
      </main>

      <footer className="footer" id="help">
        <div className="footer-inner">
          <div>
            <h2>Locanto services clone</h2>
            <p>
              A Next.js classifieds interface with searchable listings, category
              filters, saved ads, and a Node.js API layer for demo data.
            </p>
          </div>
          <div>
            <h3>Information</h3>
            <div className="footer-links">
              <a href="#">About Us</a>
              <a href="#">Terms of Use</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Safety Tips</a>
            </div>
          </div>
          <div>
            <h3>Features</h3>
            <div className="footer-links">
              <a href="#">Promote your ad</a>
              <a href="#">Premium Account</a>
              <a href="#">International</a>
              <a href="#">Partner with us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ListingCard({
  listing,
  viewMode,
  isSaved,
  onToggleSaved,
}: {
  listing: Listing;
  viewMode: ViewMode;
  isSaved: boolean;
  onToggleSaved: (listingId: string) => void;
}) {
  const hideImage = viewMode === "no-images";

  return (
    <article
      className={`listing-card ${viewMode === "simple" ? "is-simple" : ""} ${
        hideImage ? "no-image" : ""
      }`}
    >
      {!hideImage ? (
        <a className="listing-media" href="#">
          <Image
            alt=""
            className="listing-photo"
            height={316}
            loading="lazy"
            sizes="(max-width: 580px) 100vw, 176px"
            src={listing.images[0]}
            width={352}
          />
          <span className="photo-count">
            <Icon name="image" />
            {listing.photoCount}
          </span>
        </a>
      ) : null}

      <div className="listing-body">
        <div className="listing-top">
          <div>
            <div className="badge-row">
              {listing.premium ? <span className="badge badge-premium">Premium</span> : null}
              {listing.verified ? <span className="badge badge-verified">Verified</span> : null}
              {listing.tag ? <span className="badge badge-new">{listing.tag}</span> : null}
            </div>
            <a className="listing-title" href="#">
              {listing.title}
            </a>
          </div>

          <button
            aria-label={isSaved ? "Remove from favorites" : "Favorite this ad"}
            className={`save-button ${isSaved ? "is-saved" : ""}`}
            title={isSaved ? "Remove from favorites" : "Favorite this ad"}
            type="button"
            onClick={() => onToggleSaved(listing.id)}
          >
            <Icon name={isSaved ? "heart-filled" : "heart"} />
          </button>
        </div>

        <p className="listing-description">{listing.description}</p>

        <div className="meta-row">
          <a href="#">{listing.category}</a>
          <span className="meta-dot" />
          <span>
            {listing.city}
            {listing.state ? `, ${listing.state}` : ""}
          </span>
          <span className="meta-dot" />
          <span>{listing.posted}</span>
        </div>
      </div>
    </article>
  );
}

function ListingSkeleton() {
  return (
    <article className="listing-card skeleton" aria-label="Loading listing">
      <div className="listing-media" />
      <div className="listing-body" />
    </article>
  );
}

function RailPanel({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: IconName;
  title: string;
}) {
  return (
    <div className="rail-panel">
      <div className="rail-header">
        <Icon name={icon} />
        {title}
      </div>
      {children}
    </div>
  );
}

function InfoSection() {
  return (
    <section className="info-section">
      <h2>Services in the United States</h2>
      <p>
        Browse local providers for home repairs, cleaning, business support,
        beauty, real estate, technology, and other everyday needs. The search and
        category controls are built to mirror a practical classifieds workflow:
        scan quickly, filter down, save useful ads, and post a service.
      </p>
      <h3>Posting a stronger service ad</h3>
      <ul>
        <li>Use a direct title that explains the service and city.</li>
        <li>Add concrete details such as coverage area, availability, and pricing style.</li>
        <li>Include photos or portfolio examples when the work is visual.</li>
        <li>Keep contact expectations clear so customers know what happens next.</li>
      </ul>
    </section>
  );
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

type IconName =
  | "bell"
  | "check"
  | "chevron-left"
  | "chevron-right"
  | "clock"
  | "eye-off"
  | "grid"
  | "heart"
  | "heart-filled"
  | "image"
  | "lines"
  | "list"
  | "map"
  | "menu"
  | "plus"
  | "search"
  | "shield"
  | "sliders"
  | "star"
  | "x";

function Icon({ name }: { name: IconName }) {
  const common = {
    className: "icon",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
  };

  if (name === "heart-filled") {
    return (
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 21s-7.5-4.7-9.6-9.1C.8 8.4 2.7 4.5 6.4 4.1c2-.2 3.7.8 4.6 2.3.9-1.5 2.6-2.5 4.6-2.3 3.7.4 5.6 4.3 4 7.8C19.5 16.3 12 21 12 21Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden="true">
      {name === "search" ? (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.6-3.6" />
        </>
      ) : null}
      {name === "map" ? (
        <>
          <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      ) : null}
      {name === "plus" ? (
        <>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </>
      ) : null}
      {name === "menu" ? (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      ) : null}
      {name === "x" ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : null}
      {name === "grid" ? (
        <>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </>
      ) : null}
      {name === "bell" ? (
        <>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </>
      ) : null}
      {name === "check" ? <path d="m5 12 4 4L19 6" /> : null}
      {name === "image" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10" r="1.5" />
          <path d="m21 15-5-5L5 19" />
        </>
      ) : null}
      {name === "sliders" ? (
        <>
          <path d="M4 6h8" />
          <path d="M16 6h4" />
          <path d="M4 12h4" />
          <path d="M12 12h8" />
          <path d="M4 18h10" />
          <path d="M18 18h2" />
          <circle cx="14" cy="6" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="16" cy="18" r="2" />
        </>
      ) : null}
      {name === "list" ? (
        <>
          <path d="M8 6h12" />
          <path d="M8 12h12" />
          <path d="M8 18h12" />
          <path d="M4 6h.01" />
          <path d="M4 12h.01" />
          <path d="M4 18h.01" />
        </>
      ) : null}
      {name === "lines" ? (
        <>
          <path d="M5 7h14" />
          <path d="M5 12h14" />
          <path d="M5 17h10" />
        </>
      ) : null}
      {name === "eye-off" ? (
        <>
          <path d="m3 3 18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 4.2A9.5 9.5 0 0 1 12 4c5 0 8.4 4.4 9.5 6-.5.8-1.5 2-2.8 3.2" />
          <path d="M6.1 6.7C4.4 7.8 3.2 9.3 2.5 10c1.1 1.6 4.5 6 9.5 6 1.1 0 2.1-.2 3-.6" />
        </>
      ) : null}
      {name === "heart" ? (
        <path d="M12 21s-7.5-4.7-9.6-9.1C.8 8.4 2.7 4.5 6.4 4.1c2-.2 3.7.8 4.6 2.3.9-1.5 2.6-2.5 4.6-2.3 3.7.4 5.6 4.3 4 7.8C19.5 16.3 12 21 12 21Z" />
      ) : null}
      {name === "chevron-left" ? <path d="m15 18-6-6 6-6" /> : null}
      {name === "chevron-right" ? <path d="m9 18 6-6-6-6" /> : null}
      {name === "clock" ? (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      ) : null}
      {name === "star" ? (
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
      ) : null}
      {name === "shield" ? (
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      ) : null}
    </svg>
  );
}
