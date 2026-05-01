import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion as Motion } from "framer-motion";

const EditorSection = ({ value, title, children }) => {
  return (
    <Accordion.Item value={value} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800">
          {title}
          <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content asChild>
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="px-4 pb-4">
          {children}
        </Motion.div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export const EditorSectionGroup = ({ children, defaultValue }) => {
  return (
    <Accordion.Root type="single" collapsible defaultValue={defaultValue} className="space-y-3">
      {children}
    </Accordion.Root>
  );
};

export default EditorSection;
