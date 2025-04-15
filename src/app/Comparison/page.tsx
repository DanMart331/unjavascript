'use client';

import { useState } from 'react';
import Comparison from '../../components/Comparison';

export default function ComparisonsPage() {
  const [comparisons, setComparisons] = useState([
    { major: '', college1: '', college2: '' }
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...comparisons];
    updated[index][field as keyof typeof updated[0]] = value;
    setComparisons(updated);
  };

  const handleDelete = () => {
  };

  return (
    <div className="comparison-page">
      {comparisons.map((item, index) => (
        <Comparison
          key={index}
          index={index}
          data={item}
          onChange={handleChange}
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