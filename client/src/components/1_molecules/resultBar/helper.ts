/**
 * Return the pourcentage of up/down/ind vote
 * @param result Result of the vote
 */
export const getPourcentageVote = (result: {
  up: number
  ind: number
  down: number
}): { up: number; down: number; ind: number } => {
  const { up, down, ind } = result
  const totalVote = up + down + ind
  return totalVote === 0
    ? { up: 0, down: 0, ind: 0 }
    : {
        up: +((up / totalVote) * 100).toFixed(1),
        down: +((down / totalVote) * 100).toFixed(1),
        ind: +((ind / totalVote) * 100).toFixed(1)
      }
}

/**
 * Return a css gradient to display the result in a progress bar
 * @param pourcentageVote Result in pourcentage
 */
export const createLinearGradientFromResult = (pourcentageVote: {
  up: number
  ind: number
  down: number
}) => {
  const { up, down, ind } = pourcentageVote
  return up === 0 && down === 0 && ind === 0
    ? `linear-gradient(to right, hsl(0, 0%, 71%) 0%, hsl(0, 0%, 71%) 100%)`
    : `linear-gradient(to right,hsl(217, 71%, 53%) ${up}%, hsl(217, 71%, 53%) ${up}%, hsl(204, 86%, 53%) ${up +
        ind}%, hsl(348, 100%, 61%) ${up + ind}%,hsl(348, 100%, 61%) ${up +
        ind +
        down}%  )`
}
