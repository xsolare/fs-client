import { AxiosResponse } from 'axios'

///                                                                                 //
export const FsApi = (instance: AxiosInstance) => ({
  async getFiles(path?: string): Promise<AxiosResponse<any[], any>> {
    return instance.get<any[]>('/api/fs/files', { params: { path } })
  }
})
