/**
 * Created by sunchengbin on 16/6/29.
 */
define(['base64'],function(Base64){
    function Xxtea(privateKey)
    {
        this._keyString = privateKey;
    }

//将长整形转换为string,private
    Xxtea.prototype._long2str = function(v, w)
    {
        var vl = v.length;
        var n = (vl - 1) << 2;
        if (w) {
            var m = v[vl - 1];
            if ((m < n - 3) || (m > n)) return null;
            n = m;
        }
        for (var i = 0; i < vl; i++) {
            v[i] = String.fromCharCode(v[i] & 0xff,
                v[i] >>> 8 & 0xff,
                v[i] >>> 16 & 0xff,
                v[i] >>> 24 & 0xff);
        }
        if (w) {
            return v.join('').substring(0, n);
        }
        else {
            return v.join('');
        }
    }

//将string转换为long,private
    Xxtea.prototype._str2long = function(s, w)
    {
        var len = s.length;
        var v = [];
        for (var i = 0; i < len; i += 4) {
            v[i >> 2] = s.charCodeAt(i)
                | s.charCodeAt(i + 1) << 8
                | s.charCodeAt(i + 2) << 16
                | s.charCodeAt(i + 3) << 24;
        }
        if (w) {
            v[v.length] = len;
        }
        return v;
    }

//function: encrypt str with private key by xxtea
    Xxtea.prototype.xxtea_encrypt = function(str)
    {
        if (str == "") {
            return "";
        }
        str = UtfParser.utf16to8(str);
        var v = this._str2long(str, true);
        var k = this._str2long(this._keyString, false);
        if (k.length < 4) {
            k.length = 4;
        }
        var n = v.length - 1;

        var z = v[n], y = v[0], delta = 0x9E3779B9;
        var mx, e, p, q = Math.floor(6 + 52 / (n + 1)), sum = 0;
        while (0 < q--) {
            sum = sum + delta & 0xffffffff;
            e = sum >>> 2 & 3;
            for (p = 0; p < n; p++) {
                y = v[p + 1];
                mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
                z = v[p] = v[p] + mx & 0xffffffff;
            }
            y = v[0];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            z = v[n] = v[n] + mx & 0xffffffff;
        }

        return Base64.encode(this._long2str(v, false));
    }

//function: decrypt str with private key by xxtea
    Xxtea.prototype.xxtea_decrypt = function(str)
    {
        if (str == "") {
            return "";
        }
        str = Base64.decode(str);
        if(str == null) return null;
        var v = this._str2long(str, false);
        var k = this._str2long(this._keyString, false);
        if (k.length < 4) {
            k.length = 4;
        }
        var n = v.length - 1;

        var z = v[n - 1], y = v[0], delta = 0x9E3779B9;
        var mx, e, p, q = Math.floor(6 + 52 / (n + 1)), sum = q * delta & 0xffffffff;
        while (sum != 0) {
            e = sum >>> 2 & 3;
            for (p = n; p > 0; p--) {
                z = v[p - 1];
                mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
                y = v[p] = v[p] - mx & 0xffffffff;
            }
            z = v[n];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            y = v[0] = v[0] - mx & 0xffffffff;
            sum = sum - delta & 0xffffffff;
        }
        return UtfParser.utf8to16(this._long2str(v, true));
    }


//Class:utf16 to utf8, utf8 ot utf16
//Author:Tecky
//Date:2008-06-03
    function UtfParser()
    {
        //all method is static
    }

//function:change utf16 to utf8
//parms(str):string that you want to change
    UtfParser.utf16to8 = function (str)
    {
        var out, i, len, c;

        out = "";
        len = str.length;
        for(i = 0; i < len; i++)
        {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F))
            {
                out += str.charAt(i);
            }
            else if (c > 0x07FF)
            {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
            else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    }


//function:change utf8 to utf16
//parms(str):string that you want to change
    UtfParser.utf8to16 = function (str)
    {
        str = ( str && str.toString() ) || '';

        var out, i, len, c;
        var char2, char3;

        out = "";
        len = str.length;
        i = 0;
        while(i < len) {
            c = str.charCodeAt(i++);
            switch(c >> 4)
            {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i-1);
                break;
                case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    };
    return Xxtea;
})