"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/preview/ui/card";
import { useState } from "react";

export function NotificationPreferences() {
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [newMessages, setNewMessages] = useState(false);
  const [newPosts, setNewPosts] = useState(false);

  const toggles = [
    {
      label: "System notifications",
      enabled: systemNotifications,
      onChange: setSystemNotifications,
    },
    {
      label: "New messages",
      enabled: newMessages,
      onChange: setNewMessages,
    },
    {
      label: "New posts",
      enabled: newPosts,
      onChange: setNewPosts,
    },
  ];

  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardHeader className="px-4 py-4 pb-0">
        <CardTitle className="text-[#1c2024] text-lg font-semibold">
          Notification preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-4 pt-6 space-y-6">
        {toggles.map((toggle, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-[#1c2024]">{toggle.label}</span>
            <button
              onClick={() => toggle.onChange(!toggle.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5b5bd6] focus:ring-offset-2 ${
                toggle.enabled ? "bg-[#5b5bd6]" : "bg-[#e0e1e6]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  toggle.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
