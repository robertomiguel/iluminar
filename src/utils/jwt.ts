import jwt from 'jsonwebtoken';

export const generateToken = (payload: any) => {
    const key = process.env.JWT_SECRET || '';
    if (!key) throw new Error('JWT_SECRET is not defined')
    return jwt.sign(payload, key, { expiresIn: '1h' });
}

export const isValidToken = async (token: string) => {
    try {
        const key = process.env.JWT_SECRET || '';
        if (!key) throw new Error('JWT_SECRET is not defined')
        return jwt.verify(token, key);
    } catch {
        return false;
    }
}