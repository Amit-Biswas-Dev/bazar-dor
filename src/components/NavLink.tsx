
import React from "react";
import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const defaultCategories: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

const NavLink = async () => {
  let categories: Category[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      {
        next: { revalidate: 3600 },
      }
    );

    if (res.ok) {
      const result = await res.json();

      if (Array.isArray(result.data)) {
        categories = result.data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  // Use all default categories if the API fails or returns no categories.
  if (categories.length === 0) {
    categories = defaultCategories;
  }

  return (
    <nav className="mt-5 border-y border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3">
        
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-base-content transition hover:bg-primary hover:text-primary-content"
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLink;
