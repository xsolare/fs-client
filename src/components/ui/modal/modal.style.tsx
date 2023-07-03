import styled from '@emotion/styled'

export const ModalStyled = styled.div`
  .alert {
    &-warning {
      box-shadow: -10px 0 10px -10px #ffd000, 0px 12px 32px 6px rgba(121, 138, 146, 0.2);
      border-left: 8px solid #ffd000;

      svg {
        color: #ffd000;
      }
    }

    &-error {
      box-shadow: -10px 0 10px -10px tomato, 0px 12px 32px 6px rgba(121, 138, 146, 0.2);
      border-left: 8px solid tomato;

      svg {
        color: tomato;
      }
    }

    &-success {
      box-shadow: -10px 0 10px -10px #00a954, 0px 12px 32px 6px rgba(121, 138, 146, 0.2);
      border-left: 8px solid #00a954;

      svg {
        color: #00a954;
      }
    }

    &-info {
      box-shadow: -10px 0 10px -10px grey, 0px 12px 32px 6px rgba(121, 138, 146, 0.2);
      border-left: 8px solid grey;

      svg {
        color: grey;
      }
    }

    &-processing {
      box-shadow: -10px 0 10px -10px ${({ theme }) => theme.palette?.bg.highlight},
        0px 12px 32px 6px rgba(121, 138, 146, 0.2);
      border-left: 8px solid ${({ theme }) => theme.palette?.bg.highlight};

      svg {
        color: ${({ theme }) => theme.palette?.color.textInvert};
        animation-name: spin;
        animation-duration: 800ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      }
    }
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    max-height: 100vh;

    position: relative;
    padding: 24px;
    padding-right: 32px;
    padding-left: 92px;
    box-sizing: border-box;

    border-radius: 14px;
    background: ${({ theme }) => theme.palette?.bg.modal};
    border-left: 8px solid ${({ theme }) => theme.palette?.bg.highlight};
    color: ${({ theme }) => theme.palette?.color.textInvert};

    .modal-promt {
      min-width: 150px;
      max-height: 500px;
      overflow-y: auto;
      font-size: 16px;
      background: none;
      border: none;
      white-space: pre-line;
    }

    .modal-header {
      position: relative;
      font-size: 22px;
      font-weight: 500;
      line-height: 28px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 0;

      .icon-wrapper {
        position: absolute;
        left: -70px;
        top: 6px;
        border-radius: 50%;
        line-height: 0;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          padding: 6px;
          width: 100%;
          height: 100%;
        }
      }
    }

    .modal-footer {
      margin-top: 16px;

      width: 100%;
      height: 100%;

      display: flex;
      justify-content: flex-end;
      gap: 20px;
    }
  }

  .button {
    background-color: ${({ theme }) => theme.palette?.bg.modalContent};
    border: 1px solid ${({ theme }) => theme.palette?.border.content};
    color: ${({ theme }) => theme.palette?.color.textInvert};
  }

  @keyframes dialog-open {
    0% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes dialog-close {
    0% {
      opacity: 1;
      transform: scale(1);
    }

    70% {
      opacity: 0;
    }

    100% {
      transform: scale(0.9);
      opacity: 0;
    }
  }

  @keyframes dialog-open-before {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes dialog-close-before {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`
