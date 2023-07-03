import type { DirectoryTreeProps } from 'antd/es/tree'
import { Tree } from 'antd'
import { FolderFiles } from '#/components/files/folder-files'
import { HomeStyled } from '#/styles/pages/home.style'
import { buildTree, findFileInTree } from '#/utils/common/tree-files'
const { DirectoryTree } = Tree
import { createMdWithExtension } from '#/utils/common/helpers'
import { FileControl } from '#/components/files/file-control'
import type { IDataNode } from '#/types/models/file.interface'

import MarkdownPreview from '@uiw/react-markdown-preview'

import { useAppStore } from '../../store/common/root-store'

const Home = () => {
  const {
    appStore: {
      state: { mountUrl }
    }
  } = useAppStore()

  const [files, setFiles] = useState<IDataNode[]>([])
  const [content, setContent] = useState<string>('')

  const [selectedFile, setSelectedFile] = useState<IDataNode>({} as IDataNode)

  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

  useEffect(() => {
    api()
      .fs.getFiles(mountUrl)
      .then(({ data }) => setFiles(buildTree(data)))
  }, [])

  const onSelect: DirectoryTreeProps['onSelect'] = (keys) => {
    setSelectedKeys(keys)
    onExpand([...expandedKeys, ...keys])

    const file = findFileInTree(files, keys[0])
    if (!file) return

    setSelectedFile(file)

    if (file.data.type !== 'folder') {
      api()
        .fs.getContentFile(`${file.data.path}`)
        .then(({ data }) => {
          const mdFile = createMdWithExtension(data, file.data.extension)
          setContent(mdFile)
        })
    } else {
      setContent('')
    }
  }

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue)
  }

  return (
    <HomeStyled>
      <div className="panel-files">
        <div className="panel-files-wrapper">
          <DirectoryTree
            autoExpandParent
            showIcon
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onExpand={onExpand}
            onSelect={onSelect}
            treeData={files}
          />
        </div>
      </div>
      <div className="content-files">
        {selectedFile?.data?.type === 'folder' && (
          <FolderFiles handleSelect={onSelect} files={selectedFile.children} />
        )}
        {selectedFile?.data?.type === 'file' && <MarkdownPreview source={content} />}
        <FileControl file={selectedFile} />
      </div>
    </HomeStyled>
  )
}

export default observer(Home)
