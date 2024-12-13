import User from '../models/user';
import RestError from '../errors/rest-errors';

interface UserData {
    id: string;
    email: string;
    name: string;
}

// function generateToken(params = {}, expiresIn = 86400) {
//     return jwt.sign(params, process.env.AUTH_CRYPT_SECRET, {
//         expiresIn: expiresIn,
//     });
// }

class UserRepository {
    async storeUser(userData: UserData): Promise<Omit<UserData, 'createdAt' | 'updatedAt'>> {
        const { id, email, name } = userData;

        try {
            let user = await User.findOne({ where: { id } });

            if (!user) {
                user = await User.create({
                    id,
                    email,
                    name,
                });
            }

            const { createdAt, updatedAt, ...result } = user.get({ plain: true });
            return result;
        } catch (error) {
            throw new RestError(`${error}`, 400);
        }
    }
}

export default new UserRepository();
