// Bentuk data ini nanti jadi tabel di Supabase.

export type Project = {
  title: string;
  type: string;
  description: string;
  image: string;
  tags: string[];
  // Link prototype Figma; kosong untuk project tanpa link publik.
  link?: string;
};

export type Job = {
  role: string;
  org: string;
  date: string;
  description: string;
  // Warna khas bab ini di section Journey (nomor bab dan cahaya di belakang roll film).
  tone?: string;
  photos: { src: string; ratio: number }[];
};

export type Certificate = {
  title: string;
  org: string;
  date: string;
  image: string;
};

export type Tool = {
  category: string;
  name: string;
  note: string;
};

export type RollPhoto = {
  src: string;
  org: "ahm" | "humic" | "smartvest";
  position: string;
};

export type Profile = {
  name: string;
  statement: string;
  statementHighlights: string[];
  email: string;
  socials: { label: string; href: string }[];
};
