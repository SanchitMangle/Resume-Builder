import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import ResumePreview from "./ResumePreview";
import { Button } from "./ui/button";

const LivePreview = ({ data }) => {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Live Preview</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom((v) => Math.max(70, v - 10))}>
            <Minus className="size-3" />
          </Button>
          <span className="w-12 text-center text-xs text-slate-600">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={() => setZoom((v) => Math.min(130, v + 10))}>
            <Plus className="size-3" />
          </Button>
        </div>
      </div>
      <div className="overflow-auto rounded-xl bg-slate-100 p-3">
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}>
          <ResumePreview data={data} template={data.template} accentColor={data.accent_color} />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
