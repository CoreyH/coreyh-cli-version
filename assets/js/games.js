// Games module - ported from upstream (bentossell/bentossell)
// Space Invaders, Snake, and Tetris

// Global game state
let gameState = null;
let snakeState = null;
let tetrisState = null;
let gameActive = false;
let gameInterval = null;

// Tetris piece definitions
const TETRIS_PIECES = [
  { shape: [[1,1,1,1]], color: 'I' },
  { shape: [[1,1],[1,1]], color: 'O' },
  { shape: [[0,1,0],[1,1,1]], color: 'T' },
  { shape: [[1,0,0],[1,1,1]], color: 'L' },
  { shape: [[0,0,1],[1,1,1]], color: 'J' },
  { shape: [[0,1,1],[1,1,0]], color: 'S' },
  { shape: [[1,1,0],[0,1,1]], color: 'Z' },
];

// ==================== SPACE INVADERS ====================

function startSpaceInvaders() {
  const terminalBody = document.getElementById("terminal-body");
  const output = document.getElementById("output");
  const inputLine = document.querySelector(".terminal-input");
  const commandInput = document.getElementById("command-input");

  const savedContent = output.innerHTML;
  inputLine.style.display = "none";
  commandInput.blur();

  const charWidth = 8;
  const charHeight = 16;
  const width = Math.floor(terminalBody.clientWidth / charWidth) - 4;
  const height = Math.floor(terminalBody.clientHeight / charHeight) - 4;

  gameState = {
    width: Math.min(width, 60),
    height: Math.min(height, 25),
    player: { x: Math.floor(Math.min(width, 60) / 2), lives: 3 },
    bullets: [],
    aliens: [],
    alienBullets: [],
    alienDirection: 1,
    alienMoveCounter: 0,
    score: 0,
    gameOver: false,
    won: false,
    enteringName: false,
    playerName: '',
    saved: false,
  };

  const alienRows = 4;
  const alienCols = Math.min(Math.floor((gameState.width - 6) / 4), 10);
  const startX = 3;
  for (let row = 0; row < alienRows; row++) {
    for (let col = 0; col < alienCols; col++) {
      gameState.aliens.push({
        x: col * 4 + startX,
        y: row * 2 + 2,
        type: row === 0 ? 2 : row === 1 ? 1 : 0,
      });
    }
  }

  gameActive = true;

  const gameKeyHandler = (e) => {
    if (!gameActive) return;

    if (e.key === "Escape") {
      endSpaceInvaders(savedContent, inputLine, gameKeyHandler);
      return;
    }

    if (gameState.gameOver) {
      if (gameState.enteringName) {
        e.preventDefault();
        if (e.key === "Enter" && gameState.playerName.trim()) {
          saveScore(gameState.playerName.trim(), gameState.score, 'space-invaders');
          gameState.saved = true;
          gameState.enteringName = false;
          renderSpaceInvaders(output);
        } else if (e.key === "Backspace") {
          gameState.playerName = gameState.playerName.slice(0, -1);
          renderSpaceInvaders(output);
        } else if (e.key.length === 1 && gameState.playerName.length < 10) {
          gameState.playerName += e.key;
          renderSpaceInvaders(output);
        }
      } else if (!gameState.saved && e.key !== "Escape") {
        gameState.enteringName = true;
        renderSpaceInvaders(output);
      } else if (e.key === "Enter") {
        endSpaceInvaders(savedContent, inputLine, gameKeyHandler);
      }
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "a") {
      e.preventDefault();
      gameState.player.x = Math.max(1, gameState.player.x - 1);
    } else if (e.key === "ArrowRight" || e.key === "d") {
      e.preventDefault();
      gameState.player.x = Math.min(gameState.width - 2, gameState.player.x + 1);
    } else if (e.key === " " || e.key === "ArrowUp") {
      e.preventDefault();
      if (gameState.bullets.length < 3) {
        gameState.bullets.push({ x: gameState.player.x, y: gameState.height - 3 });
      }
    }
  };

  document.addEventListener("keydown", gameKeyHandler, true);

  gameInterval = setInterval(() => {
    if (!gameActive) return;
    updateSpaceInvaders();
    renderSpaceInvaders(output);
  }, 120);
}

