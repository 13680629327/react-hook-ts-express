import React from 'react';
import MyCard from '@/components/MyCard';

const Home: React.FC = () => {
  const onMore = () => {
    alert('More');
  };
  const more = <span onClick={onMore}>More</span>;
  return (
    // <SystemFrame>
    // </SystemFrame>
    <>
      <MyCard title="默认card" headerRightSlot={more}>
        this is Home
      </MyCard>
      <div style={{ height: '5px' }}></div>

      <MyCard border={false} title="tititle 没有 border">
        this is Home
      </MyCard>
      <div style={{ height: '5px' }}></div>

      <MyCard borderColor="red" title="设置 border 颜色">
        this is Home
      </MyCard>
      <div style={{ height: '5px' }}></div>

      <MyCard showHeader={false} title="不展示 Header">
        不展示 Header
      </MyCard>
      <div style={{ height: '5px' }}></div>

      <MyCard title="有 footer" footer={<div style={{ background: 'yellow' }}>我是footer</div>}>
        this is Home
      </MyCard>
    </>
  );
};

export default Home;
