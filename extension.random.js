var MersenneTwister = function (seed) {
    if (seed == undefined)
        seed = new Date().getTime();

    var N = 624;
    var M = 397;
    var MATRIX_A = 0x9908b0df;
    var UPPER_MASK = 0x80000000;
    var LOWER_MASK = 0x7fffffff;

    var mt = new Array(N);
    var mti = N + 1;

    var init = this.init = function (s) {
        mt[0] = s >>> 0;
        for (mti = 1; mti < N; mti++) {
            var s = mt[mti - 1] ^ (mt[mti - 1] >>> 30);
            mt[mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + mti;
            mt[mti] >>>= 0;
        }
    };

    var rand32 = this.rand32 = function () {
        var y;
        var mag01 = new Array(0x0, MATRIX_A);
    
        if (mti >= N) {
            var kk;
    
            if (mti == N + 1)
                init_genrand(5489);
    
            for (kk = 0; kk < N - M; kk++) {
                y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
                mt[kk] = mt[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < N - 1; kk++) {
                y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
                mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }

            y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
            mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
            mti = 0;
        }
    
        y = mt[mti++];
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);
    
        return y >>> 0;
    };

    var rand53 = this.rand53 = function() {
        var a = rand32() >>> 5, b = rand32() >>> 6;
        return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
    };

    var random = this.random = function() {
        return rand32() * (1.0 / 4294967296.0);
    };

    init(seed);
};

Math.random = new MersenneTwister(new Date().getTime()).random;
Math.randomBytes = function() {
    return new MersenneTwister(new Date().getTime()).rand53().toString(16).substring(2);
};