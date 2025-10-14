import React from 'react';

function AnalyticsCards({ stats, setActiveView }) {
  const cards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      subtitle: 'vs last month',
      icon: '💰',
      gradient: 'from-elegant-darkGold to-elegant-gold',
      bgColor: 'bg-elegant-cream',
      onClick: null
    },
    {
      title: 'Total Orders',
      value: stats.total.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      subtitle: 'vs last month',
      icon: '📦',
      gradient: 'from-elegant-gold to-elegant-darkGold',
      bgColor: 'bg-elegant-cream',
      onClick: () => setActiveView('orders')
    },
    {
      title: 'Active Clients',
      value: stats.activeClients.toLocaleString(),
      change: '+15.3%',
      changeType: 'positive',
      subtitle: 'vs last month',
      icon: '👥',
      gradient: 'from-elegant-purple to-elegant-deepPurple',
      bgColor: 'bg-elegant-cream',
      onClick: () => setActiveView('orders')
    },
    {
      title: 'Avg Order Value',
      value: `₹${stats.avgOrderValue.toLocaleString()}`,
      change: '+3.7%',
      changeType: 'positive',
      subtitle: 'vs last month',
      icon: '📊',
      gradient: 'from-elegant-darkGold to-elegant-purple',
      bgColor: 'bg-elegant-cream',
      onClick: null
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div 
          key={index} 
          onClick={card.onClick}
          className={`${card.bgColor} rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${
            card.onClick ? 'cursor-pointer hover:-translate-y-1' : ''
          }`}
        >
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
            <h3 className="text-[#4a3b30] text-sm font-semibold mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-elegant-black font-elegant mb-1">{card.value}</p>
            <p className="text-xs text-[#4a3b30]/70">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;
