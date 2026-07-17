import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-at-least-32-characters-long-change-this-in-env';

/**
 * สร้าง JWT (JSON Web Token) โดยใช้ jsonwebtoken
 * @param payload ข้อมูลที่ต้องการบรรจุ in Token (เช่น id, name, role)
 * @param expiresIn อายุของ Token (เช่น '24h', '7d', '1h')
 */
export function signToken(payload: object, expiresIn: SignOptions['expiresIn'] = '24h'): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn
  });
}

/**
 * ตรวจสอบความถูกต้องและถอดรหัส JWT โดยใช้ jsonwebtoken
 * @param token ตัว JWT String
 * @returns Payload ของ Token หรือ null หาก Token ไม่ถูกต้องหรือหมดอายุ
 */
export function verifyToken<T = unknown>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    return null;
  }
}

/**
 * เข้ารหัสผ่าน (Password Hashing) โดยใช้ Scrypt แบบ Built-in ของ Node.js
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) return false;
    const verifyHash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'));
  } catch {
    return false;
  }
}
