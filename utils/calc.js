export default function calcScore(dices, score) {
  let pointDetail = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
  }
  let all = 0;
  dices.forEach(dice => {
      pointDetail[dice.point]++;
      all += dice.point;
  });

  if (score.one.confirm === undefined) {
      score.one.temp = pointDetail[1] * 1
  }
  if (score.two.confirm === undefined) {
      score.two.temp = pointDetail[2] * 2
  }
  if (score.three.confirm === undefined) {
      score.three.temp = pointDetail[3] * 3
  }
  if (score.four.confirm === undefined) {
      score.four.temp = pointDetail[4] * 4
  }
  if (score.five.confirm === undefined) {
      score.five.temp = pointDetail[5] * 5
  }
  if (score.six.confirm === undefined) {
      score.six.temp = pointDetail[6] * 6
  }
  if (score.all.confirm === undefined) {
      score.all.temp = all
  }
  if (score.sameFour.confirm === undefined) {
      score.sameFour.temp = isSameFour(pointDetail) ? all : 0
  }
  if (score.fullHouse.confirm === undefined) {
      score.fullHouse.temp = isFullHouse(pointDetail) ? all : 0
  }
  if (score.bicycle.confirm === undefined) {
      score.bicycle.temp = isBicycle(pointDetail) ? 15 : 0
  }
  if (score.broadway.confirm === undefined) {
      score.broadway.temp = isBroadway(pointDetail) ? 30 : 0
  }
  if (score.yatzy.confirm === undefined) {
      score.yatzy.temp = isYatzy(pointDetail) ? 50 : 0
  }
  return score;
}

//四骰同花
function isSameFour(point) {
  return point[1] >= 4 ||
      point[2] >= 4 ||
      point[3] >= 4 ||
      point[4] >= 4 ||
      point[5] >= 4 ||
      point[6] >= 4
}

//葫芦
function isFullHouse(point) {
  return (
      (point[1] === 3 && (
          point[2] === 2 ||
          point[3] === 2 ||
          point[4] === 2 ||
          point[5] === 2 ||
          point[6] === 2
      )) ||
      (point[2] === 3 && (
          point[1] === 2 ||
          point[3] === 2 ||
          point[4] === 2 ||
          point[5] === 2 ||
          point[6] === 2
      )) ||
      (point[3] === 3 && (
          point[1] === 2 ||
          point[2] === 2 ||
          point[4] === 2 ||
          point[5] === 2 ||
          point[6] === 2
      )) ||
      (point[4] === 3 && (
          point[1] === 2 ||
          point[3] === 2 ||
          point[2] === 2 ||
          point[5] === 2 ||
          point[6] === 2
      )) ||
      (point[5] === 3 && (
          point[1] === 2 ||
          point[3] === 2 ||
          point[4] === 2 ||
          point[2] === 2 ||
          point[6] === 2
      )) ||
      (point[6] === 3 && (
          point[1] === 2 ||
          point[3] === 2 ||
          point[4] === 2 ||
          point[5] === 2 ||
          point[2] === 2
      )) || isYatzy(point)
  )
}

//小顺
function isBicycle(point) {
  return (point[1] &&
      point[2] &&
      point[3] &&
      point[4]) ||
      (point[2] &&
          point[3] &&
          point[4] &&
          point[5]) ||
      (point[3] &&
          point[4] &&
          point[5] &&
          point[6])
}

//大顺
function isBroadway(point) {
  return (point[1] &&
      point[2] &&
      point[3] &&
      point[4] &&
      point[5]) ||
      (point[2] &&
          point[3] &&
          point[4] &&
          point[5] &&
          point[6])
}

function isYatzy(point) {
  return point[1] === 5 ||
      point[2] === 5 ||
      point[3] === 5 ||
      point[4] === 5 ||
      point[5] === 5 ||
      point[6] === 5
}