function updateSpaceInvaders() {
  if (gameState.gameOver) return;

  gameState.bullets = gameState.bullets.filter(b => {
    b.y--;
    return b.y > 0;
  });

  gameState.alienBullets = gameState.alienBullets.filter(b => {
    b.y++;
    return b.y < gameState.height - 1;
  });

  gameState.bullets.forEach((bullet, bi) => {
    gameState.aliens.forEach((alien, ai) => {
      if (Math.abs(bullet.x - alien.x) <= 1 && Math.abs(bullet.y - alien.y) <= 1) {
        gameState.bullets.splice(bi, 1);
        gameState.aliens.splice(ai, 1);
        gameState.score += (alien.type + 1) * 10;
      }
    });
  });

  gameState.alienBullets.forEach((bullet, i) => {
    if (Math.abs(bullet.x - gameState.player.x) <= 1 && bullet.y >= gameState.height - 2) {
      gameState.alienBullets.splice(i, 1);
      gameState.player.lives--;
      if (gameState.player.lives <= 0) {
        gameState.gameOver = true;
      }
    }
  });

  gameState.alienMoveCounter++;
  if (gameState.alienMoveCounter >= 8) {
    gameState.alienMoveCounter = 0;

    let hitEdge = false;
    gameState.aliens.forEach(alien => {
      if (alien.x + gameState.alienDirection <= 2 || alien.x + gameState.alienDirection >= gameState.width - 3) {
        hitEdge = true;
      }
    });

    if (hitEdge) {
      gameState.alienDirection *= -1;
      gameState.aliens.forEach(alien => {
        alien.y++;
        if (alien.y >= gameState.height - 4) {
          gameState.gameOver = true;
        }
      });
    } else {
      gameState.aliens.forEach(alien => {
        alien.x += gameState.alienDirection;
      });
    }

    if (gameState.aliens.length > 0 && Math.random() < 0.2) {
      const shooter = gameState.aliens[Math.floor(Math.random() * gameState.aliens.length)];
      gameState.alienBullets.push({ x: shooter.x, y: shooter.y + 1 });
    }
  }

  if (gameState.aliens.length === 0) {
    gameState.gameOver = true;
    gameState.won = true;
  }
}

