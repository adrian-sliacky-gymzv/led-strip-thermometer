// ############################################
const startY = 0
const numLeds = 10
const ledOverflow = true

const flashColor = NeoPixelColors.Violet
const stripColor = NeoPixelColors.Yellow
const flashDelay = 190 // delay in ms

const steps = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30]

// ############################################

const strip = neopixel.create(DigitalPin.P0, numLeds, NeoPixelMode.RGB)

for (let i = 0; i < 3; i++) {
    strip.showColor(neopixel.colors(flashColor))
    basic.pause(flashDelay)
    strip.clear()
    strip.show()
    basic.pause(flashDelay)
}

const findRange = (n: number) => {
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        if (n <= step) {
            return i
        }
    }

    return steps.length - 1
}

basic.forever(() => {
    const temp = Math.floor(input.temperature())
    strip.clear()
    strip.setPixelColor(findRange(temp), stripColor)
    strip.show()
})

if (input.buttonIsPressed(Button.AB)) { } // for initializing A + B button in makecode Simulator