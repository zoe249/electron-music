// preload.js

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

//向渲染器进程暴露一个全局的 window.electronAPI 变量。
const { contextBridge, ipcRenderer, app } = require('electron')
// import { contextBridge, ipcRenderer, app } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  operationWindow: (actionType) =>
    ipcRenderer.send('operation-window', actionType),
})

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
})
