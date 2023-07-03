import type { IDataNode } from '#/types/models/file.interface'
import type { FC } from 'react'
import { MdDownload, MdUpload } from 'react-icons/md'

interface IProps {
  file: IDataNode
}

export const FileControl: FC<IProps> = (props) => {
  const { file } = props

  const handleDownload = async () => {
    const { data } = await api().fs.downloadFile(`${file.data.path}`)

    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')

    link.href = url
    link.setAttribute('download', `${file.title}`)
    document.body.appendChild(link)
    link.click()
  }

  const handleUpload = () => {
    // const formData = new FormData()
    // formData.append('file', fileInput.files[0])
  }

  if (!file) return null

  return (
    <Styled>
      {file.data?.type === 'folder' && <MdUpload onClick={handleUpload} />}
      {file.data?.type === 'file' && <MdDownload onClick={handleDownload} />}
    </Styled>
  )
}

const Styled = styled.div`
  position: fixed;
  z-index: 3;

  right: 10px;
  bottom: 10px;

  height: 38px;
  width: 38px;

  background-color: ${({ theme }) => theme.palette.bg.headerBlur};
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  backdrop-filter: blur(8px) saturate(180%);
  border-right: 1px solid ${({ theme }) => theme.palette.border.header};
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.header};
  border-radius: 4px;

  padding: 8px;

  cursor: pointer;

  > svg {
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.palette.color.header};
  }
`
