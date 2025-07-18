// app/routes/index.tsx
import DashboardIndex from "~/routes/_index"; // Adjust the import based on your folder structure
import { DashboardLayout } from "~/components/layout/DashboardLayout";

export default function Index() {
  return (
    <DashboardLayout>
      <DashboardIndex />
    </DashboardLayout>
  );
}
