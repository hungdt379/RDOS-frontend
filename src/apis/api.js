export const apiUrls = {
  loginWithGoogle: "api/auth/google/login",
  getAllFriend: "api/profiles",
  getDepartment: "api/groups",
  getInfoUser: "api/user/profiles",
  getAllNewsfeed: "api/home/thanks/newsfeed",
  updateProfile: "/api/profiles/id",
  listTopThank: "api/home/thanks/top/user",
  postThank: "api/home/thanks",
  getAnnouncement: "api/home/announcements?{page=...}",
  totalOfNotifications: "api/home/notifications/new",
  getNotificationOfUser: "/api/home/notifications",
  getPostDetail: (id) => `api/home/thanks/${id}`,
  postSeenUser: (id) => `api/posts/${id}/viewer`,
  reactionUser: (id) => `api/posts/${id}/reactions`,
  postPersonal: (id) => `api/personal/thanks/${id}`,
};