function renderSpaceInvaders(output) {
  const g = gameState;
  let screen = [];

  for (let y = 0; y < g.height; y++) {
    screen[y] = new Array(g.width).fill(' ');
  }

  for (let x = 0; x < g.width; x++) {
    screen[0][x] = '─';
    screen[g.height - 1][x] = '─';
  }
  for (let y = 0; y < g.height; y++) {
    screen[y][0] = '│';
    screen[y][g.width - 1] = '│';
  }
  screen[0][0] = '┌';
  screen[0][g.width - 1] = '┐';
  screen[g.height - 1][0] = '└';
  screen[g.height - 1][g.width - 1] = '┘';

  const alienChars = ['W', 'M', 'X'];
  g.aliens.forEach(alien => {
    if (alien.y > 0 && alien.y < g.height - 1 && alien.x > 0 && alien.x < g.width - 1) {
      screen[alien.y][alien.x] = alienChars[alien.type] || 'X';
    }
  });

  g.bullets.forEach(b => {
    if (b.y > 0 && b.y < g.height - 1 && b.x > 0 && b.x < g.width - 1) {
      screen[b.y][b.x] = '│';
    }
  });

  g.alienBullets.forEach(b => {
    if (b.y > 0 && b.y < g.height - 1 && b.x > 0 && b.x < g.width - 1) {
      screen[b.y][b.x] = '·';
    }
  });

  // Draw player ship - should be near bottom of screen
  const playerY = g.height - 2;
  if (g.player.x > 0 && g.player.x < g.width - 1 && playerY > 0 && playerY < g.height - 1) {
    screen[playerY][g.player.x] = '^';
    if (g.player.x > 1) screen[playerY][g.player.x - 1] = '<';
    if (g.player.x < g.width - 2) screen[playerY][g.player.x + 1] = '>';
  }

  let html = '<pre style="line-height: 1.2; margin: 0;">';
  html += `<span class="accent">SPACE INVADERS</span>  Score: <span class="success">${g.score}</span>  Lives: <span class="error">${'*'.repeat(g.player.lives)}</span>\n\n`;

  for (let y = 0; y < g.height; y++) {
    html += screen[y].join('') + '\n';
  }

  html += '\n<span class="muted">< > move  SPACE shoot  ESC quit</span>';

  if (g.gameOver) {
    html += '\n\n';
    if (g.won) {
      html += '<span class="success">*** YOU WIN! ***</span>';
    } else {
      html += '<span class="error">*** GAME OVER ***</span>';
    }

    if (g.enteringName) {
      html += `\n\n<span class="bold white">Enter your name:</span> <span class="accent">${g.playerName}</span><span class="cursor">_</span>`;
      html += '\n<span class="muted">Press ENTER to save</span>';
    } else if (g.saved) {
      html += `\n\n<span class="success">Score saved!</span>`;
      html += '\n<span class="muted">Press ENTER to exit, or type</span> <span class="cmd">leaderboard space</span>';
    } else {
      html += '\n<span class="muted">Press any key to save score, ESC to skip</span>';
    }
  }

  html += '</pre>';
  output.innerHTML = html;
}

function endSpaceInvaders(savedContent, inputLine, keyHandler) {
  gameActive = false;
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
  document.removeEventListener("keydown", keyHandler, true);
  document.getElementById("output").innerHTML = savedContent;
  inputLine.style.display = "flex";
  document.getElementById("command-input").focus();
}

// ==================== SNAKE ====================

function startSnakeGame() {
  const terminalBody = document.getElementById("terminal-body");
  const output = document.getElementById("output");
  const inputLine = document.querySelector(".terminal-input");

  const savedContent = output.innerHTML;
  inputLine.style.display = "none";
  commandInput.blur();

  const charWidth = 8;
  const charHeight = 16;
  const width = Math.floor(terminalBody.clientWidth / charWidth) - 4;
  const height = Math.floor(terminalBody.clientHeight / charHeight) - 6;

  snakeState = {
    width: Math.min(width, 50),
    height: Math.min(height, 20),
    snake: [{ x: Math.floor(Math.min(width, 50) / 2), y: Math.floor(Math.min(height, 20) / 2) }],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: null,
    score: 0,
    gameOver: false,
    enteringName: false,
    playerName: '',
    saved: false,
    tick: 0,
    speed: 150,
  };

  spawnFood();
  gameActive = true;

  const snakeKeyHandler = (e) => {
    if (!gameActive) return;

    if (e.key === "Escape") {
      endSnakeGame(savedContent, inputLine, snakeKeyHandler);
      return;
    }

    if (snakeState.gameOver) {
      if (snakeState.enteringName) {
        e.preventDefault();
        if (e.key === "Enter" && snakeState.playerName.trim()) {
          saveScore(snakeState.playerName.trim(), snakeState.score, 'snake');
          snakeState.saved = true;
          snakeState.enteringName = false;
          renderSnake(output);
        } else if (e.key === "Backspace") {
          snakeState.playerName = snakeState.playerName.slice(0, -1);
          renderSnake(output);
        } else if (e.key.length === 1 && snakeState.playerName.length < 10) {
          snakeState.playerName += e.key;
          renderSnake(output);
        }
      } else if (!snakeState.saved && e.key !== "Escape") {
        snakeState.enteringName = true;
        renderSnake(output);
      } else if (e.key === "Enter") {
        endSnakeGame(savedContent, inputLine, snakeKeyHandler);
      }
      return;
    }

    const s = snakeState;
    if ((e.key === "ArrowUp" || e.key === "w") && s.direction.y === 0) {
      e.preventDefault();
      s.nextDirection = { x: 0, y: -1 };
    } else if ((e.key === "ArrowDown" || e.key === "s") && s.direction.y === 0) {
      e.preventDefault();
      s.nextDirection = { x: 0, y: 1 };
    } else if ((e.key === "ArrowLeft" || e.key === "a") && s.direction.x === 0) {
      e.preventDefault();
      s.nextDirection = { x: -1, y: 0 };
    } else if ((e.key === "ArrowRight" || e.key === "d") && s.direction.x === 0) {
      e.preventDefault();
      s.nextDirection = { x: 1, y: 0 };
    }
  };

  document.addEventListener("keydown", snakeKeyHandler);

  function snakeLoop() {
    if (!gameActive) return;
    updateSnake();
    renderSnake(output);
    gameInterval = setTimeout(snakeLoop, snakeState.speed);
  }
  snakeLoop();
}

