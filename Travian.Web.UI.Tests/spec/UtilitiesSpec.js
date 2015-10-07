describe("utilities.js", function () {

    describe("when calling getDouble", function() {      
        it("should return double value", function () {
            expect(getDouble(2)).toBe(4);
        });
    });

    describe("distance: ", function () {
        it("should return 5 when passed the vectors (0, 0) and (3, 4)", function () {
            var v1 = { x: 0, y: 0 };
            var v2 = { x: 3, y: 4 };

            expect(distance(v1, v2)).toBe(5);
        });
    });

    describe("getTimeDifference: ", function () {

        it("passing 'Thu, 01 Jan 1970 00:30:00' and 'Thu, 01 Jan 1970 00:00:00' should return '00:30:00'", function () {
            var time1 = 'Thu, 01 Jan 1970 00:30:00';
            var time2 = 'Thu, 01 Jan 1970 00:00:00';
            expect(getTimeDifference(time1, time2)).toBe('00:30:00');
        });
    });

    describe("paramsToString: ", function () {
        it("passing (1, 1, 1, 1) should return '1:01:01:01'", function () {
            expect(paramsToString(1, 1, 1, 1)).toBe('1:01:01:01');
        });

        it("passing (0, 0, 1, 0) should return '00:01:00'", function () {
            expect(paramsToString(0, 0, 1, 0)).toBe('00:01:00');
        });
    });

    describe("stringToMilliseconds: ", function () {
        it("'00:01:00' should return 60000", function () {
            expect(stringToMilliseconds('00:01:00')).toBe(60000);
        });
        it("'2:00:00:00' should return 172800000", function () {
            expect(stringToMilliseconds('2:00:00:00')).toBe(172800000);
        });
    });

    describe("millisecondsToParams: ", function () {
        it("'120000' should return {days: 0, hours: 0, minutes: 2, seconds: 0}", function () {
            expect(millisecondsToParams(120000).days).toBe(0);
            expect(millisecondsToParams(120000).hours).toBe(0);
            expect(millisecondsToParams(120000).minutes).toBe(2);
            expect(millisecondsToParams(120000).seconds).toBe(0);
        })
    })
});