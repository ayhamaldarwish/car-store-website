import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          لوحة التحكم
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          أهلاً بك في لوحة التحكم. هنا يمكنك إدارة السيارات والحجوزات في المستقبل.
        </p>
        {/* Future dashboard content will go here */}
      </div>
    </div>
  );
};

export default Dashboard; 