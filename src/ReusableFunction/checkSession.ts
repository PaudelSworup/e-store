export async function checkAndRemoveUserData() {
  const loginTime = localStorage.getItem("loginTime");

  if (loginTime) {
    const currentTime = Date.now();
    const TEN_MINUTES = 2 * 60 * 1000;

    if (currentTime - parseInt(loginTime) > TEN_MINUTES) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("loginTime");
      // Optionally, redirect the user or take some action
    }
  }
}
