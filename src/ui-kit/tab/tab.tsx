import React from 'react';
import { TabProps } from './tab.types';
import { tabStyles } from './tab.styles';

export const Tab: React.FC<TabProps> = ({ items, activeKey, onChange, fullWidth }) => {
  return (
    <div className={`${tabStyles.container} ${fullWidth ? tabStyles.fullWidth : ''}`}>
      <div className={`${tabStyles.tabList} ${fullWidth ? tabStyles.fullWidth : ''}`}>
        {items.map((item) => (
          <div
            key={item.key}
            className={`${tabStyles.tab} ${
              item.key === activeKey ? tabStyles.activeTab : tabStyles.inactiveTab
            } ${fullWidth ? 'flex-1 text-center' : ''}`}
            onClick={() => onChange(item.key)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className={`${tabStyles.content} ${fullWidth ? tabStyles.fullWidth : ''}`}>
        {items.find((item) => item.key === activeKey)?.content}
      </div>
    </div>
  );
};