function spawnFood() {
  const s = snakeState;
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * (s.width - 2)) + 1,
      y: Math.floor(Math.random() * (s.height - 2)) + 1,
    };
  } while (s.snake.some(seg => seg.x === pos.x && seg.y === pos.y));
  s.food = pos;
}

function updateSnake() {
  const s = snakeState;
  if (s.gameOver) return;

  s.tick++;

  const isVertical = s.nextDirection.y !== 0;
  if (isVertical && s.tick % 2 !== 0) return;

  s.direction = s.nextDirection;
  const head = s.snake[0];
  let newHead = { x: head.x + s.direction.x, y: head.y + s.direction.y };

  if (newHead.x <= 0) newHead.x = s.width - 2;
  if (newHead.x >= s.width - 1) newHead.x = 1;
  if (newHead.y <= 0) newHead.y = s.height - 2;
  if (newHead.y >= s.height - 1) newHead.y = 1;

  if (s.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
    s.gameOver = true;
    return;
  }

  s.snake.unshift(newHead);

  if (newHead.x === s.food.x && newHead.y === s.food.y) {
    s.score += 10;
    spawnFood();
    s.speed = Math.max(50, s.speed - 5);
  } else {
    s.snake.pop();
  }
}

function renderSnake(output) {
  const s = snakeState;
  let screen = [];

  for (let y = 0; y < s.height; y++) {
    screen[y] = new Array(s.width).fill(' ');
  }

  for (let x = 0; x < s.width; x++) {
    screen[0][x] = '─';
    screen[s.height - 1][x] = '─';
  }
  for (let y = 0; y < s.height; y++) {
    screen[y][0] = '│';
    screen[y][s.width - 1] = '│';
  }
  screen[0][0] = '┌';
  screen[0][s.width - 1] = '┐';
  screen[s.height - 1][0] = '└';
  screen[s.height - 1][s.width - 1] = '┘';

  if (s.food && s.food.y > 0 && s.food.y < s.height - 1) {
    screen[s.food.y][s.food.x] = '*';
  }

  s.snake.forEach((seg, i) => {
    if (seg.y > 0 && seg.y < s.height - 1 && seg.x > 0 && seg.x < s.width - 1) {
      screen[seg.y][seg.x] = i === 0 ? '@' : 'o';
    }
  });

  let html = '<pre style="line-height: 1.2; margin: 0;">';
  html += `<span class="accent">SNAKE</span>  Score: <span class="success">${s.score}</span>  Length: ${s.snake.length}\n\n`;

  for (let y = 0; y < s.height; y++) {
    html += screen[y].join('') + '\n';
  }

  html += '\n<span class="muted">WASD/Arrows to move  ESC quit</span>';

  if (s.gameOver) {
    html += '\n\n<span class="error">*** GAME OVER ***</span>';

    if (s.enteringName) {
      html += `\n\n<span class="bold white">Enter your name:</span> <span class="accent">${s.playerName}</span><span class="cursor">_</span>`;
      html += '\n<span class="muted">Press ENTER to save</span>';
    } else if (s.saved) {
      html += `\n\n<span class="success">Score saved!</span>`;
      html += '\n<span class="muted">Press ENTER to exit</span>';
    } else {
      html += '\n<span class="muted">Press any key to save score, ESC to skip</span>';
    }
  }

  html += '</pre>';
  output.innerHTML = html;
}

