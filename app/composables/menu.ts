interface MenuItem {
  title: string;
  href: string;
  icon: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const useMenu = () => {
  const catalogItems: MenuItem[] = [
    { title: 'Диваны', href: '/catalog/sofas', icon: 'mdi:sofa' },
    { title: 'Стулья', href: '/catalog/chairs', icon: 'mdi:chair' },
    { title: 'Столы', href: '/catalog/tables', icon: 'mdi:table-furniture' },
    { title: 'Кровати', href: '/catalog/beds', icon: 'mdi:bed' },
    { title: 'Шкафы', href: '/catalog/wardrobes', icon: 'mdi:wardrobe' },
  ];

  const infoItems: MenuItem[] = [
    {
      title: 'Условия доставки',
      href: '/delivery',
      icon: 'mdi:truck-delivery',
    },
    { title: 'Возврат и обмен', href: '/return', icon: 'mdi:swap-horizontal' },
    { title: 'Условия оплаты', href: '/payment', icon: 'mdi:credit-card' },
    { title: 'Гарантия', href: '/warranty', icon: 'mdi:shield-check' },
    { title: 'О компании', href: '/about', icon: 'mdi:information' },
  ];

  const contactItems: MenuItem[] = [
    {
      title: 'Телефон',
      href: `tel:${useRuntimeConfig().public.phoneNumber}`,
      icon: 'mdi:phone',
    },
    {
      title: 'Email',
      href: `mailto:${useRuntimeConfig().public.email}`,
      icon: 'mdi:email',
    },
  ];

  const menuSections: MenuSection[] = [
    { title: 'Каталог', items: catalogItems },
    { title: 'Информация', items: infoItems },
    { title: 'Контакты', items: contactItems },
  ];

  return {
    menuSections,
    catalogItems,
    infoItems,
    contactItems,
  };
};
