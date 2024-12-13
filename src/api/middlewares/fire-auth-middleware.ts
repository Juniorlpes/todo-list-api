import {  Response, NextFunction } from 'express';
import AuthenticatedRequest from '../shared/autenticated-request';

import admin from 'firebase-admin';

export default async function isAuthenticated(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
): Promise<void> {
    const auth = admin.auth();
    const jwt = request.headers.authorization;

    if (!jwt) {
        response.status(401).json({ message: "Usuário sem autenticação" });
        return;
    }

    let decodedIdToken: admin.auth.DecodedIdToken;
    try {
        decodedIdToken = await auth.verifyIdToken(jwt, true);
    } catch (e) {
        response.status(401).json({ message: "Usuário não autenticado" });
        return;
    }

    // Adiciona informações do usuário autenticado à requisição
    request.userId = decodedIdToken.uid;
    request.userEmail = decodedIdToken.email;
    // request.user = {
    //     uid: decodedIdToken.uid
    // }

    next();
}
