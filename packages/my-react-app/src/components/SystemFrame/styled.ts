import styled from 'styled-components';

export const SystemFrameWrapper = styled.div`
  .system-frame-main {
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
    .system-frame-main-left {
      width: 18vw;
      min-width: 250px;
      height: 100vh;
      flex-shrink: 0;
    }
    .system-frame-main-right {
      flex-grow: 1;
    }
  }
  .page-main {
    margin: 5px;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
  }
`;
