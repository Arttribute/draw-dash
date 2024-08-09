import React from 'react';

type StatCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number | string;
};

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl bg-gray-50 p-1 shadow-sm w-full md:w-64 lg:w-68 xl:w-68 max-w-md mx-auto">
      <div className="flex p-4">
        <Icon className="h-6 w-6 text-gray-700" />
        <h3 className="ml-2 text-lg font-medium">{label}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-3xl">
        {value}
      </p>
    </div>
  );
};

export default StatCard;

