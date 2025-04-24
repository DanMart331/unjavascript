import Image from 'next/image';
import trashcan from '../assets/trashcan.png'
import { useContext } from 'react';
import { AppContext } from '@/app/context';

type ComparisonProps = {
  index: number;
  data: {
  major: string;
  college1: string;
  college2: string;
  user:string;
  };
  onChange: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
};

export default function Comparison({ index, data, onChange, onDelete }: ComparisonProps) {
  const appSettings = useContext(AppContext);

  const majors = ["Computer Science", "Computer Engineering"];
  return (
    <div className="flex gap-2 items-end flex-wrap">
      <span className="comparisonRow">{index + 1}.</span>
      <label>Major:</label>
          <select value={data.major} onChange={(e) => onChange(index, 'major', e.target.value)} className='bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40'>
            <option  key={-1}></option>
            {majors.map((major:any,index) => {
              return <option key={index}>{major}</option>
            })}
          </select>
        {/* <input
          type="text"
          value={data.major}
          onChange={(e) => onChange(index, 'major', e.target.value)}
          className="bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40"
        /> */}
      <label>College 1:</label>
          <select value={data.college1} className='bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40'  onChange={(e) => onChange(index, 'college1', e.target.value)}>
            <option key={-1}></option>
            {appSettings.listOfColleges.map((college:any,index) => {
              return <option key={index}>{college.name}</option>
            })}
          </select>
        {/* <input
          type="text"
          value={data.college1}
          onChange={(e) => onChange(index, 'college1', e.target.value)}
          className="bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40"
        /> */}
      <label>College 2:</label>
        <select value={data.college2}  className='bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40' onChange={(e) => onChange(index, 'college2', e.target.value)}>
              <option key={-1}></option>
              {appSettings.listOfColleges.map((college:any,index) => {
                return <option key={index}>{college.name}</option>
              })}
        </select>
        {/* <input
          type="text"
          value={data.college2}
          onChange={(e) => onChange(index, 'college2', e.target.value)}
          className="bg-gray-200 border border-gray-400 rounded outline-none focus:ring-2 focus:ring-blue-400 w-40"
        /> */}
      <button onClick={() => onDelete(index)} className="deleteIcon">
        <Image src={trashcan} alt="Delete Icon" width={20} height={20}/>
      </button>
    </div>
  );
}