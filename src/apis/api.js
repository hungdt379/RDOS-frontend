export const apiUrls = {
  //Authentication
  loginUsername: "api/auth/login",
  loginCustomer: "api/auth/login/table",

  //Customer
  getAllCategories: "api/customer/categories",
  getAllMenus: "api/customer/menu",

  //Waiter
  getAllTables: "api/waiter/tables?page=1&pageSize=10",
  postOpenTable: "api/waiter/table/open",

  //Bai cu
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
