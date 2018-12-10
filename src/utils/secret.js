const CryptoJS = require('crypto-js')

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF") // 密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 偏移量

//加密方法
function Encrypt(src) {
  const encrypted = CryptoJS.AES.encrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return encrypted.ciphertext.toString()
}

//解密方法
function Decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)

  return decryptedStr.toString()
}

export default {
  Decrypt,
  Encrypt
}
