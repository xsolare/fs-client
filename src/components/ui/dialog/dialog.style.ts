import styled from '@emotion/styled'

import { Dialog } from './dialog'

export const DialogStyled = styled(Dialog)`
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40;

    &-text {
      color: ${({ theme }) => theme.palette.color.textInvert};
    }
  }
  .dialog-content {
    .list {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap: 10px;
      padding: 10px;
    }

    .item {
      list-style-type: none;

      cursor: pointer;
      color: ${({ theme }) => theme.palette.color.textInvert};

      font-size: 1.25rem;

      &:hover {
        transform: scale(1.05);
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        .item-inner {
          border: 1px solid ${({ theme }) => theme.palette.bg.highlight};
          box-shadow: 0 0 2px ${({ theme }) => theme.palette.bg.highlight};
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .item-back {
          opacity: 0;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      }
      transition: all 0.2s ease-in-out;

      &-back {
        background: linear-gradient(
          180deg,
          transparent,
          transparent,
          rgba(20, 20, 20, 0.05) 0,
          ${({ theme }) => theme.palette.bg.modal}
        );
        opacity: 1;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        transition: all 0.2s ease-in-out;
      }

      &-inner {
        width: 180px;
        height: 180px;
        border-radius: 5px;
        overflow: hidden;

        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid ${({ theme }) => theme.palette.border.content};
        transition: all 0.2s ease-in-out;
      }

      &-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &-title {
        position: absolute;
        bottom: 5px;

        text-align: center;
        z-index: 15;
      }
    }
  }
  .dialog-footer {
    .close {
      position: absolute;
      top: -30px;
      right: -30px;

      height: 70px;
      width: 70px;

      background-color: ${({ theme }) => theme.palette.bg.modalContent};
      border-radius: 50%;

      padding: 35px 35px 5px 5px;

      cursor: pointer;

      &:hover {
        box-shadow: 0 0 25px ${({ theme }) => theme.palette.bg.highlight};
        transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      transition: all 0.2s ease-out;

      svg {
        width: 100%;
        height: 100%;
        fill: ${({ theme }) => theme.palette.color.textInvert};
      }
    }
  }
`
