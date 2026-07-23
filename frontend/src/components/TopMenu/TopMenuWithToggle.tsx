"use client";

import { TopMenu } from "./TopMenu";
import { useMobileMenu } from "@/contexts/MobileMenuContext";

export const TopMenuWithToggle = () => {
  const { toggleMobileMenu } = useMobileMenu();

  return <TopMenu onMobileMenuToggle={toggleMobileMenu} />;
};
