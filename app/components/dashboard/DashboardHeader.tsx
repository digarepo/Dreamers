// app/components/dashboard/DashboardHeader.tsx
export function DashboardHeader() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <div className="h-8 w-8 rounded-full bg-muted"></div>
        </div>
      </div>
    </header>
  );
}
