import { useState } from 'react';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { cardHoverLift } from '@/lib/animationClasses';

const STARTER_ITEMS = ['Coffee', 'Groceries', 'Rent', 'Gym'];

// TEMPORARY test component for verifying Auto Animate — delete after 6.3.1 passes.
function TestList() {
  const [items, setItems] = useState(STARTER_ITEMS);
  const [listRef] = useAutoAnimate();

  const addItem = () => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const shuffleItems = () => {
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="p-lg max-w-md mx-auto space-y-md">
      <h2 className="font-h3 text-h3 text-on-surface">Auto Animate Test</h2>
      <div className="flex gap-sm">
        <button
          onClick={addItem}
          className="px-md py-sm rounded-lg bg-primary text-on-primary font-label text-label"
        >
          Add
        </button>
        <button
          onClick={shuffleItems}
          className="px-md py-sm rounded-lg border border-outline-variant font-label text-label"
        >
          Shuffle
        </button>
      </div>
      <ul ref={listRef} className="space-y-sm">
        {items.map((item, index) => (
          <li
            key={item}
            className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex justify-between items-center ${cardHoverLift}`}
          >
            <span className="font-body text-body text-on-surface">{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="text-error font-label text-label hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestList;
