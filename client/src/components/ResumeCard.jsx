import React from "react";
import { FilePenLineIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { Tooltip } from "./ui/tooltip";

const ResumeCard = ({ resume, color, onOpen, onDelete, onRename }) => {
  return (
    <Motion.button
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={onOpen}
      className="relative flex h-48 w-full flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center shadow-sm"
      style={{ background: `linear-gradient(135deg,${color}10, ${color}38)`, borderColor: `${color}44` }}
    >
      <FilePenLineIcon className="size-8" style={{ color }} />
      <p className="line-clamp-2 text-sm font-medium" style={{ color }}>
        {resume.title}
      </p>
      <p className="absolute bottom-2 text-[11px] text-slate-500">Updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
      <div className="absolute right-2 top-2 flex items-center gap-1">
        <Tooltip content="Rename">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onRename();
            }}
            className="rounded-md p-1.5 text-slate-700 hover:bg-white/70"
          >
            <PencilIcon className="size-4" />
          </span>
        </Tooltip>
        <Tooltip content="Delete">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded-md p-1.5 text-slate-700 hover:bg-white/70"
          >
            <Trash2Icon className="size-4" />
          </span>
        </Tooltip>
      </div>
    </Motion.button>
  );
};

export default ResumeCard;
