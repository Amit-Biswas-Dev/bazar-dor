
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import UserInfo from "./UserInfo";
import Marquee from "./Marquee";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-5">
          <Link
            href="/"
            aria-label="বাজার দর - হোম পেজ"
            className="flex min-w-0 items-center gap-3 rounded-lg transition-opacity hover:opacity-80"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-50">
              <Image
                src="/logo-icon.png"
                alt="Bazar Dor logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
                priority
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                বাজার <span className="text-green-600">দর</span>
              </h1>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                {date}
              </p>
            </div>
          </Link>

          <div className="shrink-0">
            <UserInfo />
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-xl border border-green-100">
          <Marquee />
        </div>

        <NavLink />
      </div>
    </header>
  );
};

export default Header;