function endSnakeGame(savedContent, inputLine, keyHandler) {
  gameActive = false;
  if (gameInterval) {
    clearTimeout(gameInterval);
    gameInterval = null;
  }
  document.removeEventListener("keydown", keyHandler);
  document.getElementById("output").innerHTML = savedContent;
  inputLine.style.display = "flex";
  document.getElementById("command-input").focus();
}

// ==================== TETRIS ====================

function startTetris() {
  const terminalBody = document.getElementById("terminal-body");
  const output = document.getElementById("output");
  const inputLine = document.querySelector(".terminal-input");

  const savedContent = output.innerHTML;
  inputLine.style.display = "none";
  commandInput.blur();

  tetrisState = {
    width: 10,
    height: 20,
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    piece: null,
    pieceX: 0,
    pieceY: 0,
    score: 0,
    lines: 0,
    level: 1,
    gameOver: false,
    enteringName: false,
    playerName: '',
    saved: false,
    speed: 500,
  };

  spawnTetrisPiece();
  gameActive = true;

  const tetrisKeyHandler = (e) => {
    if (!gameActive) return;

    if (e.key === "Escape") {
      endTetris(savedContent, inputLine, tetrisKeyHandler);
      return;
    }

    if (tetrisState.gameOver) {
      if (tetrisState.enteringName) {
        e.preventDefault();
        if (e.key === "Enter" && tetrisState.playerName.trim()) {
          saveScore(tetrisState.playerName.trim(), tetrisState.score, 'tetris');
          tetrisState.saved = true;
          tetrisState.enteringName = false;
          renderTetris(output);
        } else if (e.key === "Backspace") {
          tetrisState.playerName = tetrisState.playerName.slice(0, -1);
          renderTetris(output);
        } else if (e.key.length === 1 && tetrisState.playerName.length < 10) {
          tetrisState.playerName += e.key;
          renderTetris(output);
        }
      } else if (!tetrisState.saved && e.key !== "Escape") {
        tetrisState.enteringName = true;
        renderTetris(output);
      } else if (e.key === "Enter") {
        endTetris(savedContent, inputLine, tetrisKeyHandler);
      }
      return;
    }

    const t = tetrisState;
    if (e.key === "ArrowLeft" || e.key === "a") {
      e.preventDefault();
      if (canMove(t.piece, t.pieceX - 1, t.pieceY)) t.pieceX--;
    } else if (e.key === "ArrowRight" || e.key === "d") {
      e.preventDefault();
      if (canMove(t.piece, t.pieceX + 1, t.pieceY)) t.pieceX++;
    } else if (e.key === "ArrowDown" || e.key === "s") {
      e.preventDefault();
      if (canMove(t.piece, t.pieceX, t.pieceY + 1)) {
        t.pieceY++;
        t.score += 1;
      }
    } else if (e.key === "ArrowUp" || e.key === "w") {
      e.preventDefault();
      const rotated = rotatePiece(t.piece);
      if (canMove(rotated, t.pieceX, t.pieceY)) t.piece = rotated;
    } else if (e.key === " ") {
      e.preventDefault();
      while (canMove(t.piece, t.pieceX, t.pieceY + 1)) {
        t.pieceY++;
        t.score += 2;
      }
    }
    renderTetris(output);
  };

  document.addEventListener("keydown", tetrisKeyHandler);

  function tetrisLoop() {
    if (!gameActive || tetrisState.gameOver) return;
    updateTetris();
    renderTetris(output);
    gameInterval = setTimeout(tetrisLoop, tetrisState.speed);
  }
  tetrisLoop();
}

