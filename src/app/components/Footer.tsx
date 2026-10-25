import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-base-content/80">
          <span className="font-bold text-primary">বাজার দর</span>
          {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-sm text-base-content/60">
          © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;