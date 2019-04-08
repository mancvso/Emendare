// Dependencies
import * as JsDiff from 'diff'
import React, { useState, useEffect } from 'react'
// Interfaces
import { IAmend, IText } from '../../../../../interfaces'

interface IDiffPreviewProps {
  /** Current Amend */
  amend: Partial<IAmend>
  /** Related Text */
  text: IText
}

const computeDiff = (amend: Partial<IAmend>, text: IText) => {
  if (amend && text) {
    let previousText = ''

    for (let index = 0; index < (amend.version || 0); index++) {
      previousText = JsDiff.applyPatch(previousText, text.patches[index])
    }

    const newText = JsDiff.applyPatch(previousText, amend.patch || '')
    const diffs = JsDiff.diffLines(previousText, newText)
    return diffs
  }
}

export const DiffPreview = ({ amend, text }: IDiffPreviewProps) => {
  // State
  const [diffs, setDiffs] = useState([])
  // Effects
  useEffect(() => {
    const currentDiffs: any = computeDiff(amend, text)
    if (currentDiffs) {
      setDiffs(currentDiffs)
    }
  }, [amend])

  // Render
  let lineCounter = 0
  return (
    <div>
      {diffs &&
        diffs.map((part: any, i: number, diffs: any[]) => (
          <div
            key={i}
            className={
              !part.added && !part.removed ? 'has-text-grey-light' : ''
            }
          >
            {part.value
              .split('\n')
              .filter(
                (line: string, index: number, arr: string[]) =>
                  index < arr.length - 1 || line !== ''
              )
              .map((line: string, j: number, arr: string[]) => {
                lineCounter++
                return part.added || part.removed ? (
                  <p
                    key={j}
                    style={{
                      backgroundColor: part.added
                        ? 'rgba(35, 209, 96, 0.22)'
                        : part.removed
                        ? 'rgba(255, 56, 96, 0.22)'
                        : '',
                      paddingRight: '1rem',
                      paddingLeft: '1rem'
                    }}
                  >
                    <span>{lineCounter}&nbsp;|&nbsp;</span>
                    {part.added ? (
                      <React.Fragment>
                        <span
                          className="is-size-5 has-text-weight-semibold"
                          style={{ marginRight: '1.2rem' }}
                        >
                          {'  '}+
                        </span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <span
                          className="is-size-5 "
                          style={{ marginRight: '1.2rem' }}
                        >
                          {'  '}-
                        </span>
                      </React.Fragment>
                    )}
                    <span>
                      {line || <React.Fragment>&nbsp;</React.Fragment>}
                    </span>
                  </p>
                ) : (j === 0 && i !== 0) ||
                  (j === 1 && i !== 0 && arr[j] === '') ||
                  (j === arr.length - 1 && i !== diffs.length - 1) ||
                  (j === arr.length - 2 &&
                    i !== diffs.length - 1 &&
                    arr[arr.length - 1] === '') ? (
                  <React.Fragment key={j}>
                    <p>
                      <span>{lineCounter}&nbsp;|&nbsp;</span>
                      {line || <React.Fragment>&nbsp;</React.Fragment>}
                    </p>
                    {arr.length > 2 && j === 0 && i !== diffs.length - 1 && (
                      <hr />
                    )}
                  </React.Fragment>
                ) : null
              })}
          </div>
        ))}
    </div>
  )
}