function spawnTetrisPiece() {
  const t = tetrisState;
  const piece = TETRIS_PIECES[Math.floor(Math.random() * TETRIS_PIECES.length)];
  t.piece = piece.shape.map(row => [...row]);
  t.pieceX = Math.floor((t.width - t.piece[0].length) / 2);
  t.pieceY = 0;

  if (!canMove(t.piece, t.pieceX, t.pieceY)) {
    t.gameOver = true;
  }
}

function canMove(piece, x, y) {
  const t = tetrisState;
  for (let py = 0; py < piece.length; py++) {
    for (let px = 0; px < piece[py].length; px++) {
      if (piece[py][px]) {
        const newX = x + px;
        const newY = y + py;
        if (newX < 0 || newX >= t.width || newY >= t.height) return false;
        if (newY >= 0 && t.board[newY][newX]) return false;
      }
    }
  }
  return true;
}

function rotatePiece(piece) {
  const rows = piece.length;
  const cols = piece[0].length;
  const rotated = [];
  for (let c = 0; c < cols; c++) {
    rotated[c] = [];
    for (let r = rows - 1; r >= 0; r--) {
      rotated[c].push(piece[r][c]);
    }
  }
  return rotated;
}

function lockPiece() {
  const t = tetrisState;
  for (let py = 0; py < t.piece.length; py++) {
    for (let px = 0; px < t.piece[py].length; px++) {
      if (t.piece[py][px]) {
        const boardY = t.pieceY + py;
        const boardX = t.pieceX + px;
        if (boardY >= 0) t.board[boardY][boardX] = 1;
      }
    }
  }
  clearLines();
  spawnTetrisPiece();
}

function clearLines() {
  const t = tetrisState;
  let cleared = 0;
  for (let y = t.height - 1; y >= 0; y--) {
    if (t.board[y].every(cell => cell)) {
      t.board.splice(y, 1);
      t.board.unshift(Array(t.width).fill(0));
      cleared++;
      y++;
    }
  }
  if (cleared > 0) {
    const points = [0, 100, 300, 500, 800];
    t.score += points[cleared] * t.level;
    t.lines += cleared;
    t.level = Math.floor(t.lines / 10) + 1;
    t.speed = Math.max(100, 500 - (t.level - 1) * 50);
  }
}

function updateTetris() {
  const t = tetrisState;
  if (t.gameOver) return;

  if (canMove(t.piece, t.pieceX, t.pieceY + 1)) {
    t.pieceY++;
  } else {
    lockPiece();
  }
}

function renderTetris(output) {
  const t = tetrisState;
  let screen = t.board.map(row => [...row]);

  if (t.piece && !t.gameOver) {
    for (let py = 0; py < t.piece.length; py++) {
      for (let px = 0; px < t.piece[py].length; px++) {
        if (t.piece[py][px]) {
          const y = t.pieceY + py;
          const x = t.pieceX + px;
          if (y >= 0 && y < t.height && x >= 0 && x < t.width) {
            screen[y][x] = 2;
          }
        }
      }
    }
  }

  let html = '<pre style="line-height: 1.2; margin: 0;">';
  html += `<span class="accent">TETRIS</span>  Score: <span class="success">${t.score}</span>  Lines: ${t.lines}  Level: ${t.level}\n\n`;

  html += '┌' + '──'.repeat(t.width) + '┐\n';

  for (let y = 0; y < t.height; y++) {
    html += '│';
    for (let x = 0; x < t.width; x++) {
      if (screen[y][x] === 2) {
        html += '[]';
      } else if (screen[y][x] === 1) {
        html += '##';
      } else {
        html += '  ';
      }
    }
    html += '│\n';
  }

  html += '└' + '──'.repeat(t.width) + '┘\n';

  html += '\n<span class="muted">< > move  ^ rotate  v soft drop  SPACE hard drop  ESC quit</span>';

  if (t.gameOver) {
    html += '\n\n<span class="error">*** GAME OVER ***</span>';

    if (t.enteringName) {
      html += `\n\n<span class="bold white">Enter your name:</span> <span class="accent">${t.playerName}</span><span class="cursor">_</span>`;
      html += '\n<span class="muted">Press ENTER to save</span>';
    } else if (t.saved) {
      html += `\n\n<span class="success">Score saved!</span>`;
      html += '\n<span class="muted">Press ENTER to exit</span>';
    } else {
      html += '\n<span class="muted">Press any key to save score, ESC to skip</span>';
    }
  }

  html += '</pre>';
  output.innerHTML = html;
}

