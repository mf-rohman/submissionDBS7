export default function showNotification(title, body) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
            body, 
            icon: "/images/kana-logo512.png"
        });
    }
}