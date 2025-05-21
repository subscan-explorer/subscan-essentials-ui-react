import React from 'react';
import { Link } from '../link';

interface InfoCardProps {
  title: string;
  value?: string;
  href: string;
  color?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, href, color = 'pink-100' }) => {
  return (
    <Link href={href} className='block'>
      <div className={`bg-white p-4 rounded-lg hover:shadow-md transition-shadow`}>
        <div className="text-zinc-500">{title}</div>
        <div className={`${color} mt-1 font-semibold text-xl`}>{value || '-'}</div>
      </div>
    </Link>
  );
};

export default InfoCard;
