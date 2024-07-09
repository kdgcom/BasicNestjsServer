import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';
import { MyConst } from 'src/const/MyConst';

export async function encryptAES256( str: string): Promise<string>
{
  return await _encrypt(str);
}
export async function decryptAES256( str: string ): Promise<string>
{
  return await _decrypt(str);
}
export async function encryptCHACHA20( str: string): Promise<string>
{
  return await _encrypt(str);
}
export async function decryptCHACHA20( str: string ): Promise<string>
{
  return await _decrypt(str);
}
/**
 * aes-256으로 암호화
 * iv 값을 암호화 문자열의 앞에 붙여두는 방식이다.
 * @param str 
 * @returns 
 */
async function _encrypt( str: string, algorithm="aes-256-ctr"): Promise<string>
{
  const iv = randomBytes(16);
  const password = MyConst.ENCRYPT_TEXT_PW;
  const key = (scryptSync(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv(algorithm, key, iv);

  const encryptedText = Buffer.concat([
    cipher.update(str),
    cipher.final(),
  ]);

  return iv.toString('hex') + encryptedText.toString('hex');
}

/**
 * aes-256으로 복호화
 * iv 값을 암호화 문자열의 앞에 붙여두는 방식이다.
 * @param str 
 */
async function _decrypt( str: string, algorithm="aes-256-ctr" ): Promise<string>
{
  const iv = Buffer.from(str.slice(0, 32), 'hex');
  const encrypted = Buffer.from(str.slice(32), 'hex'); // 나머지는 암호화된 데이터
  const encryptedStr = str.slice(32); // 나머지는 암호화된 데이터


  const password = MyConst.ENCRYPT_TEXT_PW;
  const key = ((scryptSync)(password, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv(algorithm, key, iv);
  const decryptedText = decipher.update(encryptedStr, 'hex', 'utf8') + decipher.final('utf8');

  return decryptedText;
}