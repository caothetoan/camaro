const { resolve } = require('path')
const WorkerPool = require('piscina')

const pool = new WorkerPool({ filename: resolve(__dirname, 'worker.js') })

function isNonEmptyString(str) {
    return typeof str === 'string' && str.length > 0
}

function isEmptyObject(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object
}

/**
 * convert xml to json base on the template object
 * @param {string} xml xml string
 * @param {object} template template object
 * @returns {object} xml converted to json object based on the template
 */
function transform(xml, template) {
    if (!isNonEmptyString(xml)) {
        throw new TypeError('1st argument (xml) must be a non-empty string')
    }

    if (!template || typeof template !== 'object' || isEmptyObject(template)) {
        throw new TypeError('2nd argument (template) must be an object')
    }

    return pool.runTask({
        fn: 'transform',
        args: [xml, JSON.stringify(template)],
    })
}

/**
 * convert xml to json
 * @param {string} xml xml string
 * @returns {object} json object converted from the input xml
 */
function toJson(xml) {
    throw new Error('Not yet implemented')
    // if (!isNonEmptyString(xml)) {
    //     throw new TypeError('expecting xml input to be non-empty string')
    // }

    // return pool.runTask({ fn: 'toJson', args: [xml] })
}

/**
 * pretty print xml string
 * @param {string} xml xml string
 * @param {object} opts pretty print options
 * @param {number} [opts.indentSize=2] indent size, default=2
 * @returns {string} xml pretty print string
 */
function prettyPrint(xml, opts = { indentSize: 2 }) {
    if (!isNonEmptyString(xml)) {
        throw new TypeError('expecting xml input to be non-empty string')
    }

    return pool.runTask({ fn: 'prettyPrint', args: [xml, opts] })
}

module.exports = { transform, toJson, prettyPrint }
