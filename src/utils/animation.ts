export const reveal = {
    hiddenVariant: { y:50, opacity: 0 },
    revealedVariant: {
        y:0,
        opacity:1,
    },
};

export const popup = {
    initial: {
        opacity: 0,
        y: 50
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeInOut",
            duration: 0.5
        }
    },
    exit: {
        y: 50,
        scale: 1,
        transition: {
            ease: "easeInOut",
            duration: 0.4
        },
        opacity: 0
    }
}