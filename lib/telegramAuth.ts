
export function transformInitData(initData) {
  return Object.fromEntries(new URLSearchParams(initData));
}
  
export function createDataCheckStringFromUserData({hash, ...user_data}: any): string {
  const key = Object
    .keys(user_data)
    .map(key => `${key}=${user_data[key]}`)
  key.sort()

  return key.join(`\n`)
}
