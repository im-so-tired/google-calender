import { FC, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import { LayoutProvider } from '@ui/Layout/useLayoutContext';

import { toggleSidebarAnimation } from '@styles/animations/toggleSidebarAnimation';
import Header from './Header/Header';
import styles from './Layout.module.scss';
import Sidebar from './Sidebar/Sidebar';

const Layout: FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  return (
    <div>
      <LayoutProvider value={{ showSidebar, toggleSidebar }}>
        <Header />
        <Transition in={showSidebar} timeout={0}>
          {(state) => (
            <div
              className={styles.wrapper}
              style={{ ...toggleSidebarAnimation[state] }}
            >
              <Sidebar />
              <main>
                <Outlet />
              </main>
            </div>
          )}
        </Transition>
      </LayoutProvider>
    </div>
  );
};

export default Layout;
