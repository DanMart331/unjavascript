import Image from 'next/image';

type ComparisonItemProps = {
  index: number;
  data: {
    major: string;
    college1: string;
    college2: string;
  };
  onChange: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
};

export default function Comparison({ index, data, onChange, onDelete }: ComparisonItemProps) {
  return (
    <div className="comparison-item">
      <span>{index + 1}.</span>
      <label>Major:
        <input
          type="text"
          value={data.major}
          onChange={(e) => onChange(index, 'major', e.target.value)}
        />
      </label>
      <label>College:
        <input
          type="text"
          value={data.college1}
          onChange={(e) => onChange(index, 'college1', e.target.value)}
        />
      </label>
      <label>College:
        <input
          type="text"
          value={data.college2}
          onChange={(e) => onChange(index, 'college2', e.target.value)}
        />
      </label>
      <button onClick={() => onDelete(index)} title="Delete">
        <Image src="../assets/trashcan.png" alt="DeleteIcon" width={20} height={20}/>
        </button>
    </div>
  );
}