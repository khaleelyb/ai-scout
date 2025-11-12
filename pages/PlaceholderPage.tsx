
import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">This feature is under construction.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
