'use client';

import { useState } from 'react';
import Comparison from '../../components/Comparison';

export default function ComparisonsPage() {
  const [comparisons, setComparisons] = useState([
    { major: '', college1: '', college2: '' }
  ]);

  const handleDelete = (index: number) => {
    const updated = comparisons.filter((_, i) => i !== index);
    setComparisons(updated);
  };

  return (
    <div className="comparison-page">
      {comparisons.map((item, index) => (
        <Comparison
          key={index}
          index={index}
          data={item}
          onDelete={handleDelete}
        />
      ))}
      <button style={{
        border: '1px solid',
        backgroundColor: 'Gainsboro',
        marginLeft: '30px',
        marginTop: '15px',
        paddingLeft: '5px',
        paddingRight: '5px'
      }}>
        Click here to compare colleges</button>
    </div>
  );
}