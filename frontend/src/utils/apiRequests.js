const baseURL = "http://localhost:2800";

const fetchAPI = async (route, n = 3) => {
  if (n > 0) {
    const response = await fetch(`${baseURL}${route}`);
    const res = await response.json();
    if (!response.ok) {
      console.log(4 - n, "fail");
      return fetchAPI(route, --n);
    } else {
      console.log(4 - n, "try");
      return res;
    }
  } else console.log("no proper response in 3 tries");
};
export default fetchAPI;
