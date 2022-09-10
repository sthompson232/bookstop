export const getCookie = (name: string) => {
	interface Cookies {
		[key: string]: any
	}
  let cookies: Cookies = {};
  document.cookie.split(';').forEach((cookie: string) => {
    const [name, value]: string[] = cookie.split('=');
		console.log(name, value)
    cookies[name.trim()] = value;
	})
  return cookies[name];
}

export const setCookie = (name: string, value: string, days?: number) => {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
	
export const deleteCookie = (name: string) => {   
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
