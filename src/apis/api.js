export const apiUrls = {
  //Authentication
  loginUsername: "api/auth/login",
  loginCustomer: "api/auth/login/table",

  //Customer
  getAllCategories: "api/customer/categories",
  getAllMenus: "api/customer/menu",
  getAllSearchs: "api/search",
  displayFoodInCombo: "api/customer/menu/item/detail",
  addToCartApi: "api/customer/cart/item/add",
  getCartApi: "api/customer/cart",

  callWaiter: "api/customer/call/waiter",
  callPayment: "api/customer/call/payment",
  sendFeedbackApi: "api/customer/feedback",

  //Receptionist
  getNotificationsReceptionist: "api/receptionist/notifications",
  viewFeedbackApi: "api/receptionist/feedback",
  maskAsReadReceptionistApi: "api/receptionist/notifications/read",

  //Waiter
  getAllTables: "api/waiter/tables?page=1&pageSize=15",
  postOpenTable: "api/waiter/table/open",
  getTableByID: "api/waiter/table/id",
  getAllNotifications: "api/waiter/table/notifications",
  postUpdateTable: "api/waiter/table/update",
  postCloseTableApi:"api/waiter/table/close",

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
