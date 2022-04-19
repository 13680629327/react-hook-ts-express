import styled from 'styled-components';

export const MyCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 4px;
`;
export const MyCardHeader = styled.div<{ border: boolean; show: boolean; borderColor: string }>`
  width: 100%;
  height: 40px;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid ${(props) => (props.border ? props.borderColor : 'transparent')};
  .title {
    font-size: 16px;
    font-weight: 550;
  }
`;
export const MyCardMain = styled.div<{ padding?: string }>`
  padding: ${(props) => props.padding || '10px'};
`;
