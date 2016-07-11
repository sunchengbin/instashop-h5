define(['base64','jsbn'],function(Base64,BigInteger){
    var RSAPublicKey = function($modulus, $encryptionExponent) {
        this.modulus = new BigInteger(Hex.encode($modulus), 16);
        this.encryptionExponent = new BigInteger(Hex.encode($encryptionExponent), 16);
    };
    var Hex = {
        hex: "0123456789abcdef",
        encode: function($input) {
            if(!$input) return false;
            var $output = "";
            var $k;
            var $i = 0;
            do {
                $k = $input.charCodeAt($i++);
                $output += this.hex.charAt(($k >> 4) &0xf) + this.hex.charAt($k & 0xf);
            } while ($i < $input.length);
            return $output;
        },
        decode: function($input) {
            if(!$input) return false;
            $input = $input.replace(/[^0-9abcdef]/g, "");
            var $output = "";
            var $i = 0;
            do {
                $output += String.fromCharCode(((this.hex.indexOf($input.charAt($i++)) << 4) & 0xf0) | (this.hex.indexOf($input.charAt($i++)) & 0xf));
            } while ($i < $input.length);
            return $output;
        }
    };

    var ASN1Data = function($data) {
        this.error = false;
        this.parse = function($data) {
            if (!$data) {
                this.error = true;
                return null;
            }
            var $result = [];
            while($data.length > 0) {
                // get the tag
                var $tag = $data.charCodeAt(0);
                $data = $data.substr(1);
                // get length
                var $length = 0;
                // ignore any null tag
                if (($tag & 31) == 0x5) $data = $data.substr(1);
                else {
                    if ($data.charCodeAt(0) & 128) {
                        var $lengthSize = $data.charCodeAt(0) & 127;
                        $data = $data.substr(1);
                        if($lengthSize > 0) $length = $data.charCodeAt(0);
                        if($lengthSize > 1)    $length = (($length << 8) | $data.charCodeAt(1));
                        if($lengthSize > 2) {
                            this.error = true;
                            return null;
                        }
                        $data = $data.substr($lengthSize);
                    } else {
                        $length = $data.charCodeAt(0);
                        $data = $data.substr(1);
                    }
                }
                // get value
                var $value = "";
                if($length) {
                    if ($length > $data.length){
                        this.error = true;
                        return null;
                    }
                    $value = $data.substr(0, $length);
                    $data = $data.substr($length);
                }
                if ($tag & 32)
                    $result.push(this.parse($value)); // sequence
                else
                    $result.push(this.value(($tag & 128) ? 4 : ($tag & 31), $value));
            }
            return $result;
        };
        this.value = function($tag, $data) {
            if ($tag == 1)
                return $data ? true : false;
            else if ($tag == 2) //integer
                return $data;
            else if ($tag == 3) //bit string
                return this.parse($data.substr(1));
            else if ($tag == 5) //null
                return null;
            else if ($tag == 6){ //ID
                var $res = [];
                var $d0 = $data.charCodeAt(0);
                $res.push(Math.floor($d0 / 40));
                $res.push($d0 - $res[0]*40);
                var $stack = [];
                var $powNum = 0;
                var $i;
                for($i=1;$i<$data.length;$i++){
                    var $token = $data.charCodeAt($i);
                    $stack.push($token & 127);
                    if ( $token & 128 )
                        $powNum++;
                    else {
                        var $j;
                        var $sum = 0;
                        for($j=0;$j<$stack.length;$j++)
                            $sum += $stack[$j] * Math.pow(128, $powNum--);
                        $res.push($sum);
                        $powNum = 0;
                        $stack = [];
                    }
                }
                return $res.join(".");
            }
            return null;
        }
        this.data = this.parse($data);
    };

    var RSA = {
        getPublicKey: function($pem) {
            if($pem.length<50) return false;
            if($pem.substr(0,26)!="-----BEGIN PUBLIC KEY-----") return false;
            $pem = $pem.substr(26);
            if($pem.substr($pem.length-24)!="-----END PUBLIC KEY-----") return false;
            $pem = $pem.substr(0,$pem.length-24);
            $pem = new ASN1Data(Base64.decode($pem));
            if($pem.error) return false;
            $pem = $pem.data;
            if($pem[0][0][0]=="1.2.840.113549.1.1.1")
                return new RSAPublicKey($pem[0][1][0][0], $pem[0][1][0][1]);
            return false;
        },
        encrypt: function($data, $pubkey) {
            if (!$pubkey) return false;
            var bytes = ($pubkey.modulus.bitLength()+7)>>3;
            $data = this.pkcs1pad2($data,bytes);
            if(!$data) return false;
            $data = $data.modPowInt($pubkey.encryptionExponent, $pubkey.modulus);
            if(!$data) return false;
            $data = $data.toString(16);
            while ($data.length < bytes*2)
                $data = '0' + $data;
            //return Base64.encode(Hex.decode($data));
            return $data;
        },
        pkcs1pad2: function($data, $keysize) {
            if($keysize < $data.length + 11)
                return null;
            var $buffer = [];
            var $i = $data.length - 1;
            while($i >= 0 && $keysize > 0)
                $buffer[--$keysize] = $data.charCodeAt($i--);
            $buffer[--$keysize] = 0;
            while($keysize > 2)
                $buffer[--$keysize] = Math.floor(Math.random()*254) + 1;
            $buffer[--$keysize] = 2;
            $buffer[--$keysize] = 0;
            return new BigInteger($buffer);
        }
    };
    return RSA;
})
