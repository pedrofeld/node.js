export const logMiddleware = (req, res, next) => {
    console.log("Hello middleware");

    next();
}