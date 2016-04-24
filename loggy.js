#!/usr/bin/env node
"use strict";

var fs = require("fs");
var moment = require("moment");

var logPath = (process.env.HOME || process.env.USERPROFILE) + "/loggyLogs";
var data = "";
var self = process.stdin;

self.on('readable', function() {
    var chunk = this.read();
    if (chunk === null) {
        writeLog();
    } else {
        data += chunk;
    }
});

self.on('end', function() {
    writeLog();
});

function writeLog() {
    var argv = process.argv.slice(2).join(" ");
    var logs = argv + "" + data;
    var logEntry = moment().format("ddd hh:mma") + ": " + logs + "\n";

    try {
        // Check if log folder exists
        fs.accessSync(logPath);
    } catch (e) {
        if (e.code === "ENOENT") {
            fs.mkdirSync(logPath);
            console.log("Created log directory:" + logPath);
        }
    }

    var logWeek = moment().format("YYYY") + "_W" + moment().format("ww_MMM") + ".log";

    process.stdout.write("Logging to: " + logWeek + "...");

    var logFilePath = logPath + "/" + logWeek;
    try {
        fs.appendFileSync(logFilePath, logEntry);
    } catch (e) {
        console.log("Error writing to " + logFilePath + "! " + e);
        process.exit(1);
    }

    console.log(" done!");

    var symPath = logPath + "/latest.log";
    try {
        var stat = fs.lstatSync(symPath);
        if(stat.isSymbolicLink()){
            fs.unlinkSync(symPath);
        }
        fs.symlinkSync(logFilePath, symPath);
    } catch(e){
        if(e.code !== "ENOENT") {
            console.log("Error creating symlink to latest.log!");
            process.exit(1);
        }
    }

    process.exit(0);
}