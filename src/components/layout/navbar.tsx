import Link from "next/link";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import NavLinks from "./nav-links";

const Navbar = () => {
  return (
    <nav className="w-full flex flex-col bg-card px-4 md:px-8 py-3 md:py-4 border-b gap-6 md:gap-4 sticky top-0 z-50">
      <div className="w-full flex justify-between items-center">
        <Link
          href="/"
          className="text-primary text-xl md:text-2xl hover:opacity-80 transition-all duration-200 font-bold tracking-tight"
        >
          Meetho
        </Link>
        <h1 className="text-muted-foreground font-medium text-sm md:text-base bg-muted px-3 py-1 rounded-full">
          Menu
        </h1>
      </div>

      <Separator className="hidden md:block" />

      <div className="w-full flex justify-between items-center gap-3">
        <NavLinks />

        <div className="w-full md:w-64 flex gap-2 items-center">
          <Input
            placeholder="Search delicious food..."
            className="w-full h-9 rounded-xl md:rounded-lg"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
