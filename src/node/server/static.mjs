import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || process.cwd()

const certSuffix = process.env.CI ? '-ci' : '-dev'
const certPath = path.join(root, `.config/certificates/ssl${certSuffix}.crt`)
const keyPath = path.join(root, `.config/certificates/ssl${certSuffix}.key`)

const serveProcess = spawn(
  'serve',
  [
    '.output/public',
    ...(fs.existsSync(certPath) && fs.existsSync(keyPath)
      ? ['--ssl-cert', certPath, '--ssl-key', keyPath]
      : []),
  ],
  {
    stdio: 'inherit',
    cwd: root,
  },
)

serveProcess.on('error', (error) => {
  console.error('Failed to start serve:', error)
  process.exit(1)
})

serveProcess.on('exit', (code) => {
  process.exit(code || 0)
})
