export const HomeStyled = styled.div`
  min-height: 100%;
  position: relative;

  display: flex;
  flex-direction: row;

  .panel-files {
    display: flex;
    min-width: 240px;
    top: calc(50px + 12px);
    left: 0;
    position: sticky;

    min-width: 240px;
    background-color: ${({ theme }) => theme.palette.bg.mainContent};
    border-radius: 0 24px 0 0;

    margin-top: 12px;
    box-shadow: ${({ theme }) => theme.palette.shadow.itemContent};

    height: calc(100vh - 50px - 12px);
    overflow: hidden;

    &-wrapper {
      overflow: scroll;
      min-width: 240px;

      ::-webkit-scrollbar,
      ::-webkit-scrollbar-thumb,
      ::-webkit-scrollbar-track {
        display: none;
      }
    }
  }

  .content-files {
    width: 100%;
    padding: 12px 24px;
    overflow: auto;
  }
`
