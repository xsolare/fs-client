export const DefaultStyled = styled.main`
  position: relative;
  z-index: 3;

  min-height: 100vh;

  background-color: ${({ theme }) => theme.palette.bg.main};
  color: ${({ theme }) => theme.palette.color.text};

  padding-top: ${({ theme }) => theme.sizes.header.height};
`
