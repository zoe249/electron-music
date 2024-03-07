interface userInfoType {
  userId: number
  nickname: string
  avatarUrl: string
  gender: number
  vipType: number
  [key: string]: any
}
const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as userInfoType,
  }),
  actions: {
    setUserInfo(obj: any) {
      this.userInfo = obj
    },
  },
})

export default useUserStore
