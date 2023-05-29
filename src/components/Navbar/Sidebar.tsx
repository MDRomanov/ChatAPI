import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './sidebar.css';

function Sidebar({ toggleTheme }: { toggleTheme: () => void }): JSX.Element {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = (): void => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <div className="navbar">
        <FaIcons.FaBars onClick={showSidebar} />
        <button type="button" className="themeToggle" onClick={toggleTheme}>
          Сменить тему
        </button>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <h5>Infoserver Chat API</h5>
            <AiIcons.AiOutlineClose onClick={showSidebar} />
          </li>
          <li className="nav-text">
            <FaIcons.FaPlus />
            <span>Добавить конференцию</span>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;

// {SidebarData.map((item, index) => {
//   return (
//     <li key={index} className={item.cName}>
//       <Link to={item.path}>
//         {item.icon}
//         <span>{item.title}</span>
//       </Link>
//     </li>
//   );
// })}

// <IconContext.Provider value={{ color: '#fff' }}>
