import Image from 'next/image';
import campus from '../assets/campus.jpg';

interface ContentProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Content = ({ children, className = "" }: ContentProps) => {
    return (
      <div>
      <Image 
        src={campus}
        alt="Background UGA Campus"
        style={{ filter: 'brightness(0.33)' }}
        fill
        priority={true}
        className="object-cover w-full h-full z-[-1]"
      />
      {children}
      </div>
    );
  };
export default Content;