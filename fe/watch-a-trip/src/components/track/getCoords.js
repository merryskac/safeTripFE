export const getLocation = () => {
	const promise = new Promise((resolve, reject) => {
		{
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position, error) => {
					if (error) {
						reject(error);
					}
					resolve({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				});
			} else {
				reject('Cannot get data.');
			}
		}
	});

	return promise;
};
