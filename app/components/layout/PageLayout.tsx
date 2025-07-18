// app/components/core/layout/PageLayout.tsx
import React from "react";
import { Card } from "~/components/ui/card";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
}) => (
  <div className="ml-64 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      {children}
    </div>
  </div>
);
