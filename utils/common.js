exports.isMandatory = (field) => {
	return `${field} is mandatory`;
};

exports.notFound = (field) => {
	return `${field} not found`;
};

exports.exist = (field) => {
	return `${field} already exist`;
};

exports.added = (field) => {
	return `${field} added successfully`;
};

exports.updated = (field) => {
	return `${field} updated successfully`;
};

exports.deleted = (field) => {
	return `${field} deleted successfully`;
};

exports.invalidFormat = (field) => {
	return `Invalid format for ${field} field`;
};
