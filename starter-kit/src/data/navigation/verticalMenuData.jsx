import { SubMenu, MenuItem } from '@menu/vertical-menu'

const verticalMenuData = [
  {
    label: 'Dashboard',
    href: '/patient/dashboard',
    icon: 'tabler-smart-home'
  },
  {
    label: 'Patient',
    href: '/patient/report',
    icon: 'tabler-user-heart',
    menu: [
      { label: 'Health & Personal Details', href: '/patient/report/health', icon: 'tabler-report-medical' },
      { label: 'Upload Diagnostic Report', href: '/patient/report/diagnosis', icon: 'tabler-test-pipe' },
      { label: 'Appointments', href: '/patient/report/diagnosis', icon: 'tabler-calendar-week' },
      { label: 'Medicine Schedule', href: '/patient/report/diagnosis', icon: 'tabler-calendar-week' }
    ]
  },
  {
    label: 'Doctor',
    href: '/doctor',
    icon: 'tabler-stethoscope',
    menu: [
      { label: 'Info', href: '/doctor/doctor_info/', icon: 'tabler-user' },
      { label: 'My Patients', href: '/doctor/your_patients/', icon: 'tabler-clipboard-list' },
      { label: 'Dashboard', href: '#', icon: 'tabler-heart-rate-monitor' }
    ]
  },
  {
    label: 'Facility',
    href: '/admin/facility',
    icon: 'tabler-building-skyscraper',
    menu: [
      { label: 'Add New', href: '/admin/facility/add_facility', icon: 'tabler-ss' },
      { label: 'Manage', href: '/admin/facility/manage_facility', icon: 'tabler-ussssder' }
    ]
  },
  {
    label: 'Hospital',
    href: '/hmanager/hospital',
    icon: 'tabler-building-hospital',
    menu: [
      { label: 'Manage Patients', href: '/hmanager/manage/patient/list', icon: 'tabler-health-recognition' },
      { label: 'Patient Stats', href: '/hmanager/manage/patient/stats', icon: 'tabler-chart-pie-2' },
      { label: 'Manage Doctors', href: '/hmanager/manage/doctor', icon: 'tabler-medical-cross' }
    ]
  },
  {
    label: 'Pharmacy',
    href: '/pharmacy',
    icon: 'tabler-pill',
    menu: [
      { label: 'View and Manage Meds', href: '/pharmacy/medicine/manage', icon: 'tabler-ss' },
      { label: 'Create Invoice', href: '/pharmacy/create-invoice', icon: 'tabler-invoice' },
      { label: 'Manage Orders', href: '/pharmacy/order/manage', icon: 'tabler-ss' }
    ]
  },
  {
    label: 'Diagnostic Center',
    href: '/pharmacy',
    icon: 'tabler-stethoscope',
    menu: [
      { label: 'Dashboard', href: '/hmanager/manage/patient/list', icon: 'tabler-ss' },
      { label: 'Test - Add Test', href: '/hmanager/manage/patient/list', icon: 'tabler-ss' },
      { label: 'Test - Manage All', href: '/hmanager/manage/patient/list', icon: 'tabler-ss' },
      { label: 'Test Requests - View', href: '/hmanager/manage/patient/list', icon: 'tabler-ss' },
      { label: 'Test Requests - Manage', href: '/hmanager/manage/patient/list', icon: 'tabler-ss' },
      { label: 'History - All Test History', href: '/hmanager/manage/patient/list', icon: 'tabler-ss' }
    ]
  }
]

const MenuItems = () => {
  return verticalMenuData.map(item => {
    if (item.menu) {
      return (
        <SubMenu key={item.label} label={item.label} icon={<i className={item.icon} />}>
          {item.menu.map(subItem => (
            <MenuItem key={subItem.label} href={subItem.href} icon={<i className={subItem.icon} />}>
              {subItem.label}
            </MenuItem>
          ))}
        </SubMenu>
      )
    } else {
      return (
        <MenuItem key={item.label} href={item.href} icon={<i className={item.icon} />}>
          {item.label}
        </MenuItem>
      )
    }
  })
}

export default MenuItems
