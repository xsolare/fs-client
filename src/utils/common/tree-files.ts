import type { IFile } from '#/types/models/file.interface'
import type { DataNode } from 'antd/es/tree'
import type { Key } from 'react'

export const buildTree = (files: IFile[], parentId = null, levelFolder = '0') => {
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
        children: [],
        data: file
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

export const findFileInTree = (files: DataNode[], key: Key) => {
  const keyFrame = files[0].key.toString()
  const keyArr = key.toString().split('-').splice(0, keyFrame.split('-').length).join('-')

  for (let i = 0; i < files.length; i++) {
    if (keyArr === files[i].key) {
      if (keyFrame.length === key.toString().length) {
        return files[i]
      } else {
        return findFileInTree(files[i].children, key)
      }
    }
  }

  return null
}
