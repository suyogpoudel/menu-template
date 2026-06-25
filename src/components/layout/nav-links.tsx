"use client";

import { CATEGORIES } from "@/lib/temp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const renderDesktopLinks = () => {
    return CATEGORIES.map((cat) => {
      const link = `/categories/${cat.slug}`;
      const isActive = pathname === link;

      return (
        <Link
          key={cat.slug}
          href={link}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive && "text-primary",
          )}
        >
          {cat.name}
        </Link>
      );
    });
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8">
        {renderDesktopLinks()}
      </ul>

      {/* Mobile Menu Button */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="relative z-45 md:hidden"
        >
          <IconMenu2 className="size-5" />
        </Button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.8 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="fixed left-0 top-0 z-50 h-screen w-[85%] max-w-sm border-r bg-background shadow-2xl"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">
                  <h2 className="font-heading text-xl font-semibold">
                    Categories
                  </h2>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconX className="size-5" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    {CATEGORIES.map((cat) => {
                      const link = `/categories/${cat.slug}`;
                      const isActive = pathname === link;

                      return (
                        <li key={cat.slug}>
                          <Link
                            href={link}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block rounded-xl px-4 py-3 text-base font-medium transition-all",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "hover:bg-muted",
                            )}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavLinks;
