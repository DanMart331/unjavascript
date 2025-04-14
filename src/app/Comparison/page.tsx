'use client';

import { useState } from 'react';
import ComparisonItem from '../../components/Comparison';

export default function ComparisonsPage() {
  const [comparisons, setComparisons] = useState([
    { major: '', college1: '', college2: '' }
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...comparisons];
    updated[index][field as keyof typeof updated[0]] = value;
    setComparisons(updated);
  };

  const handleAdd = () => {
    setComparisons([...comparisons, { major: '', college1: '', college2: '' }]);
  };

  const handleDelete = (index: number) => {
    const updated = comparisons.filter((_, i) => i !== index);
    setComparisons(updated);
  };

  return (
    <div className="comparison-page">
      {comparisons.map((item, index) => (
        <ComparisonItem
          key={index}
          index={index}
          data={item}
          onChange={handleChange}
          onDelete={handleDelete}
        />
      ))}
      <button onClick={handleAdd}>+ Add Comparison</button>
    </div>
  );
}