import styled from 'styled-components'

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const PaddingBox = styled.div<{padding: string}>`
  padding: ${(props) => props.padding || '20px'};
`

const Styleds = {
  FlexCenter,
  PaddingBox
}

export default Styleds
