import { useEffect, useState } from "react";

export type InboxReview = {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  status: "new" | "replied" | "resolved";
  reply?: string;
};

const KEYS = {
  shop: "reputron-shop",
  city: "reputron-city",
  googleLink: "reputron-google-link",
  ownerEmail: "reputron-owner-email",
  ownerPhone: "reputron-owner-phone",
  inbox: "reputron-inbox",
};

function useStored(key: string, initial: string) {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    try {
      const s = window.localStorage.getItem(key);
      if (s !== null) setVal(s);
    } catch {
      /* ignore */
    }
  }, [key]);
  const set = (v: string) => {
    setVal(v);
    try {
      window.localStorage.setItem(key, v);
    } catch {
      /* ignore */
    }
  };
  return [val, set] as const;
}

export function useBusinessProfile() {
  const [shop, setShop] = useStored(KEYS.shop, "Apex Auto Spa");
  const [city, setCity] = useStored(KEYS.city, "Austin, TX");
  const [googleLink, setGoogleLink] = useStored(KEYS.googleLink, "");
  const [ownerEmail, setOwnerEmail] = useStored(KEYS.ownerEmail, "");
  const [ownerPhone, setOwnerPhone] = useStored(KEYS.ownerPhone, "");
  const displayName = shop.trim() || "Apex Auto Spa";
  const displayCity = city.trim() || "Austin, TX";
  const reviewUrl =
    googleLink.trim() || "https://www.google.com/maps";
  return {
    shop,
    setShop,
    city,
    setCity,
    googleLink,
    setGoogleLink,
    ownerEmail,
    setOwnerEmail,
    ownerPhone,
    setOwnerPhone,
    displayName,
    displayCity,
    reviewUrl,
  };
}

const SEED: InboxReview[] = [
  {
    id: "seed-1",
    name: "Michael R.",
    rating: 5,
    text: "Just got full front PPF done on my Corvette. Incredible work and attention to detail!",
    service: "Full Front PPF",
    date: "This week",
    status: "new",
  },
  {
    id: "seed-2",
    name: "Sarah L.",
    rating: 5,
    text: "Ceramic coating on my Range Rover looks like glass. The team explained everything clearly.",
    service: "Ceramic Coating",
    date: "This week",
    status: "replied",
    reply:
      "Thank you, Sarah! We're glad the coating exceeded expectations. Enjoy that glass-like shine!",
  },
  {
    id: "seed-3",
    name: "Private Client",
    rating: 2,
    text: "Found a missed spot on the rear bumper and had to wait 40 extra minutes at pickup.",
    service: "Full Detail",
    date: "Yesterday",
    status: "new",
  },
  {
    id: "seed-4",
    name: "David K.",
    rating: 4,
    text: "Great tint job, scheduling took a day longer than expected but quality is solid.",
    service: "Window Tint",
    date: "Last week",
    status: "resolved",
  },
];

export function loadInbox(): InboxReview[] {
  try {
    const raw = window.localStorage.getItem(KEYS.inbox);
    if (raw) return JSON.parse(raw) as InboxReview[];
  } catch {
    /* ignore */
  }
  return SEED;
}

export function saveInbox(items: InboxReview[]) {
  try {
    window.localStorage.setItem(KEYS.inbox, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function buildAiReply(opts: {
  name: string;
  service: string;
  shop: string;
  city: string;
}): string {
  const { name, service, shop, city } = opts;
  const first = name.split(" ")[0] || "there";
  return (
    `Thank you so much, ${first}, for trusting ${shop} with your ${service}! ` +
    `We're thrilled you're happy with the results. As ${city}'s top-rated shop for ` +
    `auto detailing, ceramic coating, and paint protection film, we treat every vehicle ` +
    `like our own — meticulous prep, premium products, and a final inspection before handover. ` +
    `Your ${service} is now protected and looking its best here in ${city}. ` +
    `Thanks again for choosing ${shop} — we truly appreciate your support!`
  );
}

export function buildShareLink(shop: string, city: string): string {
  if (typeof window === "undefined") return "/";
  const base = window.location.origin;
  const q = `?shop=${encodeURIComponent(shop)}&city=${encodeURIComponent(city)}`;
  return `${base}/${q}`;
}

export function buildSmsText(opts: {
  shop: string;
  service: string;
  link: string;
}): string {
  return (
    `Hi! Your ${opts.service} at ${opts.shop} is complete. ` +
    `How was your experience today? Tap to rate us (30 seconds): ${opts.link}`
  );
}
