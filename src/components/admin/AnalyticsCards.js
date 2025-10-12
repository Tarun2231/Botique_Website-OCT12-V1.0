import React from 'react';

function AnalyticsCards({ stats }) {
  const cards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      subtitle: 'vs last month',
      icon: '💰',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: stats.total.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      subtitle: 'vs last month',
      icon: '📦',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Clients',
      value: stats.activeClients.toLocaleString(),
      change: '+15.3%',
      changeType: 'positive',
      subtitle: 'vs last month',
      icon: '👥',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg Order Value',
      value: `₹${stats.avgOrderValue.toLocaleString()}`,
      change: '+3.7%',
      changeType: 'positive',
      subtitle: 'vs last month',
      icon: '📊',
      gradient: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-md`}>
              <span className="text-2xl filter drop-shadow-sm">{card.icon}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              card.changeType === 'positive' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {card.change}
            </div>
          </div>
          <div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mb-1">{card.value}</p>
            <p className="text-xs text-gray-500">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;
