import styled from 'styled-components';
import logo from '../../assets/img/login.jpg';

export const RegisterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(${logo});
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const RegisterContainer = styled.div<{ width?: string; backgroundColor?: string }>`
  width: ${(props) => props.width || '600px'};
  background-color: ${(props) => props.backgroundColor || '#fff'};
  /* margin-top: 0vh; */
  border-radius: 5px;
  h2 {
    text-align: center;
    margin: 0;
    padding: 10px 0;
    font-weight: 600;
  }
  form {
    padding: 30px;
  }
`;
