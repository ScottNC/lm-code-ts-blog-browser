export function getQuery(queryObj : {[key in string]: string}) {
	return Object.entries(queryObj).reduce((query: string , [key, value] : [string, string]) => {
		if (value !== '') {
			query += (query === '' ? '?' : '&') + key + '=' + value;
		}

		return query;
	}, '');
}
