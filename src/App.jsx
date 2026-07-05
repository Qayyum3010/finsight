export default function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-surface-container-lowest text-on-surface p-8 rounded-xl border border-outline-variant">
        <h1 className="text-primary text-3xl font-bold">
          FinSight Tokens Test
        </h1>
        <p className="text-on-surface-variant mt-2">
          This card uses surface, on-surface, and outline-variant tokens.
        </p>
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
          Primary Button
        </button>
      </div>
    </div>
  );
}
