import type { DirectoryTreeProps } from 'antd/es/tree'
import { Tree } from 'antd'
import { HomeStyled } from '#/styles/pages/home.style'
import { buildTree, findFileInTree } from '#/utils/common/tree-files'
const { DirectoryTree } = Tree
import MarkdownPreview from '@uiw/react-markdown-preview'
import { createMdWithExtension } from '#/utils/common/helpers'
import { FileControl } from '#/components/files/file-control'
import type { IDataNode, IFile } from '#/types/models/file.interface'
import { useAppStore } from '../../store/common/root-store'

const Home = () => {
  const {
    appStore: {
      state: { mountUrl }
    }
  } = useAppStore()

  const [files, setFiles] = useState<IDataNode[]>([])
  const [selectedFile, setSelectedFile] = useState<IFile>({} as IFile)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    api()
      .fs.getFiles(mountUrl)
      .then(({ data }) => setFiles(buildTree(data)))
  }, [])

  const onSelect: DirectoryTreeProps['onSelect'] = (keys) => {
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
    }
  }

  // const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
  //   console.log('Trigger Expand', keys, info)
  // }

  return (
    <HomeStyled>
      <div className="panel-files">
        <div className="panel-files-wrapper">
          {files && (
            <DirectoryTree
              // showIcon
              // showLine
              // onExpand={onExpand}
              onSelect={onSelect}
              treeData={files}
            />
          )}
        </div>
      </div>
      {content && (
        <div className="content-files">
          <MarkdownPreview source={content} />
          <FileControl file={selectedFile} />
        </div>
      )}
    </HomeStyled>
  )
}

export default observer(Home)
