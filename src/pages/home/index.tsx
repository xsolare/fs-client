import type { DataNode, DirectoryTreeProps } from 'antd/es/tree'
import { Tree } from 'antd'
import { HomeStyled } from '#/styles/pages/home.style'
import { buildTree } from '#/utils/common/build-tree-files'

const { DirectoryTree } = Tree

const Home = () => {
  const [files, setFiles] = useState<DataNode[]>([])

  useEffect(() => {
    api()
      .fs.getFiles()
      .then(({ data }) => {
        const tree = buildTree(data)
        console.log('tree', tree)
        setFiles(tree)
      })
  }, [])

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info)
  }

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info)
  }

  return (
    <HomeStyled>
      <div className="panel-files">
        {files && (
          <DirectoryTree
            showIcon
            showLine
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={files}
          />
        )}
      </div>
      <div className="content-files">TODO</div>
    </HomeStyled>
  )
}

export default observer(Home)
