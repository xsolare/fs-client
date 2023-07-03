import type { AxiosResponse } from 'axios'

///                                                                                 //
export const FsApi = (instance: AxiosInstance) => ({
  async getFiles(path?: string): Promise<AxiosResponse<any[], any>> {
    return instance.get<any[]>('/api/fs/file', { params: { path } })
  },

  async getContentFile(path?: string): Promise<AxiosResponse<string>> {
    return instance.get<string>('/api/fs/file-send', { params: { path } })
  },

  async downloadFile(path?: string): Promise<AxiosResponse<string>> {
    return instance.get<string>('/api/fs/file-download', {
      headers: { responseType: 'blob' },
      params: { path }
    })
  }
})
