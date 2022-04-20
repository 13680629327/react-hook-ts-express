import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { MenuWrapper } from './styled';
import logoIcon from '@/assets/img/logo.svg';
import { getMenuList } from '@/api/menu';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useHistory } from 'react-router-dom';

const { SubMenu } = Menu;

interface IMenu {
  title: string;
  children: IMenu[];
  path: string;
  icon?: string;
}

const MenuComps: React.FC = () => {
  const history = useHistory();
  const [menuData, setMenuData] = useState<IMenu[]>([]);
  const handleClick = ({ key }: MenuInfo) => {
    history.push(key);
  };
  // 获取菜单数据
  const getMenuData = async () => {
    const res = await getMenuList();
    setMenuData(res.data);
  };
  useEffect(() => {
    getMenuData();
  }, []);

  // 渲染不含children的目录
  const renderNoChildMenu = (item: IMenu) => {
    return <Menu.Item key={item.path}>{item.title}</Menu.Item>;
  };
  // 渲染含有children的目录
  const renderChildMenu = (item: IMenu) => {
    return (
      <SubMenu key={item.path} title={item.title}>
        {item.children.map((child) => {
          return renderMenu(child);
        })}
      </SubMenu>
    );
  };
  // 渲染菜单
  const renderMenu = (item: IMenu) => {
    return item.children.length ? renderChildMenu(item) : renderNoChildMenu(item);
  };
  return (
    <MenuWrapper className="menu-wrapper">
      <div className="menu-header">
        <img src={logoIcon} alt="" />
        <span>工人系统</span>
      </div>
      <Menu
        onClick={handleClick}
        style={{ width: '100%', marginTop: '2px' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={[]}
        mode="inline"
      >
        {/* <SubMenu key="sub1" title="Navigation One">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="12">Option 12</Menu.Item> */}
        {menuData.map((item) => renderMenu(item))}
      </Menu>
    </MenuWrapper>
  );
};

export default MenuComps;
