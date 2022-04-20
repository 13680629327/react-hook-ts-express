import React from 'react';
import { MyCardWrapper, MyCardHeader, MyCardMain } from './styled';

interface IMyCard {
  children?: React.ReactNode;
  title?: React.ReactNode;
  headerRightSlot?: React.ReactNode;
  border?: boolean;
  borderColor?: string;
  showHeader?: boolean;
  mPadding?: string;
  footer?: React.ReactNode;
}

const MyCard: React.FC<IMyCard> = (props) => {
  const { border = true, showHeader = true, borderColor = '#fbf1f1' } = props;
  return (
    <MyCardWrapper>
      <MyCardHeader border={border} show={showHeader} borderColor={borderColor}>
        <div className="title">{props.title}</div>
        <div className="header-right">{props.headerRightSlot}</div>
      </MyCardHeader>
      <MyCardMain padding={props.mPadding}>{props.children}</MyCardMain>
      {props.footer}
    </MyCardWrapper>
  );
};

export default MyCard;
