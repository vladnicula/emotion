import React from 'react'
import renderer from 'react-test-renderer'
import { css, sheet, flush } from 'emotion'

describe('css', () => {
  afterEach(() => flush())
  test('source-map nested styles', () => {
    const mq = [
      '@media(min-width: 420px)',
      '@media(min-width: 640px)',
      '@media(min-width: 960px)'
    ]

    css({
      color: 'blue',
      '&:hover': {
        '& .name': {
          color: 'amethyst',
          '&:focus': {
            color: 'burlywood',
            [mq[0]]: {
              color: 'rebeccapurple'
            }
          }
        },
        color: 'green'
      }
    })
    expect(sheet).toMatchSnapshot()
  })

  test('source-map nested media queries', () => {
    css`
      @media (max-width: 600px) {
        h1 {
          font-size: 1.4rem;
        }
      }

      @media (max-width: 400px), (max-height: 420px) {
        h1 {
          font-size: 1.1rem;
        }
      }
    `

    expect(sheet).toMatchSnapshot()
  })
  test('css prop with merge', () => {
    const tree = renderer
      .create(
        <div className={css({ display: 'flex' })} css={{ display: 'block' }} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
})
