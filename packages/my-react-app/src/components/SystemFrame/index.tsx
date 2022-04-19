import { renderRoutes } from "react-router-config";
import React from "react";
import HeaderComps from "@/components/Header"
import MenuComps from "@/components/Menu"
import { SystemFrameWrapper } from './styled'

const SystemFrame: React.FC = (props: any) => {
  return (
    <SystemFrameWrapper className="system-frame-wrapper">
      <div className="system-frame-main">
        <div className="system-frame-main-left">
          <MenuComps></MenuComps>
        </div>
        <div className="system-frame-main-right">
          <HeaderComps></HeaderComps>
          <div className="page-main">
            { renderRoutes(props.route.routes) }
          </div>
        </div>
      </div>
    </SystemFrameWrapper>
  )
}

export default SystemFrame
