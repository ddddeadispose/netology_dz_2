#!/usr/bin/env node

const fs = require('fs')
const { hideBin } = require('yargs/helpers')

const arg = hideBin(process.argv).toString()
const writeStream = fs.createWriteStream(arg,'utf8')
const readline = require('readline')

// Создаем интерфейс передачи данных из консоли
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Задание 1

console.log('Загадо число от 1 до 2, введите в консоль цифру и попробуйте угадать')

// "Слушаем" консоль и проверяем, и каждый раз при вводе генерируем новое число и сравниваем его с введённым
rl.on('line', (input) => {
    const random = (Math.floor(Math.random() * (2)) + 1).toString()
    writeStream.write(`Загаданное число: ${random}\n`)
    if (input === random) {
        console.log('Вы угадали')
        writeStream.write(`+\n`)
    } else {
        console.log('Вы не угадали')
        writeStream.write(`-\n`)
    }
});

// Задание 2 (Его же не принципиально делать отдельным модулем?)

rl.on('close',()=>{
    let dat = fs.readFileSync(arg,'utf8')
    const parts = dat.split('\n')
    const wins = dat.split('+')
    const loose = dat.split('-')

    //Убираем из length единицу, потому что возвращает массив на один больше и делим на два (т.к. две строки за партию)
    console.log(`\nКоличество партий: ${(parts.length - 1)/2}`)
    console.log(`Количество побед: ${wins.length - 1}`)
    console.log(`Количество проигрышей: ${loose.length - 1}`)
    console.log(`\nПобед: ${Math.round(((wins.length - 1)/((parts.length - 1)/2))*100)}%`)
})