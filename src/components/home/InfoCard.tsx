import React from 'react';
import { Link } from '../link';

interface InfoCardProps {
  title: string;
  value?: string;
  href: string;
  bgColor?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, href, bgColor = 'bg-pink-100' }) => {
  return (
    <Link href={href} className='block'>
      <div className={`${bgColor} p-4 rounded-lg hover:shadow-md transition-shadow`}>
        <div className="font-medium text-gray-800">{title}</div>
        <div className="mt-1 font-mono text-gray-700">{value || '-'}</div>
      </div>
    </Link>
  );
};

export default InfoCard;
