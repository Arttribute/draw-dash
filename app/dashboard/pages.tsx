import React from 'react';
import StatCard from '@/components/ui/dashboard/StatCard';
import { Button } from '@/components/ui/button';

interface DashboardProps {
    onGoBack: () => void;
  }

import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

// Data array for StatCards
const cardData = [
  {
    icon: BanknotesIcon,
    label: "Total Deposit",
    value: "1200",
  },
  {
    icon: ArrowTrendingUpIcon,
    label: "Earnings",
    value: "100",
  },
  {
    icon: StarIcon,
    label: "Total Points",
    value: "120",
  },
  {
    icon: CheckBadgeIcon,
    label: "Achievements",
    value: "50",
  }
];

const Dashboard: React.FC<DashboardProps> = ({onGoBack}) => {
  return (
    <div className='container mx-auto px-6 lg:px-12 max-w-7xl mt-20'>
      <div className="flex flex-wrap justify-around p-5 gap-4">
        {cardData.map((card, index) => (
          <StatCard
            key={index}
            icon={card.icon}
            label={card.label}
            value={card.value}
          />
        ))}
      </div>
      <Button onClick={onGoBack} className="mt-4">Go Back</Button>
    </div>
  );
}


export default Dashboard;

