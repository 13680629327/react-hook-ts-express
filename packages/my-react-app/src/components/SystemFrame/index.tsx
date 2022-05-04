import { renderRoutes } from 'react-router-config';
import React, { Suspense } from 'react';
import HeaderComps from '@/components/Header';
import MenuComps from '@/components/Menu';
import { SystemFrameWrapper } from './styled';

const SystemFrame: React.FC = (props: any) => {
  return (
    <SystemFrameWrapper className="system-frame-wrapper">
      <div className="system-frame-main">
        <div className="system-frame-main-left">
          <MenuComps />
        </div>
        <div className="system-frame-main-right">
          <HeaderComps />
          <div className="page-main">
            <Suspense fallback>
              {renderRoutes(props.route.routes)}
            </Suspense>
          </div>
        </div>
      </div>
    </SystemFrameWrapper>
  );
};

export default SystemFrame;
