export const HomeStyled = styled.div`
  min-height: 100%;
  position: relative;

  display: flex;
  flex-direction: row;

  .panel-files {
    display: flex;

    width: auto;
    min-width: 240px;
    background-color: ${({ theme }) => theme.palette.bg.mainContent};
    border-radius: 0 24px 0 0;

    margin-top: 12px;
    padding: 6px 0;

    min-height: calc(100vh - 50px - 12px);
  }

  .content-files {
    position: relative;

    width: 100%;
    padding: 12px 24px;
    overflow: auto;

    &-wrapper {
      top: 0;
      left: 0;
      position: sticky;
    }
  }
`
