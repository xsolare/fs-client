import { DialogStyled } from '#/components/ui/dialog/dialog.style'

export const DialogAuthStyled = styled(DialogStyled)`
  overflow: hidden;
  border-radius: 30px;
  position: relative;
  background-color: ${({ theme }) => theme.palette.bg.modal};
  width: 400px;
  height: auto;

  .dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    padding-top: 15px;
    padding-bottom: 20px;

    input {
      width: 300px;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.palette.color.textInvert};
      border: 2px solid ${({ theme }) => theme.palette.bg.highlight};
      padding: 5px 10px;
      border-radius: 35px;
      font-family: monospace;
    }

    button {
      color: ${({ theme }) => theme.palette.color.textInvert};
      cursor: pointer;
    }
  }
`
