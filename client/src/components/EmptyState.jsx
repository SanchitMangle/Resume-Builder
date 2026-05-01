import React from "react";
import { FileText } from "lucide-react";
import { Button } from "./ui/button";

const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
        <FileText className="size-5" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      {actionLabel ? (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
