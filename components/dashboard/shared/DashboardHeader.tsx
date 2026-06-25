"use client";

import { Bell, Search, HelpCircle } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-red-600 transition">
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <button className="relative p-2 text-gray-600 hover:text-red-600 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
              CL
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Clinica Example</div>
              <div className="text-xs text-gray-500">Piano Premium</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}