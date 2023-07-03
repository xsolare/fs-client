import type { Flavor } from '../common'
import type { DataNode } from 'antd/es/tree'

export interface IFile {
  id: FileId
  extension: string
  name: string
  parentId: null | FileId
  path: string
  size: string
  type: 'folder' | 'file'
}

export type FileId = Flavor<string, 'FileId'>

export interface IDataNode extends DataNode {
  data: IFile
}
