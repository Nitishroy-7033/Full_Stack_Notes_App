const winston = require('winston');
const path = require('path');

// Define log Format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${[timestamp]} ${level}: ${message}`;
});

// Create a logger instance

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        logFormat
    ),
    transports:[
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/app.log'),
            level: 'info',
            format: winston.format.combine(winston.format.uncolorize(), logFormat),
        })
    ]
})

module.exports = logger;