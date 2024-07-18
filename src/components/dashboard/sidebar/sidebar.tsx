// components/dashboard/sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';

import { MenuItem } from '@/types/menu.type';
import { menuItems } from '@/mocks/menu.mock';

import { sidebarStyles } from './sidebar.styles';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isActive = pathname === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus[item.label];

    return (
      <div key={item.label}>
        {hasSubItems ? (
          <button
            onClick={() => toggleSubMenu(item.label)}
            className={sidebarStyles.link(isActive, depth)}
          >
            <span className="flex items-center">
              {item.icon && <span className={sidebarStyles.icon}>{item.icon}</span>}
              {item.label}
            </span>
            <FaChevronDown className={sidebarStyles.chevron(isOpen)} />
          </button>
        ) : (
          <Link href={item.path} className={sidebarStyles.link(isActive, depth)}>
            {item.icon && <span className={sidebarStyles.icon}>{item.icon}</span>}
            {item.label}
          </Link>
        )}
        {hasSubItems && (
          <div className={sidebarStyles.subMenu(isOpen)}>
            {item.subItems!.map(subItem => renderMenuItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={sidebarStyles.overlay(isOpen)} onClick={toggleSidebar} />
      <aside className={sidebarStyles.sidebar(isOpen)}>
        <nav>
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
      </aside>
    </>
  );
}
