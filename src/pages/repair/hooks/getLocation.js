export function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const now = new Date();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            err: 0,
            time: now.toLocaleTimeString(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          resolve({
            err: -1,
            latitude: -1,
            longitude: -1,
          });
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
      );
    } else {
      reject({ error: -2, latitude: -1, longitude: -1 });
    }
  });
}
