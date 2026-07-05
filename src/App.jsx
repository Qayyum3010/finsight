import { Button } from '@/components/ui/button';
import { transactions } from '@/data/transactions';

export default function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center gap-4">
      <div className="bg-surface-container-lowest text-on-surface p-8 rounded-xl border border-outline-variant">
        <h1 className="text-primary text-3xl font-bold">FinSight Tokens Test</h1>
        <p className="text-on-surface-variant mt-2">
          Loaded {transactions.length} mock transactions.
        </p>
        <Button className="mt-4">shadcn Button</Button>
      </div>
    </div>
  );
}
