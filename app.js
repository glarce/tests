const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const fs = require('fs-extra')
let chalk = require('chalk')

const isDirectory = source => lstatSync(source).isDirectory() && !/.git|node_modules|media/.test(source);
const getDirectories = source =>
    readdirSync(source).map(name => join(source, name)).filter(isDirectory)

dirs = getDirectories("./")

let testResults = {}
let testsCompleted = 0

let doTest = () => {
    let x = testsCompleted
    fs.ensureSymlinkSync(`node_modules`, `./${dirs[x]}/node_modules`)
    fs.ensureSymlinkSync(`./media`, `./${dirs[x]}/media`)
    require(`./${dirs[x]}/test.js`)().then(res => {
        testResults[dirs[x]] = res
        testsCompleted++
        if (dirs.length === testsCompleted) countSuccesRate()
        else doTest()
    })
}
doTest()

let countSuccesRate = () => {
    let success = fail = 0

    setTimeout(() => {
        for (let x in dirs) {
            if (testResults[dirs[x]]) {
                success++
                console.log(dirs[x] + ' :Succeeded')
            }
            else {
                fail++
                console.log(dirs[x] + ' :Succeeded')
            }
        }
        console.log('Success: ' + success + ' Fails: ' + fail)
    }, 3000)
}