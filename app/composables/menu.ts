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
    { title: 'Информация', items: infoItems },
    { title: 'Контакты', items: contactItems },
  ];

  return {
    menuSections,
    infoItems,
    contactItems,
  };
};
