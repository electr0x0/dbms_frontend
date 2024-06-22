import { SubMenu, MenuItem } from '@menu/vertical-menu'

const verticalMenuData = [
  {
    label: 'Dashboard',
    href: '/patient/dashboard',
    icon: 'tabler-smart-home'
  },
  {
    label: 'Recommendation',
    href: '/patient/recommendation',
    icon: 'tabler-sparkles'
  },
  {
    label: 'Reports',
    href: '/patient/report',
    icon: 'tabler-clipboard-text',
    menu: [
      { label: 'Health & Personal', href: '/patient/report/health', icon: 'tabler-report-medical' },
      { label: 'Other Diagnostic', href: '/patient/report/diagnosis', icon: 'tabler-test-pipe' }
    ]
  },
  {
    label: 'Doctor',
    href: '/doctor',
    icon: 'tabler-stethoscope',
    menu: [
      { label: 'Info', href: '/doctor/doctor_info/', icon: 'tabler-user' },
      { label: 'My Patients', href: '/doctor/your_patients/', icon: 'tabler-clipboard-list' },
      { label: 'Appointments', href: '/doctor/appointments/', icon: 'tabler-calendar-clock' },
      { label: 'Prescriptions', href: '/doctor/prescriptions/', icon: 'tabler-prescription' },
      { label: 'Dashboard', href: '#', icon: 'tabler-heart-rate-monitor' }
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
