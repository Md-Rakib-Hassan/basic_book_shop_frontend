import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: { value: number; type: 'increase' | 'decrease' };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center p-3 rounded-full ${color}`}
          >
            <Icon size={24} className="text-white" />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-900 mr-2">{value}</h3>
              {change && (
                <span
                  className={`text-sm font-medium ${
                    change.type === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {change.type === 'increase' ? '↑' : '↓'} {change.value}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;