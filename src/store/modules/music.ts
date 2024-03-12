import { getSongsInfo, getSongsUrl } from '@/api/common'
interface musicInfoType {
  name: string
  musicUrl: string
  id: string
  picUrl: string
  author: string
}
const useMusicStore = defineStore('music', {
  state: () => ({
    musicInfo: {} as musicInfoType,
    songList: {} as musicInfoType[],
    isPlaying: false,
  }),
  actions: {
    addMusic(ids: string) {
      this.getMusicDetail(ids)
    },

    /**
     * 获取歌曲详情
     */
    async getMusicDetail(ids: string) {
      const res = await getSongsInfo<{ songs: any; code: number }>(ids)
      const _musicInfo = {
        name: res.songs[0].al.name,
        id: res.songs[0].al.id,
        picUrl: res.songs[0].al.picUrl,
        author: res.songs[0].ar[0].name,
      } as musicInfoType
      _musicInfo['musicUrl'] = await this.getUrl(ids)
      this.musicInfo = _musicInfo
    },
    /**
     * 获取歌曲Url
     */
    async getUrl(ids: string) {
      const res = await getSongsUrl<{ code: number; data: any }>(ids)
      return res.data[0].url
    },

    /**
     * 歌曲播放
     */
    play() {
      this.isPlaying = true
    },
    /**
     * 歌曲暂停
     */
    paused() {
      this.isPlaying = false
    },
  },
})

export default useMusicStore
