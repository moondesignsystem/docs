"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Figma } from "lucide-react";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center gap-2 text-muted-foreground font-mono -mb-28 w-full",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// Icon-rendering helper
const getIcon = (subtype?: string) => {
  if (!subtype) return null;

  switch (subtype) {
    case "css":
      return <i className="devicon-css3-plain text-[17px] mr-[0.25rem]" />;
    case "react":
      return <i className="devicon-react-original text-[17px] mr-[0.25rem]" />;
    case "flutter":
      return <i className="devicon-flutter-plain text-[17px] mr-[0.25rem]" />;
    case "figma":
      return <Figma className="w-[1rem] h-[1rem] text-current mr-[0.25rem]" />;
    default:
      return null;
  }
};

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    subtype?: string;
  }
>(({ className, children, subtype, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      "inline-flex items-center justify-center whitespace-nowrap w-full px-3 py-4 text-sm font-medium transition-all rounded-md border-b-0",
      "bg-[var(--background-secondary)] text-[var(--text-primary)]",

      // Active state overrides
      "data-[state=active]:bg-[var(--background-brand)] data-[state=active]:text-[var(--text-on-brand)]",

      className
    )}
    {...props}
  >
    {getIcon(subtype)}
    {children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
