import Cookies from 'js-cookie'

const TokenKey = TNSessionId;

export default {
		function getToken() {
	    return Cookies.get(TokenKey)
	}
}
