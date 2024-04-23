// This file manages the list of revoked tokens

const revokedTokens = new Set();

async function addToRevocationList(token) {
	revokedTokens.add(token);
}

async function isTokenRevoked(token) {
	return revokedTokens.has(token);
}

module.exports = {
	addToRevocationList,
	isTokenRevoked,
};
