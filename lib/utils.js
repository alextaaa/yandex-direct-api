function deepMerge (target, source) {
	for (var key in source) {
		var original = target[key];
		var next = source[key];
		if (original && next && typeof next == "object") {
			deepMerge(original, next);
		} else if (original == undefined) {
			target[key] = next;
		}
	}
	return target;
}

exports.deepMerge = deepMerge;