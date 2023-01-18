import React from 'react';

const subMonth = (date, month) => {
  date.setMonth(date.getMonth() - month);
  return date;
};

const Filter = () => {
  const rawData = [
    subMonth(new Date(), 2),
    subMonth(new Date(), 1),
    new Date(),
  ];
  const options = rawData.map((item) => ({
    month: item.getMonth() + 1,
    year: item.getFullYear(),
  }));

  return (
    <div className="flex mx-auto p-2">
      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item.month}/{item.year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
