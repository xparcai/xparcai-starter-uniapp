import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { log } from '@vtrbo/utils'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(revert: )?(feat|fix|perf|refactor|test|types|docs|style|ci|build|release|workflow|dx|chore|wip|update|optimize)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  log.error('Invalid commit message.')
  log.warn('Please fill in the submission information in the correct format.')
  log.warn('For example:')
  log.info('feat: add a feature')
  log.info('fix: fix a bug')
  log.info('keyword: feat|fix|perf|refactor|test|types|docs|style|ci|build|release|workflow|dx|chore|wip|update|optimize')
  process.exit(1)
}
