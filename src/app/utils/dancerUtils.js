export function getProgress (type, dancerData, round) {
    let cur = dancerData.level
    let points = dancerData.points

    if (type === 'jnj') {
        points.CH = points.Ch
        points.BG = points.Beg
    }

    const values = [16, 8, 4, 2, 1]
    const maxPointsForClass = (type === 'classic') ? [12, 12, 12, 4] : [18, 24, 18, 12]
    const classes = (type === 'classic') ? ['A', 'B', 'C', 'D', 'E'] : ['CH', 'S', 'M', 'RS', 'BG']

    let progress = 0

    if (cur === classes[0]) {
        progress = 100
    }

    if (cur === classes[1]) {
        progress = 75

        let curValue = points[classes[0]] * values[0] + points[classes[1]] * values[1]
        let maxValue = maxPointsForClass[0] * values[1]

        progress += ((100 - 75) * curValue) / maxValue
    }

    if (cur === classes[2]) {
        progress = 50

        let curValue = points[classes[0]] * values[0] + points[classes[1]] * values[1] + points[classes[2]] * values[2]
        let maxValue = maxPointsForClass[1] * values[2]

        progress += ((25) * curValue) / maxValue
    }

    if (cur === classes[3]) {
        progress = 25

        let curValue = points[classes[0]] * values[0] + points[classes[1]] * values[1] + points[classes[2]] * values[2] + points[classes[3]] * values[3]
        let maxValue = maxPointsForClass[2] * values[3]

        progress += ((25) * curValue) / maxValue
    }

    if (cur === classes[4]) {
        progress = 0

        let curValue = points[classes[0]] * values[0] + points[classes[1]] * values[1] + points[classes[2]] * values[2] + points[classes[3]] * values[3] + points[classes[4]] * values[4]
        let maxValue = maxPointsForClass[3] * values[4]

        progress += ((25) * curValue) / maxValue
    }

    if (round !== undefined) {
        return progress.toFixed(round)
    } else {
        return progress
    }
}
