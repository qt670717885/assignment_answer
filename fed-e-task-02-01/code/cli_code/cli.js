#!/usr/bin/env node

//使用yarn link 将模块定义到全局

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
    {
        type : 'input',
        name : 'name',
        message : 'your project name'
    }
])
.then(answers => {
   const tmpDir = path.join(__dirname,'template')
   const destDir = process.cwd()
   fs.readdir(tmpDir,(err,files) => {
    if(err) throw err
    files.forEach(file => {
        ejs.renderFile(path.join(tmpDir,file),answers,(err,result)=> {
            if(err) throw err
            fs.writeFileSync(path.join(destDir,file),result)
        })
    })
   })
})

