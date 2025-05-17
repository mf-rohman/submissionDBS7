export default function urlBase64ToUint8Array(base64String) {
  if (typeof base64String !== "string" || !base64String.length) {
    throw new Error("❌ VAPID key must be a non-empty string.");
  }
  const base64 = base64String
    .padEnd(base64String.length + ((4 - (base64String.length % 4)) % 4), "=")
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);

  return new Uint8Array(rawData.split("").map((char) => char.charCodeAt(0)));
}
