import styled from '@emotion/styled'

export const ButtonStyled = styled.button`
  white-space: nowrap;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;

  padding: 7px 9px;
  border-radius: 14px 0 14px 0;
  background-color: ${({ theme }) => theme.palette?.bg.mainContent};
  border: 1px solid ${({ theme }) => theme.palette?.border.content};
  cursor: pointer;
  color: ${({ theme }) => theme.palette?.color.text};

  &:hover {
    box-shadow: 0 0 6px 2px ${({ theme }) => theme.palette?.bg.highlight};
  }
  transition: 0.1s ease-in-out;
`
