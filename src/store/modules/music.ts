import { getSongsInfo, getSongsUrl } from '@/api/common'

const useMusicStore = defineStore('music', {
  state: () => ({
    musicInfo: {} as musicInfoType,
    songList: {} as musicInfoType[],
    isPlaying: false,
  }),
  actions: {
    addMusic(ids: number) {
      this.getMusicDetail(ids)
    },

    /**
     * 获取歌曲详情
     */
    async getMusicDetail(ids: number) {
      const res = await getSongsInfo<{ songs: SongType[]; code: number }>(ids)
      const _musicInfo = {
        name: res.songs[0].name,
        id: res.songs[0].al.id,
        picUrl: res.songs[0].al.picUrl,
        author: res.songs[0].ar[0].name,
      } as musicInfoType
      const { url, duration } = await this.getUrl(ids)
      _musicInfo['duration'] = parseInt((duration / 1000).toFixed(0))
      _musicInfo['musicUrl'] = url
      this.musicInfo = _musicInfo
    },
    /**
     * 获取歌曲Url
     */
    async getUrl(ids: number) {
      const res = await getSongsUrl<{ code: number; data: any }>(ids)
      return { url: res.data[0].url, duration: res.data[0].time }
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
