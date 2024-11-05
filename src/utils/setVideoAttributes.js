export default function setVideoAttributes(gifContainer, video, src) {
    gifContainer.id = "gifContainer"
    video.type = "video/mp4"
    gifContainer.autoPlay = true
    gifContainer.loop = true
    gifContainer.type = "video/mp4"
    gifContainer.className = "meme--image"
    video.src = src
    gifContainer.play()
}