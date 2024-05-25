"use client";

import { Plus } from "lucide-react";

import ActionTooltip from "@/components/action-tooltip";

export const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip label="Add a server" align="center" side="right">
        <button className="group flex items-center">
          <div className="flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className=" group-hover:text-white transition-all text-emerald-500"
              size={24}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
