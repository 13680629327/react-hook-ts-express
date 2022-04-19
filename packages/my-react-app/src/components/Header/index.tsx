import React, { useContext } from "react";
import { MenuInfo } from 'rc-menu/lib/interface'
import { HeaderWrapper } from './styled'
import { useHistory } from "react-router-dom";
import { UserContext } from '../../store/user'
import { Menu, Dropdown, message } from 'antd';
import { loginOut } from "@/api/login";

const HeaderComps: React.FC = () => {
  const history = useHistory()
  const { store: userInfo } = useContext(UserContext)
  const handleMenuClick = async({key}: MenuInfo) => {
    try {
      if (key === 'loginOut') {
        const res: any = await loginOut()
        message.success(res.message)
        // 清楚缓存并返回登录页
        localStorage.clear()
        setTimeout(() => {
          history.push('/login')
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const menu = <Menu onClick={handleMenuClick}>
    <Menu.Item key='loginOut'>退出登录</Menu.Item>
  </Menu>
  return (
    <HeaderWrapper className="header-wrapper">
      <Dropdown overlay={menu} placement="bottom" arrow>
        <span className="user-name">{ userInfo.userName }</span>
      </Dropdown>
    </HeaderWrapper>
  )
}

export default HeaderComps