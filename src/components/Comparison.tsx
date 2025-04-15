import Image from 'next/image';
import trashcan from '../assets/trashcan.png'

type ComparisonProps = {
  index: number;
  data: {
  major: string;
  college1: string;
  college2: string;
  };
  onChange: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
};

export default function Comparison({ index, data, onChange, onDelete }: ComparisonProps) {
  return (
    <div className="flex gap-2 items-end flex-wrap">
      <span className="comparisonRow">{index + 1}.</span>
      <label>Major:</label>
        <input
          type="text"
          value={data.major}
          onChange={(e) => onChange(index, 'major', e.target.value)}
          className="bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40"
        />
      <label>College 1:</label>
        <input
          type="text"
          value={data.college1}
          onChange={(e) => onChange(index, 'college1', e.target.value)}
          className="bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40"
        />
      <label>College 2:</label>
        <input
          type="text"
          value={data.college2}
          onChange={(e) => onChange(index, 'college2', e.target.value)}
          className="bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40"
        />
      <button onClick={() => onDelete(index)} title="Delete" className="deleteIcon">
        <Image src={trashcan} alt="Delete Icon" width={20} height={20}/>
        </button>
    </div>
  );
}