// ############################################

// steps generator
const useStepsGenerator = true
const numberOfLeds = 10
const fromNum = 10
const toNum = 30

let steps = [12, 14, 16, 18, 20, 22, 24, 26, 28] // only used when useStepsGenerator is false

// flash on the start of the program
const flash = false
const numberOfFlashes = 3
const flashColor = NeoPixelColors.Violet
const flashDelay = 190 // delay in ms

// ############################################

// #######

// steps generator

if (useStepsGenerator) {
    steps = []
    let i = fromNum
    const increment = (toNum - fromNum) / (numberOfLeds - 2)

    for (let i = 0; i < numberOfLeds - 1; i++) {
        steps.push(fromNum + (increment * i))
    }
}

// #######

const numLeds = steps.length + 1

const strip = neopixel.create(DigitalPin.P0, numLeds, NeoPixelMode.RGB)

if (flash) {
    for (let i = 0; i < numberOfFlashes; i++) {
        strip.showColor(neopixel.colors(flashColor))
        basic.pause(flashDelay)
        strip.clear()
        strip.show()
        basic.pause(flashDelay)
    }
}

const findRange = (n: number) => {
    for (let i = 0; i < numLeds; i++) {
        const step = steps[i]
        if (n < step) {
            return i
        }
    }
    return numLeds - 1
}

input.onButtonPressed(Button.A, () => {
    basic.showNumber(input.temperature())
})

basic.forever(() => {
    const temp = input.temperature()
    const step = findRange(temp)

    const stripRGB = [Math.round(((255 / numLeds)) * step), 0, (255 - (step * (255 / numLeds)))]

    strip.clear()
    for (let i = 0; i < step + 1; i++) {
        strip.setPixelColor(i, neopixel.rgb(stripRGB[0], stripRGB[1], stripRGB[2]))
    }
    strip.show()
})

if (input.buttonIsPressed(Button.AB)) { } // for initializing A + B button in makecode Simulator