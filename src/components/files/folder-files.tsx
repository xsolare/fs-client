import type { IDataNode } from '#/types/models/file.interface'
import type { DirectoryTreeProps } from 'antd/es/tree'
import type { FC, Key } from 'react'
import { PiFolderSimpleDuotone } from 'react-icons/pi'

interface IProps {
  files: IDataNode[]
  handleSelect: DirectoryTreeProps['onSelect']
}

export const FolderFiles: FC<IProps> = (props) => {
  const { files, handleSelect } = props

  console.log('?', files)

  return (
    <Styled>
      {files.map((file) => (
        <div
          onClick={() => handleSelect([file.key as Key], null)}
          key={file.key}
          className={file.data.type}>
          <div className="icon">
            <PiFolderSimpleDuotone />
          </div>
          <div className="name">{file.data.name}</div>
        </div>
      ))}
    </Styled>
  )
}

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 16px;

  height: auto;
  width: 100%;

  background-color: ${({ theme }) => theme.palette.bg.mainContent};
  border-radius: 24px;

  padding: 16px;

  cursor: pointer;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100px;
    height: 100px;

    background-color: ${({ theme }) => theme.palette.bg.main};
    border-radius: 8px;

    padding: 4px;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;

      > svg {
        width: 50px;
        height: 50px;
      }
    }

    .name {
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.7rem;
      height: 14px;
    }
  }
`
