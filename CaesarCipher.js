class CaesarCipher {
    static upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static lower = "abcdefghijklmnopqrstuvwxyz";
    static digits = "0123456789";
    text;
    key;

    constructor(text, key) {
        this.text = text;
        this.key = key;
    }

    isError() {
        if (this.text.length < 1) {
            return "Empty input. Please enter a valid text.";
        }
        if (!this.TryParseKey()) {
            return "Invalid key. Please enter a key from 1 to 25.";
        }
        return null;
    }

    Encrypt() {
        let e = "";
        for (let i = 0; i < this.text.length; i++) {
            const character = this.text.charAt(i);
            if (CaesarCipher.upper.indexOf(character) !== -1) {
                e += CaesarCipher.upper.charAt((CaesarCipher.upper.indexOf(character) + this.key) % 26);
            } else if (CaesarCipher.lower.indexOf(character) !== -1) {
                e += CaesarCipher.lower.charAt((CaesarCipher.lower.indexOf(character) + this.key) % 26);
            } else if (CaesarCipher.digits.indexOf(character) !== -1) {
                e += CaesarCipher.digits.charAt((CaesarCipher.digits.indexOf(character) + this.key) % 10);
            } else {
                e += character;
            }
        }
        return e;
    }

    Decrypt() {
        let d = "";
        for (let i = 0; i < this.text.length; i++) {
            const character = this.text.charAt(i);
            if (CaesarCipher.upper.indexOf(character) !== -1) {
                d += CaesarCipher.upper.charAt((CaesarCipher.upper.indexOf(character) - this.key + 26) % 26);
            } else if (CaesarCipher.lower.indexOf(character) !== -1) {
                d += CaesarCipher.lower.charAt((CaesarCipher.lower.indexOf(character) - this.key + 26) % 26);
            } else if (CaesarCipher.digits.indexOf(character) !== -1) {
                let n = (CaesarCipher.digits.indexOf(character) - this.key) % 10;
                d += CaesarCipher.digits.charAt(n < 0 ? n + 10 : n);
            } else {
                d += character;
            }
        }
        return d;
    }

    TryParseKey() {
        if (this.key == null) return null;
        if (this.key.length < 1) return null;
        if (!isNaN(this.key)) {
            this.key = parseInt(this.key);
            return true;
        }
        return null;
    }
}