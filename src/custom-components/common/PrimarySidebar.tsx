import React from "react";
import { useState } from "react";
import {
  Calendar,
  Users,
  LayoutDashboard,
  CreditCard,
  Box,
  Settings as SettingsIcon,
  ChevronLeft,
  Ear,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink } from "react-router-dom";

// If your project does not yet include these shadcn components,
// run: npx shadcn@latest add button tooltip scroll-area

const navItems = [
  { label: "Appointments", icon: Calendar },
  { label: "Patients", icon: Users, active: true },
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Billing", icon: CreditCard },
  { label: "Inventory", icon: Box },
  { label: "Settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider>
      <aside
        className={[
          "h-screen border-r bg-white flex flex-col",
          collapsed ? "w-20" : "w-72",
          "transition-[width] duration-300 ease-in-out",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 p-4">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-sm">
            <Ear className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xl font-semibold leading-5">Eljay</span>
              <span className="text-xs text-muted-foreground -mt-0.5">
                Hearing Care Management
              </span>
            </div>
          )}
        </div>

        {/* Nav */}
        <ScrollArea className="px-3">
          <nav className="flex flex-col gap-1 pb-2">
            {navItems.map(({ label, icon: Icon, active }) => (
              <Tooltip key={label} delayDuration={collapsed ? 150 : 700}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={`/dashboard/${label.toLowerCase()}`}
                    // variant={active ? "secondary" : "ghost"}
                    className={[
                      "flex items-end justify-start gap-3 w-full",
                      "h-12 px-3",
                      active ? "bg-muted" : "",
                      collapsed ? "px-0 mx-auto w-12" : "",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                    {!collapsed && <span className="text-[14px]">{label}</span>}
                  </NavLink>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
              </Tooltip>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer: Collapse */}
        <div className="mt-auto p-3">
          <Button
            variant="ghost"
            className={[
              "w-full justify-start gap-3 h-11",
              collapsed ? "px-0 mx-auto w-12" : "",
              "text-muted-foreground",
            ].join(" ")}
            onClick={() => setCollapsed((c) => !c)}
          >
            <ChevronLeft className={[
              "h-5 w-5 transition-transform",
              collapsed ? "rotate-180" : "",
            ].join(" ")} />
            {!collapsed && <span>Collapse</span>}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}