import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center gap-4">
      <div className="bg-surface-container-lowest text-on-surface p-8 rounded-xl border border-outline-variant">
        <h1 className="text-primary text-3xl font-bold">
          FinSight Tokens Test
        </h1>
        <p className="text-on-surface-variant mt-2">
          Custom tokens still working alongside shadcn.
        </p>
        <Button className="mt-4">shadcn Button</Button>
      </div>
    </div>
  );
}
