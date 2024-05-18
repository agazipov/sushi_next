import crypto from "node:crypto"

export async function generatePassword(salt: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
          password, salt,
          12000,
          128,
          "sha512",
          (err, key) => {
            if (err) return reject(err);
            resolve(key.toString('hex'));
          },
      );
    });
  }

export async function generateSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(128, (err, buffer) => {
            if (err) return reject(err);
            resolve(buffer.toString('hex'));
        });
    });
}

export async function checkPassword(password: string, salt: string) {
    if (!password) return false;
  
    const hash = await generatePassword(salt, password);
    return hash;
  };