const STREAM = 0;
const VOLTAGE = 1;
const AIR = 2;
const FREEZE = 3;
const CHAOS = 4;
const ATTRIBUTES = 5;

class GrooveRadar {
    constructor(stream, voltage, air, freeze, chaos) {
        var values = [stream, voltage, air, freeze, chaos];
        this.getValue = function (attribute) {
            return values[attribute];
        }

        this.getTotal = function () {
            var total = 0;
            for (var k = 0; k < values.length; k++)
                total += values[k];
            return total;
        }

        this.getArea = function () {
            var area = 0;
            for (var k = 0; k < ATTRIBUTES; k++)
                area += values[k % ATTRIBUTES] * values[(k+1) % ATTRIBUTES];
            return 0.5 * Math.sin(2*Math.PI/ATTRIBUTES) * area;
        }

        this.getPercentageArea = function () {
            const fullarea = ATTRIBUTES*5000 * Math.sin(2*Math.PI/ATTRIBUTES);
            return this.getArea() / fullarea * 100;
        }

        console.log("Total: " + this.getTotal() + "\nArea: " + this.getPercentageArea() + "%")
    }

    static STREAMREF = [300, 461];
    static VOLTAGEREF = [600, 1794];
    static AIRREF = [55, 146];
    static FREEZEREF = [3500, 9484];
    static CHAOSREF = [2000, 25625];

    static determineStream = function(notesPerMin) {
        return piecewise(GrooveRadar.STREAMREF, notesPerMin);
    }

    static determineVoltage = function(voltageDensityPerMin) {
        return piecewise(GrooveRadar.VOLTAGEREF, voltageDensityPerMin);
    }

    static determineAir = function(airPerMin) {
        return piecewise(GrooveRadar.AIRREF, airPerMin);
    }

    static determineFreeze = function(freezeBasispoint) {
        return piecewise(GrooveRadar.FREEZEREF, freezeBasispoint);
    }

    static determineChaos = function(unitIrregularity) {
        return piecewise(GrooveRadar.CHAOSREF, unitIrregularity);
    }
}

var piecewise = function (REF, obs) {
    if (obs < REF[0])
        return 100 * obs / REF[0];
    else
        return 100 * (obs + REF[1] - 2*REF[0]) / (REF[1] - REF[0]);
}

var piecewiseInverse = function (REF, output) {
    if (output < 100)
        return REF[0] * output / 100;
    else
        return (REF[1] - REF[0]) * output / 100 - REF[1] + 2 * REF[0];
}

var slope = function (REF) {
    return [100/REF[0], 100/(REF[1] - REF[0])];
}

var slopeRatio = function (REF) {
    return slope(REF)[1] / slope(REF)[0];
}