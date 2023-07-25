const { authService } = require("./services/authService");

async function execute(context, req, func) {
    const { authorized, newContext } = authService.isUserAuthorized(req, context);
    if (!authorized) {
        return newContext;
    }
    func(req, res);
}

module.exports = { execute }