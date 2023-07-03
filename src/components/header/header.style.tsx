export const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  z-index: 3;
  user-select: none;

  .mount-path {
    position: fixed;

    left: 0;
    top: 0;
    width: 240px;
    height: ${({ theme }) => theme.sizes.header.height};

    background-color: ${({ theme }) => theme.palette.bg.headerBlur};
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    backdrop-filter: blur(8px) saturate(180%);
    border-right: 1px solid ${({ theme }) => theme.palette.border.header};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.header};
    border-radius: 0 0 25px 0;

    > input {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      color: ${({ theme }) => theme.palette.color.header};

      font-size: 1rem;
      padding: 12px;
      height: 100%;
      width: 100%;
    }
  }

  .control {
    position: fixed;

    right: 0;
    top: 0;

    display: flex;

    background-color: ${({ theme }) => theme.palette.bg.headerBlur};
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    backdrop-filter: blur(8px) saturate(180%);
    border-left: 1px solid ${({ theme }) => theme.palette.border.header};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.header};

    padding: 0 10px;
    width: auto;
    height: ${({ theme }) => theme.sizes.header.height};
    border-radius: 0 0 0 25px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;

    svg {
      min-width: 20px;
      min-height: 20px;
      color: ${({ theme }) => theme.palette.color.header};
      font-size: 1rem;

      &:hover {
        color: ${({ theme }) => theme.palette.bg.highlight};
      }
      transition: 0.1s ease-in-out color;
      cursor: pointer;
    }

    .profile {
      cursor: pointer;
      border-left: 1px solid ${({ theme }) => theme.palette.border.header};
      font-size: 0.8rem;
      text-align: center;

      padding-left: 6px;

      svg {
        min-width: 34px;
        min-height: 34px;
      }

      &.isAuth {
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;

          min-width: 34px;
          min-height: 34px;

          background-color: ${({ theme }) => theme.palette.border.header};
          color: ${({ theme }) => theme.palette.color.header};
        }
      }
    }
  }
`
