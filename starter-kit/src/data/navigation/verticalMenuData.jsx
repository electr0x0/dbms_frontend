import { SubMenu, MenuItem } from '@menu/vertical-menu'

const verticalMenuData = [
  {
    label: 'Home',
    href: '/home',
    icon: 'tabler-smart-home',
    menu: [
      { label: 'Home2', href: '/home', icon: 'tabler-smart-home' },
      { label: 'Home3', href: '/home', icon: 'tabler-smart-home' }
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
