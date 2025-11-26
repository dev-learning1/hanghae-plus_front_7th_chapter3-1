import { AppHeader } from "@/components/layout/AppHeader";
import { ManagementPage } from "@/pages/ManagementPage";

export const App = () => {
  return (
    <div className="min-h-screen bg-muted/40">
      <AppHeader />
      <main className="px-4 py-8 sm:px-6">
        <ManagementPage />
      </main>
    </div>
  );
};
