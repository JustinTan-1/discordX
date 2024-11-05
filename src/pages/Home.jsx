import Header from "../components/Header"
import Frog from "../assets/pepe.png"
import {reveal} from "../utils/animation"
import {motion} from "framer-motion"

export default function Home() {
    return (
        <div>
        <Header />
        <motion.div variants={reveal} initial="hiddenVariant" animate="revealedVariant" transition={{
            ease: "easeIn",
            type: "tween",
            staggerChildren: 0.1,
            duration: 0.5}} className="home--content">
            <h1 className="home--text">Welcome to Meme Generator</h1>
        <div className="video--container">
        <video autoPlay={true} loop={true} className="home--videos vid1" >
            <source src="https://media.tenor.com/vTjgtOd-evkAAAPw/torture-dance-jojo.mp4"/>
        </video>
        <video autoPlay={true} loop={true} className="home--videos vid2" >
            <source src="https://media.tenor.com/vTjgtOd-evkAAAPw/torture-dance-jojo.mp4"/>
        </video>
        <video autoPlay={true} loop={true} className="home--videos vid3" >
            <source src="https://media.tenor.com/vTjgtOd-evkAAAPw/torture-dance-jojo.mp4"/>
        </video>
        <video autoPlay={true} loop={true} className="home--videos vid4" >
            <source src="https://media.tenor.com/vTjgtOd-evkAAAPw/torture-dance-jojo.mp4"/>
        </video>
        </div>
        </motion.div>
        </div>
    )
}