const admin = require("firebase-admin");

module.exports = async function isAutheticated(request, response, next) {
    const auth = admin.auth();
    const jwt = request.headers.authorization;

    if (!jwt) {
        response.status(401).json({ "message": "Usuário sem autenticação" });
        return;
    }

    let decodedIdToken;
    try {
        decodedIdToken = await auth.verifyIdToken(jwt, true);
    } catch (e) {
        response.status(401).json({ "message": "Usuário nn autenticado" });
        return;
    }

    request.userId = decodedIdToken.uid;
    request.userEmail = decodedIdToken.email;
    // request.user = {
    //     uid: decodedIdToken.uid
    // }

    next();
}