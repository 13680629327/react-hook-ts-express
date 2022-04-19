import styled from 'styled-components';

export const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 0 8px #f0f1f2;
  .menu-header {
    height: 60px;
    box-shadow: 0 2px 8px #f0f1f2;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
    span {
      font-size: 24px;
      font-weight: 600;
    }
  }
`;
