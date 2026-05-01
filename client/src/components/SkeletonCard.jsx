import React from "react";

const SkeletonCard = ({ className = "" }) => {
  return <div className={`animate-pulse rounded-lg bg-gray-200/80 ${className}`} />;
};

export default SkeletonCard;
