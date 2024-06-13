import { SubMenu, MenuItem } from '@menu/vertical-menu'

const verticalMenuData = [
  {
    label: 'Home',
    href: '/home',
    icon: 'tabler-smart-home',
    menu: [
      { label: 'Home2', href: '#', icon: 'tabler-smart-home' },
      { label: 'Home3', href: '#', icon: 'tabler-smart-home' }
    ]
  },
  {
    label: 'Reports',
    href: '/about',
    icon: 'tabler-info-circle'
  },
  {
    label: 'Reports',
    href: '/abouts',
    icon: 'tabler-info-circle'
  },
  {
    label: 'Doctor',
    href: '/doctor',
    icon: 'tabler-stethoscope',
    menu: [
      { label: 'Info', href: 'doctor/doctor_info/', icon: 'tabler-user' },
      { label: 'My Patients', href: 'doctor/your_patients/', icon: 'tabler-clipboard-list' },
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
