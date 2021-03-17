//最常见的对称加密算法,加密和解密用相同的密钥
import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('JtZ9RzYpN2tEVayl') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('JtZ9RzYpN2tEVayl') // 十六位十六进制数作为密钥偏移量

// 解密方法(Base64)
function Decrypt(word) {
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法(Base64)
function Encrypt(word) {
  // word为Json字符串
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

function Md5(string) {
  return CryptoJS.MD5(string)
}

export { Decrypt, Encrypt, Md5 }
