"use client";

import { Building2, Users, Zap, BarChart3, ChevronRight } from "lucide-react";
import { useModal } from "@/app/context/ModalContext";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  action: "findPeople" | "findCompanies" | "link";
  href?: string;
}

const quickActions: QuickAction[] = [
  {
    id: "find-companies",
    title: "Find Companies",
    description: "Search and filter from 50M+ companies",
    icon: Building2,
    gradient: "from-blue-500 to-blue-600",
    action: "findCompanies",
  },
  {
    id: "find-people",
    title: "Find People",
    description: "Discover contacts with rich enrichment",
    icon: Users,
    gradient: "from-violet-500 to-violet-600",
    action: "findPeople",
  },
  {
    id: "run-playbook",
    title: "Run Playbook",
    description: "Automate your GTM workflows",
    icon: Zap,
    gradient: "from-emerald-500 to-emerald-600",
    action: "link",
    href: "/playbooks",
  },
  {
    id: "view-analytics",
    title: "View Analytics",
    description: "Credits usage and performance",
    icon: BarChart3,
    gradient: "from-amber-500 to-orange-500",
    action: "link",
    href: "/analytics",
  },
];

export function QuickActionsSection() {
  const { openFindPeople, openFindCompanies } = useModal();

  const handleAction = (action: QuickAction) => {
    if (action.action === "findPeople") {
      openFindPeople();
    } else if (action.action === "findCompanies") {
      openFindCompanies();
    } else if (action.href) {
      window.location.href = action.href;
    }
  };

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              id={`quick-action-${action.id}`}
              type="button"
              onClick={() => handleAction(action)}
              className="group relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 flex flex-col gap-3 text-left"
            >
              <div
                className={`h-9 w-9 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-sm`}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">
                  {action.title}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                  {action.description}
                </p>
              </div>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