function endTetris(savedContent, inputLine, keyHandler) {
  gameActive = false;
  if (gameInterval) {
    clearTimeout(gameInterval);
    gameInterval = null;
  }
  document.removeEventListener("keydown", keyHandler);
  document.getElementById("output").innerHTML = savedContent;
  inputLine.style.display = "flex";
  document.getElementById("command-input").focus();
}

// ==================== SHARED UTILITIES ====================

function saveScore(name, score, game) {
  const key = `leaderboard-${game}`;
  const scores = JSON.parse(localStorage.getItem(key) || '[]');
  scores.push({ name, score, date: new Date().toISOString() });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(key, JSON.stringify(scores.slice(0, 50)));
}

function showLeaderboard(game, title) {
  const key = `leaderboard-${game}`;
  const scores = JSON.parse(localStorage.getItem(key) || '[]');
  if (scores.length === 0) {
    return `\n  <span class="muted">no ${title.toLowerCase()} scores yet.</span>\n`;
  }
  let output = `\n  <span class="bold white">${title} LEADERBOARD</span>\n\n`;
  scores.slice(0, 10).forEach((entry, i) => {
    const medal = i === 0 ? '1.' : i === 1 ? '2.' : i === 2 ? '3.' : `${i + 1}.`;
    output += `  <span class="accent">${medal.padStart(3)}</span> ${entry.name.padEnd(10)} <span class="success">${String(entry.score).padStart(5)}</span>\n`;
  });
  return output;
}

// ==================== EXPORTED COMMANDS ====================

export const games = {
  game: {
    desc: "list available games",
    fn: () => {
      return `
  <span class="bold white">GAMES</span>

  <span class="cmd">space</span>       space invaders
  <span class="cmd">snake</span>       classic snake
  <span class="cmd">tetris</span>      tetris

  <span class="muted">type</span> <span class="cmd">leaderboard [game]</span> <span class="muted">to see high scores</span>
`;
    },
  },
  games: {
    desc: "alias for game",
    fn: () => games.game.fn(),
  },
  space: {
    desc: "play space invaders",
    fn: () => {
      startSpaceInvaders();
      return '';
    },
  },
  snake: {
    desc: "play snake",
    fn: () => {
      startSnakeGame();
      return '';
    },
  },
  tetris: {
    desc: "play tetris",
    fn: () => {
      startTetris();
      return '';
    },
  },
  leaderboard: {
    desc: "game high scores",
    fn: (args) => {
      const game = args && args[0] ? args[0].toLowerCase() : null;
      if (game === 'space') {
        return showLeaderboard('space-invaders', 'SPACE INVADERS');
      } else if (game === 'snake') {
        return showLeaderboard('snake', 'SNAKE');
      } else if (game === 'tetris') {
        return showLeaderboard('tetris', 'TETRIS');
      } else {
        return `
  <span class="muted">usage:</span> <span class="cmd">leaderboard [game]</span>

  <span class="muted">games:</span> space, snake, tetris
`;
      }
    },
  },
};
