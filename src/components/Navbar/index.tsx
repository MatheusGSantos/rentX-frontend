import { useLocation, useNavigate } from 'react-router-dom';

import { TABS } from './constants';

import { StyledNavbar } from './styles';

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <StyledNavbar>
      {TABS.map(({ label, path, icon: TabIcon }) => (
        <li key={label}>
          <div
            className={pathname === path ? 'active' : ''}
            onClick={() => {
              if (pathname !== path) navigate(path);
            }}
            role='button'
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                if (pathname !== path) navigate(path);
              }
            }}
          >
            <TabIcon aria-label={label} />
          </div>
        </li>
      ))}
    </StyledNavbar>
  );
}
