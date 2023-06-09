const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userName: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  userAvatar: state => state.user.userInfo.staffPhoto
}
export default getters
