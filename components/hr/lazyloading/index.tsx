export default function lazyLoadVideos() {
    document.addEventListener("DOMContentLoaded", () => {
        const videoElements = document.querySelectorAll<HTMLIFrameElement>(
            "iframe[loading='lazy']"
        );

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const videoSrc = entry.target.getAttribute("data-src");
                        entry.target.setAttribute("src", videoSrc!);
                        observer.unobserve(entry.target);
                    }
                });
            });

            videoElements.forEach((video) => {
                observer.observe(video);
            });
        } else {
            videoElements.forEach((video) => {
                const videoSrc = video.getAttribute("data-src");
                video.setAttribute("src", videoSrc!);
            });
        }
    });

}