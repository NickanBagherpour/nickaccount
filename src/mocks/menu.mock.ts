// src/mocks/menu.mock.ts
import { MenuItem } from '@/types/menu.type';
import { ROUTES } from '@/constants/routes';
// import { FaHome, FaChartBar, FaFileAlt } from 'react-icons/fa';

export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    // icon: <FaHome />,
  },
  {
    label: 'Transactions',
    path: ROUTES.TRANSACTIONS,
  },
  {
    label: 'Report 1',
    path: ROUTES.REPORT_1,
  },
  {
    label: 'Report 2',
    path: ROUTES.REPORT_2,
  },
];

// export const menuItems: MenuItem[] = [
//   {
//     label: 'Dashboard',
//     path: ROUTES.DASHBOARD,
//     // icon: <FaHome />,
//   },
//   {
//     label: 'Reports',
//     path: '#',
//     // icon: <FaChartBar />,
//     subItems: [
//       { label: 'Report 1', path: ROUTES.REPORT_1 },
//       { label: 'Report 2', path: ROUTES.REPORT_2 },
//       {
//         label: 'Nested Reports',
//         path: '#',
//         subItems: [
//           { label: 'Nested Report 1', path: '/nested-report-1' },
//           { label: 'Nested Report 2', path: '/nested-report-2' },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'Documents',
//     path: '#',
//     // icon: <FaFileAlt />,
//     subItems: [
//       { label: 'Document 1', path: '/document-1' },
//       { label: 'Document 2', path: '/document-2' },
//     ],
//   },
// ];
