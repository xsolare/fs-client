import type { IDialogWrapperStylePropsBase } from '@nord-clan/loc-track-ui-kit'

const width = '200px'

export const MenuStyled = styled.div<IDialogWrapperStylePropsBase>`
  position: fixed;
  top: 55px;
  right: 5px;
  z-index: 5;

  width: ${width};
  height: auto;

  color: ${({ theme }) => theme.palette.color.header};
  background-color: ${({ theme }) => theme.palette.bg.headerBlur};
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  backdrop-filter: blur(8px) saturate(180%);
  border: 1px solid ${({ theme }) => theme.palette.border.header};
  border-radius: 25px 0 25px 25px;
  padding: 15px;

  ${({ isVisible, isNotAnimate, delay }) =>
    isNotAnimate || !isVisible
      ? ''
      : `
        animation: dialog-open ${delay / 1000}s cubic-bezier(0.075, 0.82, 0.165, 1);
    `}

  ${({ isLock, isNotAnimate, delay }) =>
    isNotAnimate || !isLock
      ? ''
      : `
        animation: dialog-close ${delay / 1000 + 0.1}s cubic-bezier(0.215, 0.61, 0.355, 1);
    `}


  .content {
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 15px;
    cursor: pointer;

    h3 {
      margin: 0;
      margin-bottom: 10px;
    }
  }

  .control {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    flex-direction: row;
    gap: 4px;

    > div {
      cursor: pointer;
      padding: 4px;
      width: 28px;
      height: 28px;

      svg {
        width: 100%;
        height: 100%;
      }

      &:hover {
        svg {
          color: ${({ theme }) => theme.palette.bg.highlight};
        }
      }
    }
  }
`
