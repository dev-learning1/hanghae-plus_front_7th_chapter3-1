import { Button } from "@/components/ui/button";

export const AppHeader = () => {
  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Hanghae Plus
          </p>
          <h1 className="text-base font-semibold text-foreground">콘텐츠 관리 스튜디오</h1>
        </div>
        <Button variant="ghost" size="sm">
          도움말
        </Button>
      </div>
    </header>
  );
};

