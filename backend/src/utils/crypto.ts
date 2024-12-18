import crypto from "node:crypto";
import dotenv from "dotenv"
dotenv.config({ path: '.env' })

const CRYPTO_ENCRYPTION_KEY = process?.env.CRYPTO_ENCRYPTION_KEY || '47ec1a622f7245d8aceb031ef71b7db4';
const ALGORITHM = 'aes-256-cbc';

function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(CRYPTO_ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(encryptedText: string = CRYPTO_ENCRYPTION_KEY) {
  if (!encryptedText) return null
  const [iv, encrypted] = encryptedText.split(':');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(CRYPTO_ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const generateCodeVerifier = () => {
  return crypto.randomBytes(32).toString('hex')
};

const generateCodeChallenge = (verifier: string = CRYPTO_ENCRYPTION_KEY) => {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
};

export { encrypt, decrypt, generateCodeVerifier, generateCodeChallenge }