import { NavItem } from '../../../pageStructure/Header/headerNavigation.config';
import { NavLink } from '../NavLink/NavLink';
import {
  dropdownButton,
  dropdownIcon,
  dropdownLabel,
  dropdownMenu,
  dropdownWrapper,
} from './NavDropdown.css';
import { ArrowDownIcon } from '@components/shared/ui/icons/ArrowDownIcon';

type NavDropdownProps = {
  item: NavItem;
};

export function NavDropdown({ item }: NavDropdownProps) {
  return (
    <div className={dropdownWrapper}>
      <button
        type="button"
        className={dropdownButton}
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className={dropdownLabel}>{item.label}</span>

        <ArrowDownIcon className={dropdownIcon} />
      </button>

      <div className={dropdownMenu}>
        {item.children?.map((child) => (
          <NavLink
            key={child.label}
            href={child.href}
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
