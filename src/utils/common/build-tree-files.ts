export const buildTree = (files, parentId = null, levelFolder = '0') => {
  const treeData = []

  let levelFile = 0

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    if (file.parentId === parentId) {
      const key = `${levelFolder}-${levelFile}`
      const node = {
        title: file.name,
        key: key,
        isLeaf: file.type !== 'folder',
        children: []
      }

      const children = buildTree(files, file.id, `${levelFolder}-${levelFile}`)
      if (children.length > 0) {
        node.children = children
      }

      treeData.push(node)
      ++levelFile
    }
  }

  return treeData
}
