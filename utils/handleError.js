export const handleHttpError = (
    res,
    message = "Todo se fue alv 💀",
    code = 403 
) => {
    res.status(code);
    res.send({error:message});
};