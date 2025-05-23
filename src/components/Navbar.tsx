
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function Navbar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Handle initial page section
    const handleScroll = () => {
      const sections = items.map(item => ({ 
        id: item.name, 
        element: document.querySelector(item.url) 
      }));
      
      let currentActiveSection = items[0].name;
      
      sections.forEach(section => {
        if (!section.element) return;
        
        const rect = section.element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          currentActiveSection = section.id;
        }
      });
      
      setActiveTab(currentActiveSection);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 border border-black/10 py-1 px-1 rounded-full shadow-lg bg-white backdrop-blur-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.name);
                document.querySelector(item.url)?.scrollIntoView({
                  behavior: "smooth"
                });
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-black hover:text-[#FFD700]",
                isActive && "bg-black/5 text-[#FFD700]",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[#FFD700]/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FFD700] rounded-t-full">
                    <div className="absolute w-12 h-6 bg-[#FFD700]/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#FFD700]/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#FFD700]/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
